import { Aperture, Atom, Eye, FastForward, Orbit, Pause, Play, Repeat, Snail, Sparkles } from 'lucide-react';

function Toggle({ active, icon: Icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`banach-button ${active ? 'is-active' : ''}`}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function BanachControls({
  autoMode,
  canAdvance,
  cameraOrbit,
  equations,
  fragmentDensity,
  phaseIndex,
  pointCloud,
  realityStability,
  rotateSphere,
  slowMotion,
  topology,
  onAutoMode,
  onCameraOrbit,
  onDensity,
  onEquations,
  onNext,
  onPointCloud,
  onReplay,
  onRotateSphere,
  onSlowMotion,
  onStability,
  onTopology,
}) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 grid gap-3 md:inset-x-auto md:bottom-6 md:right-6 md:w-[25rem]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2">
          <button type="button" onClick={onNext} disabled={!canAdvance || phaseIndex >= 7} className="banach-button disabled:cursor-not-allowed disabled:opacity-40">
            <Play className="h-4 w-4" />
            Next
          </button>
          <button type="button" onClick={onReplay} className="banach-button">
            <Repeat className="h-4 w-4" />
            Replay
          </button>
          <Toggle active={slowMotion} onClick={onSlowMotion} icon={Snail} label="Slow" />
          <Toggle active={autoMode} onClick={onAutoMode} icon={FastForward} label="Auto" />
        </div>
      </div>

      {phaseIndex > 0 ? <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
        <div className="mb-4 grid grid-cols-2 gap-2">
          <Toggle active={rotateSphere} onClick={onRotateSphere} icon={Orbit} label="Rotate Sphere" />
          <Toggle active={cameraOrbit} onClick={onCameraOrbit} icon={Aperture} label="Camera Orbit" />
          <Toggle active={equations} onClick={onEquations} icon={Eye} label="Equations" />
          <Toggle active={topology} onClick={onTopology} icon={Atom} label="Topology" />
          <Toggle active={pointCloud} onClick={onPointCloud} icon={Sparkles} label="Point Cloud" />
        </div>

        {[
          ['Fragment Density', fragmentDensity, onDensity, 0.35, 1],
          ['Reality Stability', realityStability, onStability, 0, 1],
        ].map(([label, value, setter, min, max]) => (
          <label key={label} className="mb-3 grid gap-2 text-xs text-slate-300 last:mb-0">
            <span className="flex justify-between">
              <span>{label}</span>
              <span className="font-mono text-violet-100">{Number(value).toFixed(2)}</span>
            </span>
            <input className="range" type="range" min={min} max={max} step="0.05" value={value} onChange={(event) => setter(Number(event.target.value))} />
          </label>
        ))}
      </div> : null}
    </div>
  );
}
