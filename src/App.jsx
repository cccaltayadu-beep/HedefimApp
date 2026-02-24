import React, { useState } from "react";
import { fetchYokAtlasSuggestions } from "./services/yokAtlasClient.js";

function App() {
  const [form, setForm] = useState({
    year: "2025",
    tyt: "",
    say: "",
    ea: "",
    soz: ""
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

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
      setResults(data);
    } catch (err) {
      setError("Şu anda önerileri getirirken bir sorun oluştu.");
    } finally {
      setLoading(false);
    }
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

          <button className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-100 shadow-sm shadow-slate-900/40 backdrop-blur md:inline-flex hover:bg-white/10">
            Giriş / Kayıt
          </button>
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
              Uzun Vadeli Vizyon
            </h3>
            <p className="text-xs text-slate-400">
              Hedefim, yalnızca yerleşmeye değil, mezuniyet sonrası akademik ve
              profesyonel başarıya odaklanan bir tercih rehberi olarak
              tasarlandı.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-brand-dark/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-slate-500 sm:flex-row lg:px-6">
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
      </footer>
    </div>
  );
}

export default App;

