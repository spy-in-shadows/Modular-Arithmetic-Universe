import { challengePairs } from '../data/copy';

export default function StreakLab({ challengeIndex, challengeResult, onAnswer, sequence, show, stats }) {
  if (!show) return null;
  const pair = challengePairs[challengeIndex % challengePairs.length];

  return (
    <aside className="absolute bottom-4 left-4 z-20 hidden w-[28rem] rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl md:block">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-fuchsia-100/55">Streak illusion test</p>
      <div className="mt-3 grid gap-2 font-mono text-sm">
        <button type="button" onClick={() => onAnswer('human')} className="rounded-xl border border-white/10 bg-slate-950/50 p-3 text-left text-slate-200 hover:border-fuchsia-200/40">
          A: {pair.human}
        </button>
        <button type="button" onClick={() => onAnswer('rng')} className="rounded-xl border border-white/10 bg-slate-950/50 p-3 text-left text-slate-200 hover:border-fuchsia-200/40">
          B: {pair.rng}
        </button>
      </div>
      <p className="mt-3 text-sm text-slate-300">Current RNG streak: {stats.longest}. Alternation rate: {(stats.alternation * 100).toFixed(0)}%.</p>
      {challengeResult ? <p className="mt-2 text-sm text-cyan-100">{challengeResult}</p> : null}
      <p className="mt-2 font-mono text-xs text-fuchsia-100/70">{sequence}</p>
    </aside>
  );
}
