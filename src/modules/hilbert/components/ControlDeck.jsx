import { BusFront, Eye, GitBranch, Pause, Play, Sparkles, UserRoundPlus } from 'lucide-react';

function Toggle({ label, active, onClick, icon: Icon }) {
  return (
    <button type="button" onClick={onClick} className={`hilbert-toggle ${active ? 'is-active' : ''}`}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

export default function ControlDeck({
  cameraSpeed,
  corridorDepth,
  paused,
  showLabels,
  showMappings,
  simulationSpeed,
  onEvent,
  onCameraSpeed,
  onCorridorDepth,
  onPause,
  onLabels,
  onMappings,
  onSimulationSpeed,
}) {
  return (
    <div className="absolute inset-x-4 bottom-28 z-20 grid gap-3 md:inset-x-auto md:bottom-6 md:right-6 md:w-[22rem]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 shadow-cyanGlow backdrop-blur-xl">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onEvent('one')} className="hilbert-action">
            <UserRoundPlus className="h-4 w-4" />
            Add Guest
          </button>
          <button type="button" onClick={() => onEvent('infinite')} className="hilbert-action">
            <Sparkles className="h-4 w-4" />
            Infinite Guests
          </button>
          <button type="button" onClick={() => onEvent('buses')} className="hilbert-action hilbert-action-major">
            <BusFront className="h-4 w-4" />
            Infinite Buses
          </button>
          <button type="button" onClick={() => onEvent('prime')} className="hilbert-action">
            <GitBranch className="h-4 w-4" />
            Prime Remap
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl">
        <div className="mb-4 grid grid-cols-3 gap-2">
          <Toggle label={paused ? 'Resume' : 'Pause'} active={paused} onClick={onPause} icon={paused ? Play : Pause} />
          <Toggle label="Labels" active={showLabels} onClick={onLabels} icon={Eye} />
          <Toggle label="Mappings" active={showMappings} onClick={onMappings} icon={GitBranch} />
        </div>
        {[
          ['Camera speed', cameraSpeed, onCameraSpeed, 0.05, 1.2],
          ['Corridor depth', corridorDepth, onCorridorDepth, 12, 34],
          ['Simulation speed', simulationSpeed, onSimulationSpeed, 0.45, 2.2],
        ].map(([label, value, setter, min, max]) => (
          <label key={label} className="mb-3 grid gap-2 text-xs text-slate-300 last:mb-0">
            <span className="flex justify-between">
              <span>{label}</span>
              <span className="font-mono text-cyan-100">{Number(value).toFixed(label === 'Corridor depth' ? 0 : 2)}</span>
            </span>
            <input className="range" type="range" min={min} max={max} step={label === 'Corridor depth' ? 1 : 0.05} value={value} onChange={(event) => setter(Number(event.target.value))} />
          </label>
        ))}
      </div>
    </div>
  );
}
