export function entropyFromBins(points, gridSize = 5) {
  if (!points.length) return 0;
  const bins = Array(gridSize * gridSize).fill(0);
  points.forEach((point) => {
    const x = Math.min(gridSize - 1, Math.floor(point.x * gridSize));
    const y = Math.min(gridSize - 1, Math.floor(point.y * gridSize));
    bins[y * gridSize + x] += 1;
  });

  const total = points.length;
  const entropy = bins.reduce((sum, count) => {
    if (!count) return sum;
    const p = count / total;
    return sum - p * Math.log2(p);
  }, 0);
  return entropy / Math.log2(gridSize * gridSize);
}

export function distributionImbalance(points, gridSize = 5) {
  if (!points.length) return 0;
  const bins = Array(gridSize * gridSize).fill(0);
  points.forEach((point) => {
    const x = Math.min(gridSize - 1, Math.floor(point.x * gridSize));
    const y = Math.min(gridSize - 1, Math.floor(point.y * gridSize));
    bins[y * gridSize + x] += 1;
  });
  const expected = points.length / bins.length;
  const variance = bins.reduce((sum, count) => sum + (count - expected) ** 2, 0) / bins.length;
  return Math.min(1, Math.sqrt(variance) / Math.max(1, expected));
}
