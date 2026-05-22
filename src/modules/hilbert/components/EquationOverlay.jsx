import { hotelEvents } from '../data/events';

export default function EquationOverlay({ eventType, finale }) {
  const event = hotelEvents[eventType];
  const formulas = finale
    ? ['ℵ₀', 'n -> n + 1', 'n -> 2n', '|N| = |2N|', 'room = 2^bus x (2seat - 1)']
    : [event.equation, event.revelation, 'countable infinity'];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {formulas.map((formula, index) => (
        <span
          key={`${formula}-${index}`}
          className="absolute font-mono text-sm text-cyan-50/25 md:text-base"
          style={{
            left: `${16 + index * 14}%`,
            top: `${18 + ((index * 19) % 58)}%`,
            animation: `hilbert-float ${9 + index * 2}s ease-in-out infinite`,
            animationDelay: `${index * -1.8}s`,
          }}
        >
          {formula}
        </span>
      ))}
    </div>
  );
}
