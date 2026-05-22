export function longestStreak(sequence) {
  if (!sequence) return 0;
  let best = 1;
  let current = 1;
  for (let i = 1; i < sequence.length; i += 1) {
    if (sequence[i] === sequence[i - 1]) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }
  return best;
}

export function alternationRate(sequence) {
  if (sequence.length < 2) return 0;
  let alternations = 0;
  for (let i = 1; i < sequence.length; i += 1) {
    alternations += Number(sequence[i] !== sequence[i - 1]);
  }
  return alternations / (sequence.length - 1);
}
