export default function MachineConsole({
  autoGenerate,
  chaosMode,
  input,
  machineStability,
  massiveMode,
  running,
  showHeatmap,
  showPath,
  showTree,
  simulationSpeed,
  onAutoGenerate,
  onChaosMode,
  onHeatmap,
  onInput,
  onInject,
  onMassiveMode,
  onReset,
  onRunning,
  onShowPath,
  onShowTree,
  onStability,
  onSpeed,
}) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 grid gap-3 md:inset-x-auto md:bottom-6 md:right-6 md:w-[25rem]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl">
        <div className="flex gap-2">
          <input type="number" min="1" value={input} onChange={(event) => onInput(Number(event.target.value) || 1)} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 font-mono text-white outline-none focus:border-orange-200/50" />
          <button type="button" onClick={onInject} className="collatz-button is-hot">Enter Number</button>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button type="button" onClick={onAutoGenerate} className={`collatz-button ${autoGenerate ? 'is-active' : ''}`}>Auto Generate</button>
          <button type="button" onClick={onMassiveMode} className={`collatz-button ${massiveMode ? 'is-active' : ''}`}>Massive</button>
          <button type="button" onClick={onReset} className="collatz-button">Reset</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onRunning} className={`collatz-button ${running ? 'is-active' : ''}`}>{running ? 'Pause' : 'Run'}</button>
          <button type="button" onClick={onShowPath} className={`collatz-button ${showPath ? 'is-active' : ''}`}>Sequence Path</button>
          <button type="button" onClick={onShowTree} className={`collatz-button ${showTree ? 'is-active' : ''}`}>Tree</button>
          <button type="button" onClick={onHeatmap} className={`collatz-button ${showHeatmap ? 'is-active' : ''}`}>Heatmap</button>
          <button type="button" onClick={onChaosMode} className={`collatz-button ${chaosMode ? 'is-active' : ''}`}>Chaos Mode</button>
        </div>
        {[
          ['Simulation Speed', simulationSpeed, onSpeed, 0.25, 3],
          ['Machine Stability', machineStability, onStability, 0, 1],
        ].map(([label, value, setter, min, max]) => (
          <label key={label} className="mb-3 grid gap-2 text-xs text-slate-300 last:mb-0">
            <span className="flex justify-between">
              <span>{label}</span>
              <span className="font-mono text-orange-100">{Number(value).toFixed(2)}</span>
            </span>
            <input className="range" type="range" min={min} max={max} step="0.05" value={value} onChange={(event) => setter(Number(event.target.value))} />
          </label>
        ))}
      </div>
    </div>
  );
}
