export default function LabControls({
  canCompare,
  illusionMode,
  massiveMode,
  phase,
  showClusters,
  showEntropy,
  showStreaks,
  onCompare,
  onGenerateHuman,
  onGenerateRng,
  onIllusion,
  onMassive,
  onReset,
  onReveal,
  onShowClusters,
  onShowEntropy,
  onShowStreaks,
}) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 grid gap-3 md:inset-x-auto md:bottom-6 md:right-6 md:w-[25rem]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onGenerateHuman} className="random-button">Generate Human Pattern</button>
          <button type="button" onClick={onGenerateRng} className="random-button">Generate True RNG</button>
          <button type="button" disabled={!canCompare} onClick={onCompare} className="random-button disabled:opacity-40">Compare Patterns</button>
          <button type="button" disabled={phase === 'entry'} onClick={onReveal} className="random-button disabled:opacity-40">Reveal Analysis</button>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onShowClusters} className={`random-button ${showClusters ? 'is-active' : ''}`}>Show Clusters</button>
          <button type="button" onClick={onShowEntropy} className={`random-button ${showEntropy ? 'is-active' : ''}`}>Entropy Map</button>
          <button type="button" onClick={onShowStreaks} className={`random-button ${showStreaks ? 'is-active' : ''}`}>Streak Analysis</button>
          <button type="button" onClick={onMassive} className={`random-button ${massiveMode ? 'is-active' : ''}`}>Massive Simulation</button>
          <button type="button" onClick={onIllusion} className={`random-button ${illusionMode ? 'is-active' : ''}`}>Illusion Mode</button>
          <button type="button" onClick={onReset} className="random-button">Reset</button>
        </div>
      </div>
    </div>
  );
}
