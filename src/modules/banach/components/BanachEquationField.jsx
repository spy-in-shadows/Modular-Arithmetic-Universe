import { banachEquations } from '../data/phases';

export default function BanachEquationField({ visible, phaseIndex }) {
  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {banachEquations.map((equation, index) => (
        <span
          key={equation}
          className="absolute font-mono text-xs text-violet-100/30 md:text-sm"
          style={{
            left: `${8 + ((index * 16) % 82)}%`,
            top: `${12 + ((index * 23) % 72)}%`,
            animation: `banach-equation ${14 + index * 2}s ease-in-out infinite`,
            animationDelay: `${index * -1.7 - phaseIndex * 0.3}s`,
          }}
        >
          {equation}
        </span>
      ))}
    </div>
  );
}
