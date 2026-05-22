import { revelations } from '../data/copy';

export default function BirthdayNarrative({ firstCollisionAt, peopleCount, prediction, probability }) {
  const message = firstCollisionAt
    ? `A match already occurred at ${firstCollisionAt}.`
    : peopleCount < 10
      ? 'The room still feels too small for coincidence.'
      : peopleCount < 23
        ? 'This is where intuition starts to get nervous.'
        : 'Only 23 people are needed for greater than 50%.';
  const revelationIndex = firstCollisionAt ? 2 : peopleCount > 30 ? 3 : peopleCount > 18 ? 1 : 0;

  return (
    <aside className="absolute inset-x-4 top-20 z-20 md:left-6 md:right-auto md:top-24 md:w-[27rem]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/58 p-4 shadow-goldGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-yellow-100/55">Coincidence chamber</p>
        <h1 className="mt-3 text-2xl text-white md:text-3xl">{message}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">{revelations[revelationIndex]}</p>
        <p className="mt-3 font-mono text-sm text-cyan-100">Your prediction: {prediction} people · actual probability now: {(probability * 100).toFixed(1)}%</p>
      </div>
    </aside>
  );
}
