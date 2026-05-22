import { equations } from '../data/worlds';

export default function EquationField() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {equations.map((equation, index) => (
        <span
          key={equation}
          className="floating-equation absolute font-mono text-xs text-cyan-50/20 md:text-sm"
          style={{
            left: `${8 + ((index * 17) % 78)}%`,
            top: `${10 + ((index * 19) % 74)}%`,
            animationDelay: `${index * -2.4}s`,
            animationDuration: `${16 + (index % 5) * 4}s`,
          }}
        >
          {equation}
        </span>
      ))}
    </div>
  );
}
