import { useEffect, useRef } from 'react';

export default function StageParticles({ intensity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const count = window.innerWidth < 768 ? 48 : 120;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.00012 + Math.random() * 0.00035,
      size: 0.6 + Math.random() * 2.4,
      hue: Math.random() > 0.5 ? 310 : 190,
    }));
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
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        particle.y -= particle.speed * intensity;
        if (particle.y < -0.05) particle.y = 1.05;
        const sway = Math.sin(time * 0.001 + index) * 12;
        ctx.fillStyle = `hsla(${particle.hue}, 95%, 70%, ${0.12 + intensity * 0.08})`;
        ctx.beginPath();
        ctx.arc(particle.x * width + sway, particle.y * height, particle.size, 0, Math.PI * 2);
        ctx.fill();
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
  }, [intensity]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
