import * as THREE from 'three';

export function createParticleField(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const radius = 2.4 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i * 3 + 1] = Math.cos(phi) * radius * 0.55;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    seeds[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));

  const material = new THREE.PointsMaterial({
    color: 0x8be9ff,
    size: 0.025,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}
