// Autonomous client responsible only for bilimsel / istatistiksel tercih önerileri.
// Şu an için, gerçek YÖK Atlas verisi yerine mantıklı ve açıklanabilir
// heuristiklere dayalı örnek öneriler üretir.

const PROGRAM_CATALOG = {
  SAY: [
    {
      university: "Boğaziçi Üniversitesi",
      program: "Bilgisayar Mühendisliği",
      city: "İstanbul",
      baseMinScore: 560
    },
    {
      university: "Orta Doğu Teknik Üniversitesi",
      program: "Elektrik-Elektronik Mühendisliği",
      city: "Ankara",
      baseMinScore: 545
    },
    {
      university: "İstanbul Teknik Üniversitesi",
      program: "Makine Mühendisliği",
      city: "İstanbul",
      baseMinScore: 530
    },
    {
      university: "Hacettepe Üniversitesi",
      program: "Tıp",
      city: "Ankara",
      baseMinScore: 570
    },
    {
      university: "Ege Üniversitesi",
      program: "Diş Hekimliği",
      city: "İzmir",
      baseMinScore: 540
    }
  ],
  EA: [
    {
      university: "Galatasaray Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      baseMinScore: 515
    },
    {
      university: "İstanbul Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      baseMinScore: 505
    },
    {
      university: "Ankara Üniversitesi",
      program: "Siyasal Bilgiler Fakültesi - İşletme",
      city: "Ankara",
      baseMinScore: 480
    },
    {
      university: "Marmara Üniversitesi",
      program: "İktisat",
      city: "İstanbul",
      baseMinScore: 465
    },
    {
      university: "Dokuz Eylül Üniversitesi",
      program: "İşletme",
      city: "İzmir",
      baseMinScore: 455
    }
  ],
  SOZ: [
    {
      university: "Boğaziçi Üniversitesi",
      program: "Psikoloji",
      city: "İstanbul",
      baseMinScore: 510
    },
    {
      university: "İstanbul Üniversitesi",
      program: "Psikoloji",
      city: "İstanbul",
      baseMinScore: 495
    },
    {
      university: "Gazi Üniversitesi",
      program: "Türkçe Öğretmenliği",
      city: "Ankara",
      baseMinScore: 450
    },
    {
      university: "Ankara Üniversitesi",
      program: "Tarih",
      city: "Ankara",
      baseMinScore: 440
    },
    {
      university: "Ege Üniversitesi",
      program: "Sosyoloji",
      city: "İzmir",
      baseMinScore: 435
    }
  ]
};

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function recommendForScore(scoreType, rawScore) {
  const score = toNumber(rawScore);
  if (!score || !PROGRAM_CATALOG[scoreType]) return [];

  const pool = PROGRAM_CATALOG[scoreType];

  // Puanı merkeze alarak +-35 puanlık bir bantta en yakın programları bul.
  const BAND = 35;
  let candidates = pool.filter(
    (p) => Math.abs(p.baseMinScore - score) <= BAND
  );

  // Eğer bant içinde uygun program yoksa, en yakın ilk 3 tercihi seç.
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

  // En fazla 3 öneri dön.
  return candidates.slice(0, 3).map((p, idx) => ({
    id: `${scoreType}-${idx}-${p.university}-${p.program}`,
    university: p.university,
    program: p.program,
    city: p.city,
    scoreType,
    // Son min puanı, baseMinScore etrafında hafifçe kişiselleştiriyoruz.
    lastMinScore: Number(
      (0.7 * p.baseMinScore + 0.3 * score).toFixed(2)
    )
  }));
}

export async function fetchYokAtlasSuggestions({ tyt, say, ea, soz, year }) {
  console.info("[YÖK Atlas] Heuristik öneri hesaplanıyor →", {
    tyt,
    say,
    ea,
    soz,
    year
  });

  // Küçük bir gecikme ile "hesaplama" hissi verelim.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const suggestions = [
    ...recommendForScore("SAY", say),
    ...recommendForScore("EA", ea),
    ...recommendForScore("SOZ", soz)
  ];

  // Eğer SAY/EA/SÖZ girilmediyse ama yüksek bir TYT puanı varsa,
  // dengeli bir profil için birkaç karma program öner.
  const tytScore = toNumber(tyt);
  if (suggestions.length === 0 && tytScore && tytScore >= 400) {
    const mixed = [
      ...recommendForScore("SAY", tytScore),
      ...recommendForScore("EA", tytScore),
      ...recommendForScore("SOZ", tytScore)
    ];
    return mixed.slice(0, 4);
  }

  return suggestions;
}

// Autonomous client responsible only for bilimsel / istatistiksel tercih önerileri.
// Şu an için, gerçek YÖK Atlas verisi yerine mantıklı ve açıklanabilir
// heuristiklere dayalı örnek öneriler üretir.

const PROGRAM_CATALOG = {
  SAY: [
    {
      university: "Boğaziçi Üniversitesi",
      program: "Bilgisayar Mühendisliği",
      city: "İstanbul",
      baseMinScore: 560
    },
    {
      university: "Orta Doğu Teknik Üniversitesi",
      program: "Elektrik-Elektronik Mühendisliği",
      city: "Ankara",
      baseMinScore: 545
    },
    {
      university: "İstanbul Teknik Üniversitesi",
      program: "Makine Mühendisliği",
      city: "İstanbul",
      baseMinScore: 530
    },
    {
      university: "Hacettepe Üniversitesi",
      program: "Tıp",
      city: "Ankara",
      baseMinScore: 570
    },
    {
      university: "Ege Üniversitesi",
      program: "Diş Hekimliği",
      city: "İzmir",
      baseMinScore: 540
    }
  ],
  EA: [
    {
      university: "Galatasaray Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      baseMinScore: 515
    },
    {
      university: "İstanbul Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      baseMinScore: 505
    },
    {
      university: "Ankara Üniversitesi",
      program: "Siyasal Bilgiler Fakültesi - İşletme",
      city: "Ankara",
      baseMinScore: 480
    },
    {
      university: "Marmara Üniversitesi",
      program: "İktisat",
      city: "İstanbul",
      baseMinScore: 465
    },
    {
      university: "Dokuz Eylül Üniversitesi",
      program: "İşletme",
      city: "İzmir",
      baseMinScore: 455
    }
  ],
  SOZ: [
    {
      university: "Boğaziçi Üniversitesi",
      program: "Psikoloji",
      city: "İstanbul",
      baseMinScore: 510
    },
    {
      university: "İstanbul Üniversitesi",
      program: "Psikoloji",
      city: "İstanbul",
      baseMinScore: 495
    },
    {
      university: "Gazi Üniversitesi",
      program: "Türkçe Öğretmenliği",
      city: "Ankara",
      baseMinScore: 450
    },
    {
      university: "Ankara Üniversitesi",
      program: "Tarih",
      city: "Ankara",
      baseMinScore: 440
    },
    {
      university: "Ege Üniversitesi",
      program: "Sosyoloji",
      city: "İzmir",
      baseMinScore: 435
    }
  ]
};

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function recommendForScore(scoreType, rawScore) {
  const score = toNumber(rawScore);
  if (!score || !PROGRAM_CATALOG[scoreType]) return [];

  const pool = PROGRAM_CATALOG[scoreType];

  // Puanı merkeze alarak +-35 puanlık bir bantta en yakın programları bul.
  const BAND = 35;
  let candidates = pool.filter(
    (p) => Math.abs(p.baseMinScore - score) <= BAND
  );

  // Eğer bant içinde uygun program yoksa, en yakın ilk 3 tercihi seç.
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

  // En fazla 3 öneri dön.
  return candidates.slice(0, 3).map((p, idx) => ({
    id: `${scoreType}-${idx}-${p.university}-${p.program}`,
    university: p.university,
    program: p.program,
    city: p.city,
    scoreType,
    // Son min puanı, baseMinScore etrafında hafifçe kişiselleştiriyoruz.
    lastMinScore: Number(
      (0.7 * p.baseMinScore + 0.3 * score).toFixed(2)
    )
  }));
}

export async function fetchYokAtlasSuggestions({ tyt, say, ea, soz, year }) {
  console.info("[YÖK Atlas] Heuristik öneri hesaplanıyor →", {
    tyt,
    say,
    ea,
    soz,
    year
  });

  // Küçük bir gecikme ile "hesaplama" hissi verelim.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const suggestions = [
    ...recommendForScore("SAY", say),
    ...recommendForScore("EA", ea),
    ...recommendForScore("SOZ", soz)
  ];

  // Eğer SAY/EA/SÖZ girilmediyse ama yüksek bir TYT puanı varsa,
  // dengeli bir profil için birkaç karma program öner.
  const tytScore = toNumber(tyt);
  if (suggestions.length === 0 && tytScore && tytScore >= 400) {
    const mixed = [
      ...recommendForScore("SAY", tytScore),
      ...recommendForScore("EA", tytScore),
      ...recommendForScore("SOZ", tytScore)
    ];
    return mixed.slice(0, 4);
  }

  return suggestions;
}

// Autonomous client responsible only for YÖK Atlas / tercih verisi iletişimi.
// Bu katman, frontend ile gerçek veri kaynağınız (örn. kendi API'niz veya bir proxy)
// arasında tek temas noktasıdır.

const API_BASE_URL = import.meta.env.VITE_YOK_ATLAS_API_URL;

/**
 * Kullanıcının puanlarına göre öneri listesini getirir.
 *
 * Beklenen API sözleşmesi (örnek):
 *  POST {VITE_YOK_ATLAS_API_URL}/suggestions
 *  Body:
 *  {
 *    "year": "2025",
 *    "scores": {
 *      "tyt": 420.75,
 *      "say": 430.12,
 *      "ea": 395.6,
 *      "soz": 380.2
 *    }
 *  }
 *
 *  Response:
 *  [
 *    {
 *      "id": "boun-ceng",
 *      "university": "Boğaziçi Üniversitesi",
 *      "program": "Bilgisayar Mühendisliği",
 *      "city": "İstanbul",
 *      "scoreType": "SAY",
 *      "lastMinScore": 560.42
 *    },
 *    ...
 *  ]
 */
export async function fetchYokAtlasSuggestions({ tyt, say, ea, soz, year }) {
  if (!API_BASE_URL) {
    throw new Error(
      "YÖK Atlas API adresi tanımlı değil. Lütfen .env dosyasında VITE_YOK_ATLAS_API_URL değişkenini ayarlayın."
    );
  }

  const url = `${API_BASE_URL.replace(/\/$/, "")}/suggestions`;

  const payload = {
    year,
    scores: {
      tyt: tyt ? Number(tyt) : null,
      say: say ? Number(say) : null,
      ea: ea ? Number(ea) : null,
      soz: soz ? Number(soz) : null
    }
  };

  console.info("[YÖK Atlas] Request →", url, payload);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("[YÖK Atlas] API error:", response.status, text);
    throw new Error("YÖK Atlas API isteği başarısız oldu.");
  }

  const data = await response.json();

  // Güvenli normalize etme (beklenen şekle map ediyoruz)
  const normalized = Array.isArray(data)
    ? data.map((item, index) => ({
        id: item.id ?? index,
        university: item.university ?? item.universite ?? "Bilinmeyen Üniversite",
        program: item.program ?? item.bolum ?? "Bilinmeyen Program",
        city: item.city ?? item.sehir ?? "Bilinmeyen",
        scoreType: item.scoreType ?? item.puanTuru ?? "TYT",
        lastMinScore:
          typeof item.lastMinScore === "number"
            ? item.lastMinScore
            : typeof item.sonMinPuan === "number"
            ? item.sonMinPuan
            : 0
      }))
    : [];

  console.info("[YÖK Atlas] Response ←", normalized);

  return normalized;
}

