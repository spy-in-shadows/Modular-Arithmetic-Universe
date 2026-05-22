import { rate } from '../systems/statisticsTracker';

function Bar({ label, rateValue, total, tone }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="capitalize text-slate-300">{label}</span>
        <span className="font-mono text-cyan-50">{rateValue.toFixed(1)}% · {total}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-950/70">
        <div className={`h-full rounded-full transition-all duration-500 ${tone}`} style={{ width: `${Math.min(100, rateValue)}%` }} />
      </div>
    </div>
  );
}

export default function StatsPanel({ show, stats }) {
  if (!show) return null;
  const stayRate = rate(stats.stayWins, stats.stayTotal);
  const switchRate = rate(stats.switchWins, stats.switchTotal);
  const total = stats.stayTotal + stats.switchTotal;

  return (
    <aside className="absolute bottom-4 right-4 z-20 hidden w-[24rem] rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl md:block">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">Convergence</p>
      <p className="mt-2 font-mono text-sm text-slate-300">{total} simulated decisions</p>
      <div className="mt-4 grid gap-4">
        <Bar label="stay" rateValue={stayRate} total={stats.stayTotal} tone="bg-cyan-300" />
        <Bar label="switch" rateValue={switchRate} total={stats.switchTotal} tone="bg-fuchsia-300" />
      </div>
      {total >= 1000 ? <p className="mt-4 text-sm text-fuchsia-100">Stay ≈ 33%. Switch ≈ 67%. Your intuition lost to probability.</p> : null}
    </aside>
  );
}
