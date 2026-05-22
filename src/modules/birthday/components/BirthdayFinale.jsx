export default function BirthdayFinale({ stats }) {
  if (stats.runs < 1000) return null;

  const rate = stats.runs ? (stats.collisions / stats.runs) * 100 : 0;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-[58%] z-20 mx-auto max-w-2xl -translate-y-1/2 text-center">
      <div className="rounded-2xl border border-yellow-200/20 bg-slate-950/62 p-5 shadow-goldGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-yellow-100/55">{stats.runs} simulated rooms · {rate.toFixed(1)}% matched</p>
        <h2 className="mt-3 text-2xl text-white md:text-4xl">Coincidences are not rare.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
          Human intuition simply underestimates combinations. Probability becomes inevitable in large systems.
        </p>
      </div>
    </div>
  );
}
