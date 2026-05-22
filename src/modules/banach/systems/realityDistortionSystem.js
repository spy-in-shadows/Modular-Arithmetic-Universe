export function distortionFor({ phaseMode, realityStability }) {
  const instability = 1 - realityStability;
  return {
    cameraShake: instability * (phaseMode >= 2 ? 0.22 : 0.08),
    particleChaos: instability * 1.8 + phaseMode * 0.22,
    gridWarp: instability * 0.45 + (phaseMode >= 2 ? 0.2 : 0),
    glow: 0.55 + instability * 0.9 + phaseMode * 0.08,
  };
}
