// Autonomous client responsible only for YÖK Atlas communication.
// Later you can replace the mocked implementation with real HTTP requests.

export async function fetchYokAtlasSuggestions({ tyt, say, ea, soz, year }) {
  // TODO: Replace this mocked logic with a real YÖK Atlas integration.
  // This function is intentionally isolated so it can evolve independently.

  console.info("[YÖK Atlas] Fetching suggestions with params:", {
    tyt,
    say,
    ea,
    soz,
    year
  });

  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mocked example data (for UI demo only)
  return [
    {
      id: 1,
      university: "Boğaziçi Üniversitesi",
      program: "Bilgisayar Mühendisliği",
      city: "İstanbul",
      scoreType: "SAY",
      lastMinScore: 560.42
    },
    {
      id: 2,
      university: "Orta Doğu Teknik Üniversitesi",
      program: "Endüstri Mühendisliği",
      city: "Ankara",
      scoreType: "SAY",
      lastMinScore: 545.15
    },
    {
      id: 3,
      university: "İstanbul Üniversitesi",
      program: "Hukuk",
      city: "İstanbul",
      scoreType: "EA",
      lastMinScore: 520.3
    }
  ];
}
