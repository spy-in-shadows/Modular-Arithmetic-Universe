export default function BirthdayControls({
  autoPopulate,
  comparePrediction,
  showCalendar,
  showCurve,
  showHeatmap,
  showPairs,
  simulationSpeed,
  simulationLoop,
  onAddPerson,
  onAutoPopulate,
  onAutoSimulate,
  onCalendar,
  onCompare,
  onCurve,
  onHeatmap,
  onPairs,
  onReset,
  onSimulationSpeed,
  onSimulationLoop,
}) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 grid gap-3 md:inset-x-auto md:bottom-6 md:right-6 md:w-[25rem]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-2">
          <button type="button" onClick={onAddPerson} className="birthday-button">Add Person</button>
          <button type="button" onClick={onAutoPopulate} className={`birthday-button ${autoPopulate ? 'is-active' : ''}`}>Auto Populate</button>
          <button type="button" onClick={onReset} className="birthday-button">Reset</button>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {[100, 1000, 5000].map((count) => (
            <button key={count} type="button" onClick={() => onAutoSimulate(count)} className="birthday-button">Sim {count}</button>
          ))}
          <button type="button" onClick={onSimulationLoop} className={`birthday-button ${simulationLoop ? 'is-active' : ''}`}>Loop</button>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onPairs} className={`birthday-button ${showPairs ? 'is-active' : ''}`}>Pair Connections</button>
          <button type="button" onClick={onHeatmap} className={`birthday-button ${showHeatmap ? 'is-active' : ''}`}>Heatmap</button>
          <button type="button" onClick={onCalendar} className={`birthday-button ${showCalendar ? 'is-active' : ''}`}>Calendar Space</button>
          <button type="button" onClick={onCurve} className={`birthday-button ${showCurve ? 'is-active' : ''}`}>Probability Curve</button>
          <button type="button" onClick={onCompare} className={`birthday-button ${comparePrediction ? 'is-active' : ''}`}>Compare Guess</button>
        </div>
        <label className="grid gap-2 text-xs text-slate-300">
          <span className="flex justify-between">
            <span>Simulation speed</span>
            <span className="font-mono text-yellow-100">{simulationSpeed.toFixed(2)}</span>
          </span>
          <input className="range" type="range" min="0.4" max="3" step="0.05" value={simulationSpeed} onChange={(event) => onSimulationSpeed(Number(event.target.value))} />
        </label>
      </div>
    </div>
  );
}
