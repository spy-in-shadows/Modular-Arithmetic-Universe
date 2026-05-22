import { entryLines } from '../data/copy';
import { hostLineFor } from '../systems/hostEngine';

export default function HostPanel({ entryIndex, hostCommentary, round, stage, stats }) {
  if (!hostCommentary) return null;
  const text = stage === 'intro' ? entryLines[entryIndex] : hostLineFor(round, stage, stats);
  const eyebrow = stage === 'intro' ? 'Probability theater' : 'Host commentary';

  return (
    <aside className="absolute inset-x-4 top-20 z-20 md:left-6 md:right-auto md:top-24 md:w-[27rem]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/62 p-4 shadow-violetGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-fuchsia-100/55">{eyebrow}</p>
        <h1 className="mt-3 text-2xl text-white md:text-3xl">{text}</h1>
        {stage === 'decide' ? <p className="mt-3 text-sm leading-6 text-slate-300">It feels like fifty-fifty now. That feeling is the trap.</p> : null}
      </div>
    </aside>
  );
}
