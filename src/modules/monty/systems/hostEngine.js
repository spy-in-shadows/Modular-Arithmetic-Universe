import { hostLines } from '../data/copy';

export function hostLineFor(round, stage, stats) {
  const total = stats.stayTotal + stats.switchTotal;
  if (total > 1000) return hostLines.convergence;
  if (stage === 'choose') return hostLines.choose;
  if (stage === 'reveal') return hostLines.reveal;
  if (stage === 'decide') return hostLines.decide;
  if (round.strategy === 'stay' && round.outcome === 'lose') return hostLines.stayLose;
  if (round.strategy === 'stay' && round.outcome === 'win') return hostLines.stayWin;
  if (round.strategy === 'switch' && round.outcome === 'lose') return hostLines.switchLose;
  if (round.strategy === 'switch' && round.outcome === 'win') return hostLines.switchWin;
  return hostLines.choose;
}
