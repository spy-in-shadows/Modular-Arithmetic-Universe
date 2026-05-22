export default function RandomnessFinale({ simulationCount }) {
  if (simulationCount < 8000) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-[58%] z-20 mx-auto max-w-2xl -translate-y-1/2 text-center">
      <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/66 p-5 shadow-cyanGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">{simulationCount.toLocaleString()} fields scanned</p>
        <h2 className="mt-3 text-2xl text-white md:text-4xl">Randomness does not look random.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
          Human intuition expects order. Reality does not obey that expectation. The mind sees meaning even in chaos.
        </p>
      </div>
    </div>
  );
}
