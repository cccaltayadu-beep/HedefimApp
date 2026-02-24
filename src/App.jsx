import React, { useEffect, useState } from "react";
import { fetchYokAtlasSuggestions } from "./services/heuristicYokAtlasClient.js";

const ALL_CITIES = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "Mersin",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce"
];

const ALL_UNIVERSITIES = [
  "Boğaziçi Üniversitesi",
  "Orta Doğu Teknik Üniversitesi",
  "İstanbul Teknik Üniversitesi",
  "İstanbul Üniversitesi",
  "İstanbul Üniversitesi-Cerrahpaşa",
  "Marmara Üniversitesi",
  "Yıldız Teknik Üniversitesi",
  "Galatasaray Üniversitesi",
  "Mimar Sinan Güzel Sanatlar Üniversitesi",
  "Hacettepe Üniversitesi",
  "Ankara Üniversitesi",
  "Gazi Üniversitesi",
  "Yıldırım Beyazıt Üniversitesi",
  "Ege Üniversitesi",
  "Dokuz Eylül Üniversitesi",
  "Akdeniz Üniversitesi",
  "Çukurova Üniversitesi",
  "Uludağ Üniversitesi",
  "Sakarya Üniversitesi",
  "Kocaeli Üniversitesi",
  "Selçuk Üniversitesi",
  "Erciyes Üniversitesi",
  "Fırat Üniversitesi",
  "Atatürk Üniversitesi",
  "Ondokuz Mayıs Üniversitesi",
  "Karadeniz Teknik Üniversitesi",
  "Pamukkale Üniversitesi",
  "Eskişehir Osmangazi Üniversitesi",
  "Anadolu Üniversitesi",
  "Trakya Üniversitesi",
  "Çanakkale Onsekiz Mart Üniversitesi",
  "Adnan Menderes Üniversitesi",
  "Muğla Sıtkı Koçman Üniversitesi",
  "İnönü Üniversitesi",
  "Süleyman Demirel Üniversitesi",
  "Kahramanmaraş Sütçü İmam Üniversitesi",
  "Dicle Üniversitesi",
  "Gaziantep Üniversitesi",
  "Mersin Üniversitesi",
  "Kırıkkale Üniversitesi",
  "Niğde Ömer Halisdemir Üniversitesi",
  "Manisa Celal Bayar Üniversitesi",
  "Kastamonu Üniversitesi",
  "Aksaray Üniversitesi",
  "Uşak Üniversitesi",
  "Afyon Kocatepe Üniversitesi",
  "Balıkesir Üniversitesi",
  "Kırklareli Üniversitesi",
  "Bolu Abant İzzet Baysal Üniversitesi",
  "Karabük Üniversitesi",
  "Yalova Üniversitesi",
  "Bartın Üniversitesi",
  "Osmaniye Korkut Ata Üniversitesi",
  "İzmir Katip Çelebi Üniversitesi",
  "İzmir Demokrasi Üniversitesi",
  "İstanbul Medeniyet Üniversitesi",
  "İstanbul Üniversitesi-Cerrahpaşa",
  "İstanbul Teknik Üniversitesi Kuzey Kıbrıs",
  "Yeditepe Üniversitesi",
  "Sabancı Üniversitesi",
  "Koç Üniversitesi",
  "İstanbul Bilgi Üniversitesi",
  "İstanbul Kültür Üniversitesi",
  "Bahçeşehir Üniversitesi",
  "Beykent Üniversitesi",
  "Işık Üniversitesi",
  "İstanbul Ticaret Üniversitesi",
  "İstanbul Şehir Üniversitesi",
  "Maltepe Üniversitesi",
  "Üsküdar Üniversitesi",
  "Acıbadem Mehmet Ali Aydınlar Üniversitesi",
  "Bezmialem Vakıf Üniversitesi",
  "İstinye Üniversitesi",
  "Medipol Üniversitesi",
  "Özyeğin Üniversitesi",
  "TOBB Ekonomi ve Teknoloji Üniversitesi",
  "Atılım Üniversitesi",
  "Çankaya Üniversitesi",
  "Başkent Üniversitesi",
  "Ted Üniversitesi",
  "Bilkent Üniversitesi",
  "İzmir Ekonomi Üniversitesi",
  "Yaşar Üniversitesi",
  "Dokuz Eylül Üniversitesi",
  "Başka Bir Vakıf Üniversitesi"
];

function App() {
  const [form, setForm] = useState({
    year: "2025",
    tyt: "",
    say: "",
    ea: "",
    soz: ""
  });

  const [loading, setLoading] = useState(false);
  const [baseResults, setBaseResults] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    duration: "all",
    universityType: "all",
    scholarship: "all",
    city: "all",
    university: "all",
    minScore: "",
    maxScore: "",
    minRank: "",
    maxRank: ""
  });

  const applyFilters = (items, f) => {
    return items.filter((item) => {
      if (f.duration !== "all" && item.duration !== f.duration) return false;
      if (f.universityType !== "all" && item.universityType !== f.universityType)
        return false;
      if (f.scholarship !== "all" && item.scholarship !== f.scholarship)
        return false;
      if (f.city !== "all" && item.city !== f.city) return false;
      if (f.university !== "all" && item.university !== f.university)
        return false;

      const score = item.lastMinScore;
      if (f.minScore && score < Number(f.minScore)) return false;
      if (f.maxScore && score > Number(f.maxScore)) return false;

      const rank = item.estimatedRank;
      if (f.minRank && rank && rank < Number(f.minRank)) return false;
      if (f.maxRank && rank && rank > Number(f.maxRank)) return false;

      return true;
    });
  };

  useEffect(() => {
    if (baseResults.length === 0) return;
    setResults(applyFilters(baseResults, filters));
  }, [baseResults, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await fetchYokAtlasSuggestions(form);
      setBaseResults(data);
      setResults(applyFilters(data, filters));
    } catch (err) {
      setError("Şu anda önerileri getirirken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark via-brand-navy to-black">
      {/* Top navigation */}
      <header className="border-b border-white/5 bg-brand-dark/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-sky-400 shadow-lg shadow-blue-500/40">
              <span className="text-lg font-semibold tracking-tight">H</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                Hedefim
              </div>
              <div className="text-xs text-slate-400">
                Bilimsel Tercih Rehberi
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <button className="transition hover:text-white">
              Özellikler
            </button>
            <button className="transition hover:text-white">Bilimsel Altyapı</button>
            <button className="transition hover:text-white">Hakkında</button>
          </nav>
        </div>
      </header>

      {/* Hero + Input */}
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-16">
        <section className="max-w-xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200 shadow-sm shadow-emerald-500/30">
            Bilimsel, şeffaf ve tarafsız tercih analizi
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            YKS puanınızı,
            <span className="block bg-gradient-to-r from-sky-300 via-white to-blue-400 bg-clip-text text-transparent">
              geleceğe dönüşen bir stratejiye
            </span>{" "}
            çevirin.
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
            Hedefim, YÖK Atlas verileri ve istatistiksel modeller ile
            puanlarınıza en uygun programları bilimsel olarak sıralayan
            prestijli bir tercih asistanıdır. Öğrenciler ve aileler için
            tasarlandı, akademik danışmanlar tarafından şekillendirildi.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Gerçek veriye hazır mimari
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <span>YKS 2024 / 2025 formatına uyumlu</span>
          </div>
        </section>

        {/* Score input card */}
        <section className="w-full max-w-md">
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 p-[1px] shadow-card">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-blue-500/25 via-sky-500/10 to-transparent blur-3xl" />

            <div className="relative space-y-6 rounded-3xl bg-slate-950/80 p-6 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    YKS Puan Alanı
                  </h2>
                  <p className="text-xs text-slate-400">
                    Puanlarınızı girin, potansiyel program önerilerini görün.
                  </p>
                </div>
                <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-sky-300 ring-1 ring-sky-500/40">
                  Erken erişim
                </span>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="year"
                      className="text-[11px] font-medium text-slate-300"
                    >
                      Sınav Yılı
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 shadow-inner shadow-black/40 outline-none transition focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    >
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="tyt"
                      className="text-[11px] font-medium text-slate-300"
                    >
                      TYT Puanı
                    </label>
                    <input
                      id="tyt"
                      name="tyt"
                      type="number"
                      min="0"
                      max="600"
                      step="0.01"
                      value={form.tyt}
                      onChange={handleChange}
                      placeholder="Örn. 420.75"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/40 outline-none transition focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="say"
                      className="text-[11px] font-medium text-slate-300"
                    >
                      SAY
                    </label>
                    <input
                      id="say"
                      name="say"
                      type="number"
                      min="0"
                      max="600"
                      step="0.01"
                      value={form.say}
                      onChange={handleChange}
                      placeholder="SAY"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/40 outline-none transition focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="ea"
                      className="text-[11px] font-medium text-slate-300"
                    >
                      EA
                    </label>
                    <input
                      id="ea"
                      name="ea"
                      type="number"
                      min="0"
                      max="600"
                      step="0.01"
                      value={form.ea}
                      onChange={handleChange}
                      placeholder="EA"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/40 outline-none transition focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="soz"
                      className="text-[11px] font-medium text-slate-300"
                    >
                      SÖZ
                    </label>
                    <input
                      id="soz"
                      name="soz"
                      type="number"
                      min="0"
                      max="600"
                      step="0.01"
                      value={form.soz}
                      onChange={handleChange}
                      placeholder="SÖZ"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 shadow-inner shadow-black/40 outline-none transition focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-blue via-sky-500 to-cyan-400 px-4 py-2.5 text-xs font-semibold tracking-wide text-white shadow-lg shadow-sky-600/40 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Analiz ediliyor..." : "Bilimsel Analiz Başlat"}
                </button>
              </form>

              {/* Advanced filter panel */}
              <div className="space-y-3 rounded-2xl border border-sky-500/20 bg-slate-950/80 p-3">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Gelişmiş Filtreler</span>
                  <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-medium text-sky-200">
                    Anlık güncellenen sonuçlar
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-200">
                  <div className="space-y-1.5">
                    <label className="font-medium">Program Süresi</label>
                    <select
                      name="duration"
                      value={filters.duration}
                      onChange={handleFilterChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    >
                      <option value="all">Tümü</option>
                      <option value="4">4 Yıllık (Fakülte)</option>
                      <option value="2">2 Yıllık (MYO)</option>
                      <option value="6">6 Yıllık (Tıp vb.)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium">Üniversite Türü</label>
                    <select
                      name="universityType"
                      value={filters.universityType}
                      onChange={handleFilterChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    >
                      <option value="all">Tümü</option>
                      <option value="devlet">Devlet</option>
                      <option value="vakif">Vakıf (Özel)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium">Burs / Ücret</label>
                    <select
                      name="scholarship"
                      value={filters.scholarship}
                      onChange={handleFilterChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    >
                      <option value="all">Tümü</option>
                      <option value="ucretsiz">Ücretsiz</option>
                      <option value="burslu">Tam Burslu</option>
                      <option value="indirim75">%75 İndirimli</option>
                      <option value="indirim50">%50 İndirimli</option>
                      <option value="ucretli">Ücretli</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium">Şehir</label>
                    <select
                      name="city"
                      value={filters.city}
                      onChange={handleFilterChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    >
                      <option value="all">Tüm İller</option>
                      {ALL_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium">Üniversite</label>
                    <select
                      name="university"
                      value={filters.university}
                      onChange={handleFilterChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                    >
                      <option value="all">Tüm Üniversiteler</option>
                      {ALL_UNIVERSITIES.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium">Puan Aralığı</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="number"
                        name="minScore"
                        value={filters.minScore}
                        onChange={handleFilterChange}
                        placeholder="En az"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                      />
                      <input
                        type="number"
                        name="maxScore"
                        value={filters.maxScore}
                        onChange={handleFilterChange}
                        placeholder="En çok"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-medium">Başarı Sırası</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="number"
                        name="minRank"
                        value={filters.minRank}
                        onChange={handleFilterChange}
                        placeholder="En iyi"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                      />
                      <input
                        type="number"
                        name="maxRank"
                        value={filters.maxRank}
                        onChange={handleFilterChange}
                        placeholder="En kötü"
                        className="w-full rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 outline-none focus:border-sky-400/70 focus:ring-1 focus:ring-sky-400/60"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/5 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Önizleme Çıktısı</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    YÖK Atlas ile entegre edilmeye hazır
                  </span>
                </div>
                {error && (
                  <p className="text-xs text-rose-300">
                    {error}
                  </p>
                )}
                {!error && results.length === 0 && (
                  <p className="text-xs text-slate-400">
                    Puanlarınızı girip analizi başlattığınızda, YÖK Atlas
                    verileri ile desteklenmiş program önerileri burada
                    görüntülenecek.
                  </p>
                )}
                {!error && results.length > 0 && (
                  <ul className="space-y-2 text-xs text-slate-200">
                    {results.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-3 rounded-xl border border-white/5 bg-slate-950/60 px-3 py-2"
                      >
                        <div>
                          <p className="font-medium text-slate-50">
                            {item.university}
                          </p>
                          <p className="text-[11px] text-slate-300">
                            {item.program} • {item.city}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {item.duration === "2"
                              ? "2 Yıllık (MYO)"
                              : item.duration === "6"
                              ? "6 Yıllık (Tıp vb.)"
                              : "4 Yıllık (Fakülte)"}{" "}
                            •{" "}
                            {item.universityType === "vakif"
                              ? "Vakıf Üniversitesi"
                              : "Devlet Üniversitesi"}{" "}
                            • {item.scholarship === "ucretsiz"
                              ? "Ücretsiz"
                              : item.scholarship === "burslu"
                              ? "Tam Burslu"
                              : item.scholarship === "indirim75"
                              ? "%75 İndirimli"
                              : item.scholarship === "indirim50"
                              ? "%50 İndirimli"
                              : "Ücretli"}
                          </p>
                        </div>
                        <div className="text-right text-[11px] text-slate-300">
                          <span className="inline-flex items-center justify-end gap-1">
                            <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                              {item.scoreType}
                            </span>
                            <span className="text-slate-200">
                              {item.lastMinScore.toFixed(2)}
                            </span>
                          </span>
                          <p className="text-[10px] text-slate-500">
                            Son yerleşen min. puan
                          </p>
                          {item.estimatedRank && (
                            <p className="mt-0.5 text-[10px] text-slate-500">
                              Tahmini başarı sırası:{" "}
                              <span className="text-slate-200">
                                {item.estimatedRank.toLocaleString("tr-TR")}
                              </span>
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Secondary section */}
      <section className="mx-auto max-w-6xl px-4 pb-12 lg:px-6 lg:pb-16">
        <div className="grid gap-8 rounded-3xl border border-white/5 bg-slate-950/40 p-6 backdrop-blur sm:grid-cols-3 sm:p-8">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Bilimsel Yaklaşım
            </h3>
            <p className="text-xs text-slate-400">
              YÖK Atlas verilerini, istatistiksel dağılımlar ve geçmiş yıl
              trendleri ile birleştirerek olasılık odaklı bir tercih simülasyonu
              kurguluyoruz.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Şeffaflık
            </h3>
            <p className="text-xs text-slate-400">
              Her öneri için dayandığı veri setlerini, sıralama mantığını ve
              varsayımları öğrenciler ve aileler için okunabilir biçimde
              açıklamayı hedefliyoruz.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Hakkında
            </h3>
            <p className="text-xs text-slate-400">
              Hedefim,{" "}
              <span className="font-semibold text-slate-200">
                Learning DNA EdTech
              </span>{" "}
              tarafından geliştirilen, yalnızca yerleşmeye değil, mezuniyet
              sonrası akademik ve profesyonel başarıya odaklanan bir tercih
              rehberidir.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-brand-dark/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} Hedefim. Tüm hakları saklıdır.</p>
            <div className="flex flex-wrap items-center gap-4">
              <span>Kurucu: İbrahim</span>
              <span className="h-3 w-px bg-slate-700" />
              <button className="text-slate-400 transition hover:text-slate-200">
                Gizlilik
              </button>
              <button className="text-slate-400 transition hover:text-slate-200">
                İletişim
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className="rounded-full border border-sky-500/40 bg-gradient-to-r from-brand-navy via-sky-900 to-brand-navy px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100 shadow-lg shadow-sky-900/40">
              Learning DNA EdTech
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

