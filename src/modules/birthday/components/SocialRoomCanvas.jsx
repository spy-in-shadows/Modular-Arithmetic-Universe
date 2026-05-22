import { useEffect, useRef } from 'react';
import { birthdayLabel } from '../systems/birthdayAssignmentEngine';

export default function SocialRoomCanvas({ collisions, people, showCalendar, showHeatmap, showPairs }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ collisions, people, showCalendar, showHeatmap, showPairs });

  useEffect(() => {
    stateRef.current = { collisions, people, showCalendar, showHeatmap, showPairs };
  }, [collisions, people, showCalendar, showHeatmap, showPairs]);

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
      const { collisions: currentCollisions, people: currentPeople, showCalendar: currentCalendar, showHeatmap: currentHeatmap, showPairs: currentPairs } = stateRef.current;
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createRadialGradient(width / 2, height * 0.53, 0, width / 2, height * 0.53, Math.max(width, height) * 0.58);
      bg.addColorStop(0, 'rgba(30, 41, 59, 0.38)');
      bg.addColorStop(0.48, 'rgba(8, 47, 73, 0.18)');
      bg.addColorStop(1, 'rgba(2, 6, 23, 0.96)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(250, 204, 21, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(width / 2, height * 0.55, width * 0.35, height * 0.26, 0, 0, Math.PI * 2);
      ctx.stroke();

      if (currentCalendar) {
        for (let day = 0; day < 365; day += 1) {
          const angle = (day / 365) * Math.PI * 2;
          const x = width / 2 + Math.cos(angle) * width * 0.43;
          const y = height * 0.55 + Math.sin(angle) * height * 0.32;
          ctx.fillStyle = `hsla(${(day / 365) * 320 + 25}, 85%, 62%, 0.16)`;
          ctx.fillRect(x, y, 1.3, 1.3);
        }
      }

      if (currentPairs) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.05)';
        currentPeople.slice(0, 50).forEach((a, index) => {
          currentPeople.slice(index + 1, 50).forEach((b) => {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          });
        });
      }

      currentCollisions.clusters.forEach((cluster) => {
        const hue = cluster[0].hue;
        ctx.strokeStyle = `hsla(${hue}, 100%, 72%, 0.82)`;
        ctx.lineWidth = 2;
        cluster.forEach((a, index) => {
          cluster.slice(index + 1).forEach((b) => {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          });
        });
      });

      if (currentHeatmap) {
        const counts = new Map();
        currentPeople.forEach((person) => counts.set(person.birthday, (counts.get(person.birthday) || 0) + 1));
        counts.forEach((count, day) => {
          const angle = (day / 365) * Math.PI * 2;
          const x = width / 2 + Math.cos(angle) * width * 0.43;
          const y = height * 0.55 + Math.sin(angle) * height * 0.32;
          ctx.fillStyle = `rgba(250, 204, 21, ${Math.min(0.75, count * 0.16)})`;
          ctx.beginPath();
          ctx.arc(x, y, 2 + count * 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      currentPeople.forEach((person) => {
        person.x += Math.sin(time * 0.001 + person.id) * 0.05 + person.vx;
        person.y += Math.cos(time * 0.0012 + person.id) * 0.04 + person.vy;
        const dx = person.x - width / 2;
        const dy = person.y - height * 0.55;
        if ((dx * dx) / (width * width * 0.13) + (dy * dy) / (height * height * 0.07) > 1) {
          person.vx *= -0.8;
          person.vy *= -0.8;
        }
        const colliding = currentCollisions.collidingIds.has(person.id);
        const pulse = 1 + Math.sin(time * 0.006 + person.id) * (colliding ? 0.34 : 0.08);
        ctx.shadowBlur = colliding ? 28 : 12;
        ctx.shadowColor = `hsla(${person.hue}, 95%, 70%, 0.9)`;
        ctx.fillStyle = `hsla(${person.hue}, 88%, ${colliding ? 66 : 58}%, ${colliding ? 0.98 : 0.72})`;
        ctx.beginPath();
        ctx.arc(person.x, person.y, (colliding ? 8 : 5.5) * pulse, 0, Math.PI * 2);
        ctx.fill();
        if (colliding) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255,255,255,0.78)';
          ctx.font = '11px JetBrains Mono';
          ctx.textAlign = 'center';
          ctx.fillText(birthdayLabel(person.birthday), person.x, person.y - 16);
        }
      });

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
