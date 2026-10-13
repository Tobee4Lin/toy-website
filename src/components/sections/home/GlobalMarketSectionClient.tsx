const COUNTRIES = [
  { flag: '🇺🇸', name: 'United States' },
  { flag: '🇲🇽', name: 'Mexico' },
  { flag: '🇧🇷', name: 'Brazil' },
  { flag: '🇦🇷', name: 'Argentina' },
  { flag: '🇨🇱', name: 'Chile' },
  { flag: '🇵🇪', name: 'Peru' },
  { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇩🇪', name: 'Germany' },
  { flag: '🇫🇷', name: 'France' },
  { flag: '🇪🇸', name: 'Spain' },
  { flag: '🇮🇹', name: 'Italy' },
  { flag: '🇵🇱', name: 'Poland' },
  { flag: '🇷🇺', name: 'Russia' },
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇸🇦', name: 'Saudi Arabia' },
  { flag: '🇪🇬', name: 'Egypt' },
  { flag: '🇹🇭', name: 'Thailand' },
  { flag: '🇻🇳', name: 'Vietnam' },
  { flag: '🇵🇭', name: 'Philippines' },
  { flag: '🇮🇩', name: 'Indonesia' },
  { flag: '🇹🇷', name: 'Turkey' },
  { flag: '🇿🇦', name: 'South Africa' },
];

const REGIONS = [
  { name: 'North America', count: 2 },
  { name: 'South America', count: 5 },
  { name: 'Europe', count: 7 },
  { name: 'Southeast Asia', count: 4 },
  { name: 'Middle East & Africa', count: 4 },
];

export default function GlobalMarketSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#0D9B8C]">
            Global Market
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#071A2D] md:text-4xl">
            Serving 20+ Countries
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Our toys are trusted by buyers across six continents — from
            the Americas and Europe to the Middle East, Southeast Asia, and Africa.
          </p>
        </div>

        {/* Region stat cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {REGIONS.map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center"
            >
              <div className="text-2xl font-bold text-[#071A2D]">{r.count}</div>
              <div className="mt-1 text-xs text-slate-500">{r.name}</div>
            </div>
          ))}
        </div>

        {/* Country pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {COUNTRIES.map((c) => (
            <span
              key={c.name}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <span>{c.flag}</span>
              {c.name}
            </span>
          ))}
          <span className="rounded-full bg-[#0D9B8C] px-4 py-2 text-sm font-medium text-white">
            + more
          </span>
        </div>
      </div>
    </section>
  );
}
