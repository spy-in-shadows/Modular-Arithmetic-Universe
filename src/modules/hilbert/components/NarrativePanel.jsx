import { narrativePhases } from '../data/phases';

export default function NarrativePanel({ attemptMessage, choice, phaseIndex, onChoose }) {
  const phase = narrativePhases[phaseIndex];

  return (
    <aside className="absolute inset-x-4 top-20 z-20 md:left-6 md:right-auto md:top-24 md:w-[25rem]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 shadow-cyanGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">{phase.title}</p>
        <p className="mt-3 font-mono text-sm text-cyan-50">{phase.equation}</p>
        <h2 className="mt-3 text-xl text-white md:text-2xl">{phase.narration}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{phase.revelation}</p>

        {phase.id === 'arrival' ? (
          <div className="mt-4 grid gap-2">
            {[
              ['reject', 'Reject guest'],
              ['build', 'Build new room'],
              ['shift', 'Shift every guest'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onChoose(value)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  choice === value ? 'border-cyan-200/45 bg-cyan-200/12 text-white' : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/25'
                }`}
              >
                {label}
              </button>
            ))}
            {attemptMessage ? <p className="pt-2 text-sm leading-6 text-cyan-100">{attemptMessage}</p> : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
