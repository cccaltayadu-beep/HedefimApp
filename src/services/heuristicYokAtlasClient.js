// Clean, single-source heuristik YÖK Atlas istemcisi.
// Puanlara ve program kataloğuna göre mantıklı öneriler üretir.

const PROGRAM_CATALOG = {
  SAY: [
    {
      university: "Boğaziçi Üniversitesi",
      program: "Bilgisayar Mühendisliği",
      city: "İstanbul",
      baseMinScore: 560,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Orta Doğu Teknik Üniversitesi",
      program: "Elektrik-Elektronik Mühendisliği",
      city: "Ankara",
      baseMinScore: 545,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "İstanbul Teknik Üniversitesi",
      program: "Makine Mühendisliği",
      city: "İstanbul",
      baseMinScore: 530,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Bir Vakıf Üniversitesi",
      program: "Bilgisayar Mühendisliği (Burslu)",
      city: "İstanbul",
      baseMinScore: 540,
      duration: "4",
      universityType: "vakif",
      scholarship: "burslu"
    },
    {
      university: "Bir Vakıf Üniversitesi",
      program: "Yazılım Mühendisliği (%50 İndirimli)",
      city: "İstanbul",
      baseMinScore: 500,
      duration: "4",
      universityType: "vakif",
      scholarship: "indirim50"
    }
  ],
  EA: [
    {
      university: "Galatasaray Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      baseMinScore: 515,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "İstanbul Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      baseMinScore: 505,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Ankara Üniversitesi",
      program: "Siyasal Bilgiler Fakültesi - İşletme",
      city: "Ankara",
      baseMinScore: 480,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Bir Vakıf Üniversitesi",
      program: "İşletme (Burslu)",
      city: "İstanbul",
      baseMinScore: 470,
      duration: "4",
      universityType: "vakif",
      scholarship: "burslu"
    },
    {
      university: "Bir Vakıf Üniversitesi",
      program: "Psikoloji (%75 İndirimli)",
      city: "İstanbul",
      baseMinScore: 455,
      duration: "4",
      universityType: "vakif",
      scholarship: "indirim75"
    }
  ],
  SOZ: [
    {
      university: "Boğaziçi Üniversitesi",
      program: "Psikoloji",
      city: "İstanbul",
      baseMinScore: 510,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "İstanbul Üniversitesi",
      program: "Psikoloji",
      city: "İstanbul",
      baseMinScore: 495,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Gazi Üniversitesi",
      program: "Türkçe Öğretmenliği",
      city: "Ankara",
      baseMinScore: 450,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Ankara Üniversitesi",
      program: "Tarih",
      city: "Ankara",
      baseMinScore: 440,
      duration: "4",
      universityType: "devlet",
      scholarship: "ucretsiz"
    },
    {
      university: "Bir Vakıf Üniversitesi",
      program: "Yeni Medya ve İletişim (Ücretli)",
      city: "İstanbul",
      baseMinScore: 420,
      duration: "4",
      universityType: "vakif",
      scholarship: "ucretli"
    }
  ]
};

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function estimateRankFromScore(scoreType, score) {
  if (!score) return null;
  const base =
    scoreType === "SAY" ? 50000 : scoreType === "EA" ? 70000 : 90000;
  const offset = (600 - score) * 150;
  return Math.max(1, Math.round(base + offset));
}

function recommendForScore(scoreType, rawScore) {
  const score = toNumber(rawScore);
  if (!score || !PROGRAM_CATALOG[scoreType]) return [];

  const pool = PROGRAM_CATALOG[scoreType];
  const BAND = 35;

  let candidates = pool.filter(
    (p) => Math.abs(p.baseMinScore - score) <= BAND
  );

  if (candidates.length === 0) {
    candidates = [...pool].sort(
      (a, b) =>
        Math.abs(a.baseMinScore - score) - Math.abs(b.baseMinScore - score)
    );
  } else {
    candidates = candidates.sort(
      (a, b) =>
        Math.abs(a.baseMinScore - score) - Math.abs(b.baseMinScore - score)
    );
  }

  return candidates.slice(0, 5).map((p, idx) => {
    const lastMinScore = Number(
      (0.7 * p.baseMinScore + 0.3 * score).toFixed(2)
    );

    return {
      id: `${scoreType}-${idx}-${p.university}-${p.program}`,
      university: p.university,
      program: p.program,
      city: p.city,
      scoreType,
      lastMinScore,
      duration: p.duration,
      universityType: p.universityType,
      scholarship: p.scholarship,
      estimatedRank: estimateRankFromScore(scoreType, lastMinScore)
    };
  });
}

export async function fetchYokAtlasSuggestions({ tyt, say, ea, soz, year }) {
  console.info("[YÖK Atlas Heuristic] hesaplanıyor →", {
    tyt,
    say,
    ea,
    soz,
    year
  });

  await new Promise((resolve) => setTimeout(resolve, 200));

  const suggestions = [
    ...recommendForScore("SAY", say),
    ...recommendForScore("EA", ea),
    ...recommendForScore("SOZ", soz)
  ];

  const tytScore = toNumber(tyt);
  if (suggestions.length === 0 && tytScore && tytScore >= 400) {
    const mixed = [
      ...recommendForScore("SAY", tytScore),
      ...recommendForScore("EA", tytScore),
      ...recommendForScore("SOZ", tytScore)
    ];
    return mixed.slice(0, 6);
  }

  return suggestions;
}

