import { FastForward, Play, Repeat, Snail } from 'lucide-react';

export default function StepControls({
  autoMode,
  canAdvance,
  phaseIndex,
  slowMotion,
  onAutoMode,
  onNext,
  onReplay,
  onSlowMotion,
}) {
  return (
    <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl md:left-6 md:right-auto md:w-[28rem]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button type="button" onClick={onNext} disabled={!canAdvance || phaseIndex >= 5} className="hilbert-action disabled:cursor-not-allowed disabled:opacity-40">
          <Play className="h-4 w-4" />
          Next step
        </button>
        <button type="button" onClick={onReplay} className="hilbert-action">
          <Repeat className="h-4 w-4" />
          Replay
        </button>
        <button type="button" onClick={onSlowMotion} className={`hilbert-action ${slowMotion ? 'is-active' : ''}`}>
          <Snail className="h-4 w-4" />
          Slow motion
        </button>
        <button type="button" onClick={onAutoMode} className={`hilbert-action ${autoMode ? 'is-active' : ''}`}>
          <FastForward className="h-4 w-4" />
          Auto mode
        </button>
      </div>
    </div>
  );
}
