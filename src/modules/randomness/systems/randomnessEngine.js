export function generateRandomPoints(count) {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    x: Math.random(),
    y: Math.random(),
  }));
}

export function generatePseudoHumanPoints(count) {
  const points = [];
  let attempts = 0;
  while (points.length < count && attempts < count * 120) {
    attempts += 1;
    const candidate = { id: points.length + 1, x: Math.random(), y: Math.random() };
    const nearest = points.reduce((best, point) => Math.min(best, Math.hypot(candidate.x - point.x, candidate.y - point.y)), Infinity);
    if (nearest > 0.09 || attempts > count * 80) points.push(candidate);
  }
  return points;
}

export function generateCoinFlips(length) {
  return Array.from({ length }, () => (Math.random() > 0.5 ? 'H' : 'T')).join('');
}
