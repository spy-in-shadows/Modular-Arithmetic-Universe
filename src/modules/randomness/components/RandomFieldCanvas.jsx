import { useEffect, useRef } from 'react';

function drawPoints(ctx, points, width, height, color, analysis, options) {
  const { showClusters, showEntropy } = options;

  if (showEntropy) {
    const grid = 8;
    const bins = Array(grid * grid).fill(0);
    points.forEach((point) => {
      const x = Math.min(grid - 1, Math.floor(point.x * grid));
      const y = Math.min(grid - 1, Math.floor(point.y * grid));
      bins[y * grid + x] += 1;
    });
    bins.forEach((count, index) => {
      const x = index % grid;
      const y = Math.floor(index / grid);
      ctx.fillStyle = `rgba(${color},${Math.min(0.32, count * 0.04)})`;
      ctx.fillRect((x / grid) * width, (y / grid) * height, width / grid, height / grid);
    });
  }

  if (showClusters) {
    ctx.strokeStyle = `rgba(${color},0.38)`;
    ctx.lineWidth = 1;
    analysis.closePairs.forEach(([a, b]) => {
      const p1 = points.find((point) => point.id === a);
      const p2 = points.find((point) => point.id === b);
      if (!p1 || !p2) return;
      ctx.beginPath();
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
      ctx.stroke();
    });
  }

  points.forEach((point, index) => {
    const pulse = 1 + Math.sin(performance.now() * 0.005 + index) * 0.12;
    ctx.shadowBlur = 18;
    ctx.shadowColor = `rgba(${color},0.8)`;
    ctx.fillStyle = `rgba(${color},0.86)`;
    ctx.beginPath();
    ctx.arc(point.x * width, point.y * height, 4.5 * pulse, 0, Math.PI * 2);
    ctx.fill();
  });
}

export default function RandomFieldCanvas({ analysis, label, mode = 'click', onPoint, points, showClusters, showEntropy, tone = '103,232,249' }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ analysis, points, showClusters, showEntropy, tone });

  useEffect(() => {
    stateRef.current = { analysis, points, showClusters, showEntropy, tone };
  }, [analysis, points, showClusters, showEntropy, tone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const state = stateRef.current;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 6, 23, 0.72)';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      for (let x = 0; x <= width; x += width / 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += height / 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${state.tone},0.2)`;
      ctx.beginPath();
      ctx.moveTo(0, (Math.sin(time * 0.001) * 0.25 + 0.5) * height);
      ctx.lineTo(width, (Math.cos(time * 0.001) * 0.25 + 0.5) * height);
      ctx.stroke();
      drawPoints(ctx, state.points, width, height, state.tone, state.analysis, state);
      frame = requestAnimationFrame(draw);
    };
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleClick = (event) => {
    if (mode !== 'click' || !onPoint) return;
    const rect = canvasRef.current.getBoundingClientRect();
    onPoint({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
      <canvas ref={canvasRef} onClick={handleClick} className="h-full min-h-[18rem] w-full cursor-crosshair" />
      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.22em] text-cyan-100/70">
        {label}
      </div>
    </div>
  );
}
