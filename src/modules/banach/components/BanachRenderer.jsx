import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { phaseToSceneMode, fragmentTarget } from '../systems/decompositionEngine';
import { distortionFor } from '../systems/realityDistortionSystem';
import { createParticleField } from '../particles/createParticleField';

function createFragment(index, count) {
  const phiStart = (index % 5) * (Math.PI * 2 / 5);
  const thetaStart = Math.floor(index / 5) * (Math.PI / 3);
  const geometry = new THREE.SphereGeometry(1.1, 24, 16, phiStart, Math.PI * 0.55, thetaStart, Math.PI * 0.42);
  const hue = 185 + (index / count) * 130;
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(`hsl(${hue}, 88%, 62%)`),
    emissive: new THREE.Color(`hsl(${hue}, 96%, 36%)`),
    emissiveIntensity: 0.5,
    roughness: 0.18,
    metalness: 0.2,
    transparent: true,
    opacity: 0.84,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometry, material);
}

export default function BanachRenderer({
  cameraOrbit,
  fragmentDensity,
  phaseId,
  pointCloud,
  realityStability,
  replayKey,
  rotateSphere,
  slowMotion,
  topology,
}) {
  const mountRef = useRef(null);
  const propsRef = useRef({});

  useEffect(() => {
    propsRef.current = { cameraOrbit, fragmentDensity, phaseId, pointCloud, realityStability, replayKey, rotateSphere, slowMotion, topology };
  }, [cameraOrbit, fragmentDensity, phaseId, pointCloud, realityStability, replayKey, rotateSphere, slowMotion, topology]);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.075);

    const camera = new THREE.PerspectiveCamera(54, mount.clientWidth / mount.clientHeight, 0.1, 80);
    camera.position.set(0, 0.35, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x020617, 0);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 8;

    scene.add(new THREE.AmbientLight(0x7788ff, 0.8));
    const cyan = new THREE.PointLight(0x67e8f9, 18, 18);
    cyan.position.set(3, 2, 4);
    scene.add(cyan);
    const violet = new THREE.PointLight(0xc084fc, 14, 18);
    violet.position.set(-4, -1, 3);
    scene.add(violet);

    const root = new THREE.Group();
    scene.add(root);

    const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xd8b4fe, wireframe: true, transparent: true, opacity: 0.14 });
    const topologyShell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.55, 2), wireMaterial);
    root.add(topologyShell);

    const fragmentCount = window.innerWidth < 768 ? 10 : 16;
    const fragments = Array.from({ length: fragmentCount }, (_, index) => {
      const fragment = createFragment(index, fragmentCount);
      root.add(fragment);
      return fragment;
    });

    const twinGhosts = [-1, 1].map((side) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.08, 36, 24),
        new THREE.MeshStandardMaterial({
          color: side < 0 ? 0x67e8f9 : 0xc084fc,
          emissive: side < 0 ? 0x155e75 : 0x6b21a8,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0,
          roughness: 0.22,
          metalness: 0.18,
          wireframe: false,
        }),
      );
      mesh.position.x = side * 1.25;
      scene.add(mesh);
      return mesh;
    });

    const particles = createParticleField(window.innerWidth < 768 ? 700 : 1500);
    scene.add(particles);

    const grid = new THREE.GridHelper(16, 32, 0x67e8f9, 0x334155);
    grid.material.transparent = true;
    grid.material.opacity = 0.14;
    grid.position.y = -1.7;
    scene.add(grid);

    const clock = new THREE.Clock();
    let frame;
    let currentReplay = propsRef.current.replayKey;
    let transitionStart = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const props = propsRef.current;
      const mode = phaseToSceneMode(props.phaseId);
      const distortion = distortionFor({ phaseMode: mode, realityStability: props.realityStability });
      if (props.replayKey !== currentReplay) {
        currentReplay = props.replayKey;
        transitionStart = elapsed;
      }
      const transition = Math.min(1, (elapsed - transitionStart) / (props.slowMotion ? 2.6 : 1.3));
      const densityLimit = Math.max(5, Math.floor(fragmentCount * props.fragmentDensity));

      fragments.forEach((fragment, index) => {
        const target = fragmentTarget(index, mode);
        fragment.visible = index < densityLimit;
        const wobble = Math.sin(elapsed * (0.8 + index * 0.07) + index) * distortion.cameraShake;
        fragment.position.x += (target.x + wobble - fragment.position.x) * 0.045;
        fragment.position.y += (target.y + Math.cos(elapsed + index) * distortion.cameraShake - fragment.position.y) * 0.045;
        fragment.position.z += (target.z - fragment.position.z) * 0.045;
        fragment.scale.setScalar(fragment.scale.x + (target.scale - fragment.scale.x) * 0.05);
        fragment.rotation.x += 0.004 + mode * 0.002;
        fragment.rotation.y += props.rotateSphere ? 0.008 + index * 0.0003 : 0.001;
        fragment.material.opacity = mode >= 4 ? 0.18 * (1 - transition) : 0.78;
        fragment.material.emissiveIntensity = distortion.glow;
      });

      twinGhosts.forEach((mesh) => {
        const targetOpacity = mode >= 4 ? 0.68 : mode === 3 ? 0.22 : 0;
        mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.04;
        mesh.rotation.y += props.rotateSphere ? 0.005 : 0.001;
        mesh.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.014);
      });

      topologyShell.visible = props.topology;
      topologyShell.rotation.x += 0.002 + distortion.gridWarp * 0.004;
      topologyShell.rotation.y -= 0.003;
      topologyShell.scale.setScalar(1.05 + distortion.gridWarp * 0.25 + Math.sin(elapsed) * 0.02);

      particles.visible = props.pointCloud;
      particles.rotation.y += 0.0008 + distortion.particleChaos * 0.0016;
      particles.rotation.x = Math.sin(elapsed * 0.2) * 0.08;
      particles.material.opacity = props.pointCloud ? 0.22 + distortion.particleChaos * 0.16 : 0;

      grid.rotation.z = Math.sin(elapsed * 0.45) * distortion.gridWarp;
      grid.material.opacity = 0.08 + distortion.gridWarp * 0.18;

      if (props.cameraOrbit) {
        camera.position.x = Math.sin(elapsed * 0.12) * (1.3 + distortion.cameraShake);
        camera.position.z = 5.3 + Math.cos(elapsed * 0.12) * 0.35;
        camera.lookAt(0, 0, 0);
      }
      if (mode >= 4) camera.position.z += (6.6 - camera.position.z) * 0.012;

      root.rotation.y += props.rotateSphere ? 0.002 : 0.0005;
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      fragments.forEach((fragment) => {
        fragment.geometry.dispose();
        fragment.material.dispose();
      });
      particles.geometry.dispose();
      particles.material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}
