export function nearestNeighborStats(points) {
  if (points.length < 2) return { average: 0, variance: 0, closePairs: [], clusterIndex: 0 };
  const distances = [];
  const closePairs = [];

  points.forEach((point, index) => {
    let nearest = Infinity;
    points.forEach((other, otherIndex) => {
      if (index === otherIndex) return;
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      if (distance < nearest) nearest = distance;
      if (otherIndex > index && distance < 0.105) closePairs.push([point.id, other.id]);
    });
    distances.push(nearest);
  });

  const average = distances.reduce((sum, value) => sum + value, 0) / distances.length;
  const variance = distances.reduce((sum, value) => sum + (value - average) ** 2, 0) / distances.length;
  const clusterIndex = Math.min(1, closePairs.length / Math.max(1, points.length * 0.55));
  return { average, variance, closePairs, clusterIndex };
}

export function spacingAuthenticity(points) {
  const stats = nearestNeighborStats(points);
  if (!points.length) return 0;
  const target = 0.065;
  return Math.max(0, Math.min(1, 1 - Math.abs(stats.average - target) * 7 + stats.clusterIndex * 0.25));
}
