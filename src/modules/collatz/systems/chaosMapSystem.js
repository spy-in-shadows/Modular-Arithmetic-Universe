import { buildSequence, sequenceStats } from './sequenceEngine';

export function worstNumbersUnder(limit) {
  const results = [];
  for (let start = 2; start <= limit; start += 1) {
    const sequence = buildSequence(start, 800);
    const stats = sequenceStats(sequence);
    results.push({ start, stoppingTime: stats.stoppingTime, peak: stats.peak });
  }
  return results.sort((a, b) => b.stoppingTime - a.stoppingTime).slice(0, 10);
}

export function heatmapValues(limit = 160) {
  return Array.from({ length: limit }, (_, index) => {
    const start = index + 1;
    const sequence = buildSequence(start, 600);
    return { start, steps: sequence.length - 1, peak: Math.max(...sequence) };
  });
}
