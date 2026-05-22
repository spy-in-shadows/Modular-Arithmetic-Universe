import { useMemo, useState } from 'react';
import GlassPanel from '../../components/GlassPanel';
import { collatzSequence } from '../../utils/math';

function pathFor(sequence) {
  const max = Math.max(...sequence);
  return sequence
    .map((value, index) => {
      const x = sequence.length === 1 ? 0 : (index / (sequence.length - 1)) * 300;
      const y = 110 - (Math.log(value) / Math.log(max || 1)) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x} ${Number.isFinite(y) ? y : 110}`;
    })
    .join(' ');
}

export default function CollatzWorld() {
  const [input, setInput] = useState(27);
  const sequence = useMemo(() => collatzSequence(input), [input]);
  const peak = Math.max(...sequence);
  const worstUnder = useMemo(() => {
    let best = { start: 1, length: 1 };
    for (let value = 1; value <= 120; value += 1) {
      const length = collatzSequence(value).length;
      if (length > best.length) best = { start: value, length };
    }
    return best;
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <GlassPanel className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-violet-100/55">Processing chambers</p>
          <input
            type="number"
            min="1"
            max="999999"
            value={input}
            onChange={(event) => setInput(Math.max(1, Number(event.target.value) || 1))}
            className="w-28 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 font-mono outline-none focus:border-violet-200/45"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {sequence.slice(0, 30).map((value, index) => (
            <div key={`${value}-${index}`} className="min-w-28 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-violet-100/45">{value % 2 === 0 ? 'halve' : '3n + 1'}</p>
              <p className="mt-2 font-mono text-xl text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
          <svg viewBox="0 0 300 120" className="h-40 w-full">
            <path d={pathFor(sequence)} fill="none" stroke="rgba(196,181,253,0.95)" strokeWidth="3" />
          </svg>
        </div>
      </GlassPanel>

      <div className="grid gap-4">
        <GlassPanel className="grid grid-cols-2 gap-3 p-5">
          <Metric label="stopping time" value={sequence.length - 1} />
          <Metric label="peak" value={peak} />
          <Metric label="worst under 120" value={worstUnder.start} />
          <Metric label="steps there" value={worstUnder.length - 1} />
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="text-sm leading-7 text-slate-300">
            The machine always seems to fall to 1 in tested cases, but no proof is known for every positive integer. Small instructions, enormous behavior.
          </p>
          <div className="mt-5 grid grid-cols-6 gap-2">
            {sequence.slice(0, 24).map((value, index) => (
              <span key={`${value}-${index}`} className={`h-3 rounded-full ${value % 2 === 0 ? 'bg-cyan-300/75' : 'bg-violet-300/80'}`} />
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-violet-100/45">{label}</p>
      <p className="mt-2 font-mono text-2xl text-white">{value}</p>
    </div>
  );
}
