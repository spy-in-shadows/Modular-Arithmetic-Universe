import { useMemo, useRef, useState } from 'react';
import GlassPanel from '../../components/GlassPanel';
import { entropyFromCounts } from '../../utils/math';

function randomPoints(count) {
  return Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random() }));
}

function analyze(points) {
  if (!points.length) return { entropy: 0, spacing: 0, clustering: 0, score: 0 };
  const bins = Array(16).fill(0);
  let nearestTotal = 0;
  points.forEach((point, index) => {
    const bx = Math.min(3, Math.floor(point.x * 4));
    const by = Math.min(3, Math.floor(point.y * 4));
    bins[by * 4 + bx] += 1;
    let nearest = Infinity;
    points.forEach((other, otherIndex) => {
      if (index === otherIndex) return;
      nearest = Math.min(nearest, Math.hypot(point.x - other.x, point.y - other.y));
    });
    nearestTotal += Number.isFinite(nearest) ? nearest : 0;
  });
  const entropy = entropyFromCounts(bins) / 4;
  const spacing = nearestTotal / points.length;
  const clustering = Math.max(0, 1 - spacing * 8);
  const score = Math.max(0, Math.min(100, entropy * 55 + clustering * 45));
  return { entropy, spacing, clustering, score };
}

export default function RandomnessWorld() {
  const fieldRef = useRef(null);
  const [humanPoints, setHumanPoints] = useState([]);
  const [rngPoints, setRngPoints] = useState(() => randomPoints(36));
  const human = useMemo(() => analyze(humanPoints), [humanPoints]);
  const rng = useMemo(() => analyze(rngPoints), [rngPoints]);

  const addPoint = (event) => {
    const rect = fieldRef.current.getBoundingClientRect();
    const point = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
    setHumanPoints((current) => [...current, point].slice(-60));
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <GlassPanel className="p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/55">Human sample field</p>
          <button type="button" onClick={() => setHumanPoints([])} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-cyan-200/35">
            Clear
          </button>
        </div>
        <button
          ref={fieldRef}
          type="button"
          onClick={addPoint}
          className="relative h-[25rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:25%_25%]" />
          {humanPoints.map((point, index) => (
            <span key={`${point.x}-${point.y}-${index}`} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-cyanGlow" style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }} />
          ))}
        </button>
      </GlassPanel>

      <div className="grid gap-4">
        <GlassPanel className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-100/55">True RNG mirror</p>
            <button type="button" onClick={() => setRngPoints(randomPoints(36))} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-fuchsia-200/35">
              Re-roll
            </button>
          </div>
          <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45">
            {rngPoints.map((point, index) => (
              <span key={index} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-200 shadow-violetGlow" style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }} />
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <Metric label="human entropy" value={`${(human.entropy * 100).toFixed(0)}%`} />
            <Metric label="rng entropy" value={`${(rng.entropy * 100).toFixed(0)}%`} />
            <Metric label="human clustering" value={`${(human.clustering * 100).toFixed(0)}%`} />
            <Metric label="rng clustering" value={`${(rng.clustering * 100).toFixed(0)}%`} />
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            Humans usually over-space points. Genuine randomness tolerates clumps, awkward gaps, and outcomes that look designed precisely because they are not.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/45">{label}</p>
      <p className="mt-2 font-mono text-xl text-white">{value}</p>
    </div>
  );
}
