import { banachPhases, intuitionChoices } from '../data/phases';

const choiceResponses = {
  impossible: 'Correct in physical reality.',
  stretching: 'Stretching changes shape, not quantity.',
  matter: 'Physical duplication needs added matter.',
};

export default function BanachNarrativePanel({ choice, phaseIndex, onChoose }) {
  const phase = banachPhases[phaseIndex];

  return (
    <aside className="absolute inset-x-4 top-20 z-20 md:left-6 md:right-auto md:top-24 md:w-[27rem]">
      <div className="max-h-[52vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/62 p-3 shadow-violetGlow backdrop-blur-xl md:max-h-none md:p-4">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/55">{phase.title}</p>
        <p className="mt-3 font-mono text-sm text-cyan-50">{phase.equation}</p>
        <h2 className="mt-3 text-lg text-white md:text-2xl">{phase.narration}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{phase.revelation}</p>

        {phaseIndex === 0 ? (
          <div className="mt-3 grid gap-2">
            <p className="text-sm text-slate-300">Can this become two identical spheres?</p>
            {intuitionChoices.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onChoose(value)}
                className={`rounded-2xl border px-4 py-2.5 text-left transition md:py-3 ${
                  choice === value ? 'border-violet-200/45 bg-violet-200/12 text-white' : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-white/25'
                }`}
              >
                {label}
              </button>
            ))}
            {choice ? <p className="pt-2 text-sm leading-6 text-cyan-100">{choiceResponses[choice]} Now watch mathematics become less polite.</p> : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
