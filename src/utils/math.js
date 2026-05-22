export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function birthdayProbability(people) {
  let uniqueProbability = 1;
  for (let i = 0; i < people; i += 1) {
    uniqueProbability *= (365 - i) / 365;
  }
  return 1 - uniqueProbability;
}

export function collatzSequence(start) {
  const sequence = [Math.max(1, Math.floor(start))];
  while (sequence.at(-1) !== 1 && sequence.length < 1000) {
    const current = sequence.at(-1);
    sequence.push(current % 2 === 0 ? current / 2 : current * 3 + 1);
  }
  return sequence;
}

export function sieve(limit) {
  const values = Array(limit + 1).fill(true);
  values[0] = false;
  values[1] = false;
  for (let i = 2; i * i <= limit; i += 1) {
    if (!values[i]) continue;
    for (let multiple = i * i; multiple <= limit; multiple += i) {
      values[multiple] = false;
    }
  }
  return values;
}

export function entropyFromCounts(counts) {
  const total = counts.reduce((sum, value) => sum + value, 0);
  if (!total) return 0;
  return counts.reduce((entropy, count) => {
    if (!count) return entropy;
    const p = count / total;
    return entropy - p * Math.log2(p);
  }, 0);
}
