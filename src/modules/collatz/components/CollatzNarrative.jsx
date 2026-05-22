import { entryLines, revelations } from '../data/copy';

export default function CollatzNarrative({ activeStart, simulations, stats, stepIndex }) {
  const line = stepIndex < 4 ? entryLines[Math.min(stepIndex, entryLines.length - 1)] : stats.current === 1 ? 'Every tested number falls here.' : stats.current % 2 ? 'Odd numbers explode.' : 'Even numbers divide.';
  const revelation = simulations > 20 ? revelations[4] : stats.peak > activeStart * 10 ? 'Why did this suddenly explode upward?' : revelations[Math.min(3, Math.floor(stepIndex / 8))];

  return (
    <aside className="absolute inset-x-4 top-20 z-20 md:left-6 md:right-auto md:top-24 md:w-[28rem]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/64 p-4 shadow-violetGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-orange-100/55">Collatz machine</p>
        <h1 className="mt-3 text-2xl text-white md:text-3xl">{line}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">{revelation}</p>
        <p className="mt-3 font-mono text-sm text-cyan-100">start: {activeStart} · current: {stats.current}</p>
      </div>
    </aside>
  );
}
