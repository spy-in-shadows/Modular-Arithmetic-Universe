export default function MachineStats({ fullStats, simulations, stats, worst }) {
  return (
    <aside className="absolute right-4 top-20 z-20 hidden w-[24rem] rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl md:block">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-orange-100/55">Machine telemetry</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="current" value={stats.current} />
        <Metric label="stopping time" value={fullStats.stoppingTime} />
        <Metric label="highest peak" value={fullStats.peak} />
        <Metric label="energy" value={`${stats.energy.toFixed(0)}%`} />
      </div>
      <p className="mt-4 text-sm text-slate-300">Worst scanned under 220: {worst[0]?.start} takes {worst[0]?.stoppingTime} steps.</p>
      {simulations > 20 ? <p className="mt-3 text-sm text-cyan-100">Thousands of paths collapse into the same attractor: 4 → 2 → 1.</p> : null}
    </aside>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-orange-100/45">{label}</p>
      <p className="mt-1 font-mono text-xl text-white">{value}</p>
    </div>
  );
}
