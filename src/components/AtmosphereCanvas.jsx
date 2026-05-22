import { useEffect, useRef } from 'react';

export default function AtmosphereCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    const particles = Array.from({ length: window.innerWidth < 768 ? 40 : 110 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.00018 + 0.00005,
      drift: (Math.random() - 0.5) * 0.00016,
    }));
    let frameId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX / window.innerWidth - 0.5;
      mouse.y = event.clientY / window.innerHeight - 0.5;
    };

    const draw = (time) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.045)';
      ctx.lineWidth = 1;
      const offset = (time * 0.012) % 44;
      for (let x = -44 + offset; x < width + 44; x += 44) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -44 + offset * 0.65; y < height + 44; y += 44) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      particles.forEach((particle, index) => {
        particle.y -= particle.speed;
        particle.x += particle.drift + mouse.x * 0.00022;
        if (particle.y < -0.02) particle.y = 1.02;
        if (particle.x < -0.02) particle.x = 1.02;
        if (particle.x > 1.02) particle.x = -0.02;

        const px = particle.x * width + mouse.x * (index % 5) * 5;
        const py = particle.y * height + mouse.y * (index % 7) * 4;
        ctx.fillStyle = `rgba(${index % 3 === 0 ? '103,232,249' : '226,232,240'},${0.18 + particle.radius * 0.12})`;
        ctx.beginPath();
        ctx.arc(px, py, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      frameId = requestAnimationFrame(draw);
    };

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 h-full w-full" />;
}
