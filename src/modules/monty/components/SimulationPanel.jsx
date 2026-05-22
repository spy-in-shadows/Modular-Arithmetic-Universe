export default function SimulationPanel({
  hostCommentary,
  showProbability,
  showStats,
  showTree,
  simulationSpeed,
  onAutoSimulate,
  onHostCommentary,
  onProbability,
  onSimulationSpeed,
  onStats,
  onTree,
}) {
  return (
    <aside className="absolute right-4 top-20 z-20 hidden w-[24rem] rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl md:block">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">Simulation engine</p>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[10, 100, 1000, 10000].map((count) => (
          <button key={count} type="button" onClick={() => onAutoSimulate(count)} className="monty-button">
            +{count}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={onProbability} className={`monty-button ${showProbability ? 'is-active' : ''}`}>Probability Layer</button>
        <button type="button" onClick={onTree} className={`monty-button ${showTree ? 'is-active' : ''}`}>Decision Tree</button>
        <button type="button" onClick={onStats} className={`monty-button ${showStats ? 'is-active' : ''}`}>Statistics</button>
        <button type="button" onClick={onHostCommentary} className={`monty-button ${hostCommentary ? 'is-active' : ''}`}>Host Lines</button>
      </div>
      <label className="mt-4 grid gap-2 text-xs text-slate-300">
        <span className="flex justify-between">
          <span>Simulation speed</span>
          <span className="font-mono text-cyan-100">{simulationSpeed.toFixed(2)}</span>
        </span>
        <input className="range" type="range" min="0.4" max="2.5" step="0.05" value={simulationSpeed} onChange={(event) => onSimulationSpeed(Number(event.target.value))} />
      </label>
    </aside>
  );
}
