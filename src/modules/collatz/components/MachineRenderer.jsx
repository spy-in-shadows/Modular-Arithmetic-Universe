import { useEffect, useRef } from 'react';
import { buildReverseTree } from '../systems/treeVisualizer';

function normLog(value, peak) {
  return Math.log(value || 1) / Math.log(peak || 2);
}

export default function MachineRenderer({ chaosMode, heatmap, machineStability, memory, sequence, showHeatmap, showPath, showTree, stats, stepIndex, visibleSequence }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    stateRef.current = { chaosMode, heatmap, machineStability, memory, sequence, showHeatmap, showPath, showTree, stats, stepIndex, visibleSequence };
  }, [chaosMode, heatmap, machineStability, memory, sequence, showHeatmap, showPath, showTree, stats, stepIndex, visibleSequence]);

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

    const drawGear = (x, y, radius, teeth, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < teeth * 2; i += 1) {
        const angle = (i / (teeth * 2)) * Math.PI * 2;
        const r = i % 2 ? radius * 0.82 : radius;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const draw = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const state = stateRef.current;
      const instability = 1 - state.machineStability;
      const current = state.visibleSequence.at(-1) || 1;
      const odd = current % 2 === 1;
      const energy = Math.min(1, state.stats.energy / 100);
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(width / 2, height * 0.52, 0, width / 2, height * 0.52, Math.max(width, height) * 0.68);
      bg.addColorStop(0, `rgba(${odd ? '124,45,18' : '8,47,73'},${0.26 + energy * 0.24})`);
      bg.addColorStop(0.55, 'rgba(15,23,42,0.45)');
      bg.addColorStop(1, 'rgba(2,6,23,0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 8; i += 1) {
        const y = height * (0.18 + i * 0.095);
        ctx.strokeStyle = `rgba(148,163,184,${0.045 + energy * 0.02})`;
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(time * 0.001 + i) * 5 * instability);
        ctx.bezierCurveTo(width * 0.3, y - 18, width * 0.7, y + 18, width, y);
        ctx.stroke();
      }

      drawGear(width * 0.2, height * 0.28, 48, 14, time * 0.0015, 'rgba(103,232,249,0.36)');
      drawGear(width * 0.8, height * 0.3, 58, 16, -time * 0.0011, 'rgba(251,146,60,0.34)');
      drawGear(width * 0.5, height * 0.72, 70, 18, time * 0.0008, 'rgba(196,181,253,0.28)');

      ctx.strokeStyle = 'rgba(103,232,249,0.22)';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(width * 0.18, height * 0.42);
      ctx.lineTo(width * 0.5, height * 0.52);
      ctx.lineTo(width * 0.82, height * 0.42);
      ctx.stroke();

      ctx.fillStyle = odd ? 'rgba(251,146,60,0.22)' : 'rgba(34,211,238,0.2)';
      ctx.strokeStyle = odd ? 'rgba(251,146,60,0.68)' : 'rgba(103,232,249,0.7)';
      ctx.lineWidth = 2;
      [
        [width * 0.18, height * 0.42, '÷2'],
        [width * 0.5, height * 0.52, String(current)],
        [width * 0.82, height * 0.42, '3n+1'],
      ].forEach(([x, y, label]) => {
        ctx.beginPath();
        ctx.roundRect(x - 70, y - 38, 140, 76, 18);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = '18px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 6);
        ctx.fillStyle = odd ? 'rgba(251,146,60,0.22)' : 'rgba(34,211,238,0.2)';
      });

      const peak = Math.max(...state.sequence, 2);
      if (state.showPath) {
        [...state.memory, state.visibleSequence].forEach((path, pathIndex) => {
          ctx.strokeStyle = pathIndex === state.memory.length ? 'rgba(250,204,21,0.9)' : 'rgba(148,163,184,0.12)';
          ctx.lineWidth = pathIndex === state.memory.length ? 2.5 : 1;
          ctx.beginPath();
          path.forEach((value, index) => {
            const x = width * 0.12 + (index / Math.max(1, path.length - 1)) * width * 0.76;
            const y = height * 0.86 - normLog(value, peak) * height * 0.36;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.stroke();
        });
      }

      if (state.showHeatmap) {
        const cols = 30;
        state.heatmap.forEach((cell, index) => {
          const x = (index % cols) * (width / cols);
          const y = height * 0.06 + Math.floor(index / cols) * 8;
          ctx.fillStyle = `rgba(251,146,60,${Math.min(0.72, cell.steps / 120)})`;
          ctx.fillRect(x, y, width / cols - 1, 5);
        });
      }

      if (state.showTree) {
        const nodes = buildReverseTree(6);
        ctx.strokeStyle = 'rgba(196,181,253,0.2)';
        nodes.forEach((node) => {
          if (!node.parent) return;
          const parent = nodes.find((item) => item.value === node.parent);
          if (!parent) return;
          ctx.beginPath();
          ctx.moveTo(parent.x * width, parent.y * height);
          ctx.lineTo(node.x * width, node.y * height);
          ctx.stroke();
        });
        nodes.forEach((node) => {
          ctx.fillStyle = 'rgba(196,181,253,0.72)';
          ctx.beginPath();
          ctx.arc(node.x * width, node.y * height, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(250,204,21,0.85)';
      ctx.fillStyle = 'rgba(250,204,21,0.95)';
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.52, 8 + Math.sin(time * 0.004) * 2, 0, Math.PI * 2);
      ctx.fill();

      if (state.chaosMode) {
        ctx.fillStyle = `rgba(251,146,60,${0.04 + instability * 0.08})`;
        ctx.fillRect(0, 0, width, height);
      }

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

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
