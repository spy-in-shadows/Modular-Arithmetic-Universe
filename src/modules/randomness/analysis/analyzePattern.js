import { nearestNeighborStats, spacingAuthenticity } from './clusterDetector.js';
import { distributionImbalance, entropyFromBins } from './entropyAnalyzer.js';

export function analyzePattern(points) {
  const entropy = entropyFromBins(points);
  const imbalance = distributionImbalance(points);
  const nearest = nearestNeighborStats(points);
  const authenticity = spacingAuthenticity(points);
  const bias = Math.max(0, Math.min(1, (0.18 - nearest.average) * -3 + (0.08 - nearest.variance) * 2));
  const score = Math.round(Math.max(0, Math.min(100, entropy * 36 + authenticity * 44 + nearest.clusterIndex * 20)));

  return {
    authenticity,
    bias,
    clusterIndex: nearest.clusterIndex,
    closePairs: nearest.closePairs,
    entropy,
    imbalance,
    nearestAverage: nearest.average,
    score,
    spacingVariance: nearest.variance,
  };
}
