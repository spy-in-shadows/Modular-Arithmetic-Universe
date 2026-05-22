import { useEffect, useMemo, useRef, useState } from 'react';
import GlassPanel from '../../components/GlassPanel';
import { sieve } from '../../utils/math';

export default function PrimesWorld() {
  const canvasRef = useRef(null);
  const [limit, setLimit] = useState(900);
  const [zoom, setZoom] = useState(1);
  const primes = useMemo(() => sieve(limit), [limit]);
  const primeCount = primes.filter(Boolean).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    let x = 0;
    let y = 0;
    let dx = 1;
    let dy = 0;
    let segmentLength = 1;
    let segmentPassed = 0;
    let turns = 0;
    const cell = 9 * zoom;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    for (let value = 1; value <= limit; value += 1) {
      if (primes[value]) {
        ctx.fillStyle = `hsla(${185 + (value % 120)}, 95%, 68%, 0.92)`;
        ctx.shadowColor = 'rgba(103,232,249,0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(centerX + x * cell, centerY + y * cell, Math.max(1.4, 2.2 * zoom), 0, Math.PI * 2);
        ctx.fill();
      }
      x += dx;
      y += dy;
      segmentPassed += 1;
      if (segmentPassed === segmentLength) {
        [dx, dy] = [-dy, dx];
        turns += 1;
        segmentPassed = 0;
        if (turns % 2 === 0) segmentLength += 1;
      }
    }
  }, [limit, primes, zoom]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <GlassPanel className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.35em] text-yellow-100/55">Ulam spiral</p>
          <span className="font-mono text-sm text-cyan-50">π({limit}) = {primeCount}</span>
        </div>
        <canvas ref={canvasRef} className="h-[28rem] w-full rounded-2xl border border-white/10 bg-slate-950/45" />
      </GlassPanel>

      <div className="grid gap-4">
        <GlassPanel className="grid gap-4 p-5">
          <label className="grid gap-2 text-sm text-slate-300">
            <span className="flex justify-between">
              <span>prime horizon</span>
              <span className="font-mono text-yellow-100">{limit}</span>
            </span>
            <input className="range" type="range" min="120" max="2400" step="60" value={limit} onChange={(event) => setLimit(Number(event.target.value))} />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            <span className="flex justify-between">
              <span>zoom</span>
              <span className="font-mono text-yellow-100">{zoom.toFixed(2)}x</span>
            </span>
            <input className="range" type="range" min="0.5" max="1.5" step="0.05" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
          </label>
        </GlassPanel>
        <GlassPanel className="p-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-mono text-xl text-cyan-50">π(n) ≈ n / log(n)</div>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            The dots are individual primes. The diagonal lanes are emergent structure: apparent randomness quietly aligns when viewed through the spiral.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
