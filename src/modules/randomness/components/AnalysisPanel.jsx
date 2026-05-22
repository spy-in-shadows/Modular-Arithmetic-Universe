function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-cyan-100/45">{label}</p>
      <p className="mt-1 font-mono text-xl text-white">{value}</p>
    </div>
  );
}

export default function AnalysisPanel({ human, rng, phase, simulationCount }) {
  if (phase === 'entry' || phase === 'human') return null;

  return (
    <aside className="absolute right-4 top-20 z-20 hidden w-[25rem] rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl md:block">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">Forensic analysis</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="human score" value={human.score} />
        <Metric label="rng score" value={rng.score} />
        <Metric label="human entropy" value={`${Math.round(human.entropy * 100)}%`} />
        <Metric label="rng entropy" value={`${Math.round(rng.entropy * 100)}%`} />
        <Metric label="human clusters" value={`${Math.round(human.clusterIndex * 100)}%`} />
        <Metric label="rng clusters" value={`${Math.round(rng.clusterIndex * 100)}%`} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        Human patterns often look balanced because people avoid suspicious clumps. Actual randomness permits ugly spacing, dense pockets, and long quiet gaps.
      </p>
      {simulationCount ? <p className="mt-3 font-mono text-sm text-fuchsia-100">{simulationCount.toLocaleString()} random fields scanned</p> : null}
    </aside>
  );
}
