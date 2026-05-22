export function nextCollatz(value) {
  return value % 2 === 0 ? value / 2 : value * 3 + 1;
}

export function buildSequence(start, limit = 1000) {
  const sequence = [Math.max(1, Math.floor(start))];
  while (sequence.at(-1) !== 1 && sequence.length < limit) {
    sequence.push(nextCollatz(sequence.at(-1)));
  }
  return sequence;
}

export function sequenceStats(sequence) {
  return {
    current: sequence.at(-1) || 1,
    peak: Math.max(...sequence),
    stoppingTime: Math.max(0, sequence.length - 1),
    length: sequence.length,
    energy: Math.min(100, Math.log10(Math.max(...sequence) || 1) * 22 + sequence.length * 0.4),
  };
}
