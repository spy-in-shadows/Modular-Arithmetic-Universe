export function createRound(choice = null) {
  const car = Math.floor(Math.random() * 3);
  if (choice === null) return { car, choice: null, revealed: null, finalChoice: null, strategy: null, outcome: null };
  const revealable = [0, 1, 2].filter((door) => door !== choice && door !== car);
  return {
    car,
    choice,
    revealed: revealable[Math.floor(Math.random() * revealable.length)],
    finalChoice: null,
    strategy: null,
    outcome: null,
  };
}

export function resolveRound(round, strategy) {
  const finalChoice = strategy === 'stay' ? round.choice : [0, 1, 2].find((door) => door !== round.choice && door !== round.revealed);
  const won = finalChoice === round.car;
  return { ...round, finalChoice, strategy, outcome: won ? 'win' : 'lose' };
}

export function doorLabel(round, door) {
  if (round.finalChoice !== null) return door === round.car ? 'CAR' : 'GOAT';
  if (round.revealed === door) return 'GOAT';
  return '?';
}
