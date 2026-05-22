import { entryLines, revelations } from '../data/copy';

export default function LabNarrativePanel({ entryIndex, humanCount, phase, simulationCount }) {
  const title =
    phase === 'entry' || phase === 'human'
      ? entryLines[Math.min(entryIndex, 2)]
      : phase === 'compare'
        ? 'Now compare it against actual RNG.'
        : simulationCount > 5000
          ? 'Randomness does not look random.'
          : 'The machine has started judging.';
  const index = phase === 'reveal' ? 2 : phase === 'compare' ? 0 : simulationCount > 0 ? 3 : 1;

  return (
    <aside className="absolute inset-x-4 top-20 z-20 md:left-6 md:right-auto md:top-24 md:w-[28rem]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/64 p-4 shadow-cyanGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">Cognitive experiment</p>
        <h1 className="mt-3 text-2xl text-white md:text-3xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {phase === 'human' || phase === 'entry'
            ? `Place points where they feel random. Samples collected: ${humanCount}.`
            : revelations[index]}
        </p>
      </div>
    </aside>
  );
}
