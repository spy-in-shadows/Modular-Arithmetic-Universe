import { microRevelations } from '../data/copy';

export default function RevelationTicker({ show, stats }) {
  const total = stats.stayTotal + stats.switchTotal;
  if (!show && total < 3) return null;

  const index = Math.min(microRevelations.length - 1, Math.floor(total / 3));

  return (
    <div className="pointer-events-none absolute inset-x-4 top-[58%] z-20 mx-auto max-w-xl -translate-y-1/2 md:top-auto md:bottom-8">
      <div className="rounded-full border border-fuchsia-200/20 bg-fuchsia-300/[0.08] px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.22em] text-fuchsia-50 shadow-violetGlow backdrop-blur-xl">
        {microRevelations[index]}
      </div>
    </div>
  );
}
