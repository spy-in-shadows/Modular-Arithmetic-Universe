export function phaseToSceneMode(phaseId) {
  if (phaseId === 'one' || phaseId === 'warning') return 0;
  if (phaseId === 'decompose') return 1;
  if (phaseId === 'chaos' || phaseId === 'choice') return 2;
  if (phaseId === 'rebuild') return 3;
  if (phaseId === 'twins' || phaseId === 'finale') return 4;
  return 0;
}

export function fragmentTarget(index, mode) {
  const side = index % 2 === 0 ? -1 : 1;
  const ring = Math.floor(index / 2) + 1;
  if (mode <= 0) return { x: 0, y: 0, z: 0, scale: 1 };
  if (mode === 1) return { x: side * 0.8, y: Math.sin(index) * 0.45, z: Math.cos(index) * 0.5, scale: 0.92 };
  if (mode === 2) return { x: side * (1.2 + ring * 0.2), y: Math.sin(index * 1.7) * 1.1, z: Math.cos(index * 1.3) * 1.2, scale: 0.78 };
  if (mode === 3) return { x: side * 1.35, y: Math.sin(index) * 0.22, z: Math.cos(index) * 0.2, scale: 0.95 };
  return { x: side * 1.25, y: 0, z: 0, scale: 1 };
}
