import { useEffect, useRef } from 'react';

export default function ScannerFog({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: window.innerWidth < 768 ? 50 : 130 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: Math.random() * 0.0003 + 0.00005,
      size: Math.random() * 2 + 0.5,
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
        particle.y -= particle.speed * (active ? 2 : 1);
        if (particle.y < -0.05) particle.y = 1.05;
        ctx.fillStyle = `rgba(${index % 2 ? '103,232,249' : '244,114,182'},${active ? 0.18 : 0.1})`;
        ctx.beginPath();
        ctx.arc(particle.x * width + Math.sin(time * 0.001 + index) * 18, particle.y * height, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      const y = ((time * 0.04) % (height + 160)) - 80;
      ctx.fillStyle = 'rgba(103,232,249,0.08)';
      ctx.fillRect(0, y, width, 2);
      frame = requestAnimationFrame(draw);
    };
    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}
