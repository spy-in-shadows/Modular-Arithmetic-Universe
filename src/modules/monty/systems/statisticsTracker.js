export const initialStats = {
  stayWins: 0,
  stayTotal: 0,
  switchWins: 0,
  switchTotal: 0,
  history: [],
};

export function addOutcome(stats, strategy, won) {
  const next = { ...stats, history: [...stats.history, { strategy, won }].slice(-120) };
  if (strategy === 'stay') {
    next.stayWins += Number(won);
    next.stayTotal += 1;
  } else {
    next.switchWins += Number(won);
    next.switchTotal += 1;
  }
  return next;
}

export function runBatch(count) {
  let stayWins = 0;
  let switchWins = 0;
  for (let index = 0; index < count; index += 1) {
    const car = Math.floor(Math.random() * 3);
    const choice = Math.floor(Math.random() * 3);
    stayWins += Number(choice === car);
    switchWins += Number(choice !== car);
  }
  return { stayWins, switchWins };
}

export function addBatch(stats, count) {
  const batch = runBatch(count);
  return {
    stayWins: stats.stayWins + batch.stayWins,
    stayTotal: stats.stayTotal + count,
    switchWins: stats.switchWins + batch.switchWins,
    switchTotal: stats.switchTotal + count,
    history: [
      ...stats.history,
      ...Array.from({ length: Math.min(80, count) }, (_, index) => ({
        strategy: index % 2 ? 'switch' : 'stay',
        won: index % 2 ? index < Math.min(80, count) * 0.67 : index < Math.min(80, count) * 0.33,
      })),
    ].slice(-120),
  };
}

export function rate(wins, total) {
  return total ? (wins / total) * 100 : 0;
}
