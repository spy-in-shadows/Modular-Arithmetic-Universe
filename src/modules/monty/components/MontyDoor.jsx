import { motion } from 'framer-motion';
import { doorLabel } from '../systems/doorSystem';

export default function MontyDoor({ door, round, stage, onChoose }) {
  const selected = round.choice === door;
  const revealed = round.revealed === door;
  const final = round.finalChoice === door;
  const label = doorLabel(round, door);
  const open = revealed || round.finalChoice !== null;
  const winning = round.finalChoice !== null && door === round.car;

  return (
    <motion.button
      type="button"
      disabled={stage !== 'choose'}
      onClick={() => onChoose(door)}
      className={`monty-door group ${selected ? 'is-selected' : ''} ${revealed ? 'is-revealed' : ''} ${final ? 'is-final' : ''} ${winning ? 'is-winning' : ''}`}
      whileHover={stage === 'choose' ? { y: -8, scale: 1.02 } : {}}
      animate={stage === 'reveal' && !selected ? { x: [0, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.28, repeat: stage === 'reveal' && !selected ? 3 : 0 }}
    >
      <span className="absolute left-1/2 top-5 -translate-x-1/2 font-mono text-lg text-cyan-50/80">DOOR {door + 1}</span>
      <span className={`monty-door-face ${open ? 'is-open' : ''}`} />
      <span className="absolute inset-x-0 bottom-10 text-center text-4xl md:text-5xl">
        {open ? (label === 'CAR' ? '◆' : '♑') : '?'}
      </span>
      {selected && !open ? <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.28em] text-fuchsia-100">my door</span> : null}
    </motion.button>
  );
}
