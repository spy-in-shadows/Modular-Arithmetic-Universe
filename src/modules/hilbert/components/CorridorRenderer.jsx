import { useEffect, useRef } from 'react';
import { buildVisibleRooms } from '../systems/roomManager';
import { mapRoom } from '../systems/infinityMapper';

function interpolate(from, to, amount) {
  return from + (to - from) * amount;
}

function roomPoint(index, side, width, height, mouse, depthCount, stretch) {
  const depth = index / depthCount;
  const eased = depth ** 1.58;
  const scale = interpolate(1.08, 0.08, eased);
  const horizonY = height * 0.36 + mouse.y * 14;
  const floorY = interpolate(height * 0.9, horizonY, eased);
  const centerX = width / 2 + mouse.x * 24;
  const spread = interpolate(width * 0.43, width * 0.035, eased) * stretch;
  return { x: centerX + spread * side, y: floorY, scale, fog: eased };
}

export default function CorridorRenderer({
  cameraRoom,
  corridorDepth,
  eventType,
  finale,
  paused,
  progress,
  showLabels,
  showMappings,
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const propsRef = useRef({});

  useEffect(() => {
    propsRef.current = {
      cameraRoom,
      corridorDepth,
      eventType,
      finale,
      paused,
      progress,
      showLabels,
      showMappings,
    };
  }, [cameraRoom, corridorDepth, eventType, finale, paused, progress, showLabels, showMappings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const {
        cameraRoom: currentCameraRoom,
        corridorDepth: currentCorridorDepth,
        eventType: currentEventType,
        finale: currentFinale,
        paused: currentPaused,
        progress: currentProgress,
        showLabels: currentShowLabels,
        showMappings: currentShowMappings,
      } = propsRef.current;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const pulse = currentEventType === 'idle' ? 0 : Math.sin(currentProgress * Math.PI);
      const stretch = 1 + pulse * (currentEventType === 'buses' ? 0.32 : 0.14) + (currentFinale ? 0.28 : 0);
      const rooms = buildVisibleRooms({
        cameraRoom: currentCameraRoom,
        visibleRooms: currentCorridorDepth,
        eventType: currentEventType,
        progress: currentProgress,
      });
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);
      const background = ctx.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, '#020617');
      background.addColorStop(0.45, '#071426');
      background.addColorStop(1, '#020617');
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const fog = ctx.createRadialGradient(width / 2, height * 0.37, 0, width / 2, height * 0.37, width * 0.54);
      fog.addColorStop(0, `rgba(103,232,249,${0.22 + pulse * 0.12})`);
      fog.addColorStop(0.22, 'rgba(15,23,42,0.08)');
      fog.addColorStop(1, 'rgba(2,6,23,0.96)');
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = `rgba(148,163,184,${0.12 + pulse * 0.08})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, height);
      ctx.lineTo(width / 2 + mouse.x * 24, height * 0.36 + mouse.y * 14);
      ctx.lineTo(width * 0.92, height);
      ctx.stroke();

      for (let index = 0; index < currentCorridorDepth; index += 2) {
        const left = roomPoint(index, -1, width, height, mouse, currentCorridorDepth, stretch);
        const right = roomPoint(index, 1, width, height, mouse, currentCorridorDepth, stretch);
        ctx.strokeStyle = `rgba(125,211,252,${0.11 * (1 - index / currentCorridorDepth)})`;
        ctx.beginPath();
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.stroke();
      }

      for (let index = currentCorridorDepth - 1; index >= 0; index -= 1) {
        const room = rooms[index];
        [-1, 1].forEach((side) => {
          const point = roomPoint(index, side, width, height, mouse, currentCorridorDepth, stretch);
          const doorWidth = 104 * point.scale;
          const doorHeight = 168 * point.scale;
          const x = point.x - doorWidth / 2;
          const y = point.y - doorHeight;
          const occupiedAlpha = room.occupied ? 0.9 : 0.25;
          const warm = currentEventType === 'infinite' ? '103,232,249' : '250,204,21';

          ctx.save();
          ctx.globalAlpha = Math.max(0.08, 1 - point.fog * 1.02);
          ctx.fillStyle = 'rgba(15,23,42,0.82)';
          ctx.strokeStyle = `rgba(${warm},${0.28 + occupiedAlpha * 0.42})`;
          ctx.lineWidth = Math.max(0.6, 1.8 * point.scale);
          ctx.shadowBlur = room.occupied ? 34 * point.scale + pulse * 24 : 4;
          ctx.shadowColor = `rgba(${warm},${occupiedAlpha})`;
          ctx.beginPath();
          ctx.roundRect(x, y, doorWidth, doorHeight, 12 * point.scale);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = room.occupied ? `rgba(${warm},${occupiedAlpha + 0.12})` : 'rgba(96,165,250,0.18)';
          ctx.beginPath();
          ctx.arc(point.x, y + doorHeight * 0.68, Math.max(1.5, 5 * point.scale), 0, Math.PI * 2);
          ctx.fill();

          if (currentShowLabels && point.scale > 0.22) {
            ctx.fillStyle = `rgba(226,232,240,${0.8 - point.fog * 0.55})`;
            ctx.font = `${Math.max(8, 13 * point.scale)}px JetBrains Mono`;
            ctx.textAlign = 'center';
            ctx.fillText(String(room.id), point.x, y + doorHeight * 0.2);
          }
          ctx.restore();
        });
      }

      if (currentShowMappings && currentEventType !== 'idle') {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        rooms.slice(0, Math.min(10, rooms.length)).forEach((room, index) => {
          const source = roomPoint(index, index % 2 === 0 ? -1 : 1, width, height, mouse, currentCorridorDepth, stretch);
          const targetIndex = Math.min(currentCorridorDepth - 1, Math.abs(mapRoom(room.id, currentEventType) - Math.floor(currentCameraRoom)));
          const target = roomPoint(targetIndex, index % 2 === 0 ? -1 : 1, width, height, mouse, currentCorridorDepth, stretch);
          const amount = Math.min(1, currentProgress * 1.18);
          const guestX = interpolate(source.x, target.x, amount);
          const guestY = interpolate(source.y - 28 * source.scale, target.y - 28 * target.scale, amount);
          ctx.strokeStyle = `rgba(196,181,253,${0.12 + (1 - index / 10) * 0.32})`;
          ctx.lineWidth = Math.max(0.7, source.scale * 2);
          ctx.beginPath();
          ctx.moveTo(source.x, source.y - 32 * source.scale);
          ctx.lineTo(target.x, target.y - 32 * target.scale);
          ctx.stroke();
          ctx.fillStyle = currentEventType === 'buses' ? 'rgba(250,204,21,0.9)' : 'rgba(103,232,249,0.9)';
          ctx.shadowBlur = 18;
          ctx.shadowColor = ctx.fillStyle;
          ctx.beginPath();
          ctx.arc(guestX, guestY, Math.max(2, 5 * source.scale), 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      if (currentEventType === 'buses') {
        ctx.save();
        for (let stream = 0; stream < 6; stream += 1) {
          const phase = ((time * 0.00032 + stream / 6) % 1);
          const point = roomPoint(Math.floor(phase * currentCorridorDepth), stream % 2 === 0 ? -1 : 1, width, height, mouse, currentCorridorDepth, stretch);
          ctx.fillStyle = `rgba(250,204,21,${0.18 + (1 - phase) * 0.6})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y - 12 * point.scale, Math.max(2, 7 * point.scale), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (currentFinale) {
        ctx.save();
        ctx.fillStyle = `rgba(2,6,23,${0.12 + Math.sin(time * 0.001) * 0.04})`;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      frame = requestAnimationFrame(draw);
      last = time;
    };

    const handleMouse = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handleMouse);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
