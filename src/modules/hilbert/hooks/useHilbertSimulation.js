import { useEffect, useRef, useState } from 'react';

export default function useHilbertSimulation() {
  const [eventType, setEventType] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cameraSpeed, setCameraSpeed] = useState(0.34);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [corridorDepth, setCorridorDepth] = useState(() => (window.innerWidth < 768 ? 16 : 22));
  const [showLabels, setShowLabels] = useState(true);
  const [showMappings, setShowMappings] = useState(true);
  const [finale, setFinale] = useState(false);
  const [cameraRoom, setCameraRoom] = useState(1);
  const startedAtRef = useRef(0);
  const lastTimeRef = useRef(0);
  const eventRef = useRef('idle');

  useEffect(() => {
    eventRef.current = eventType;
  }, [eventType]);

  useEffect(() => {
    let frame;
    const animate = (time) => {
      const delta = lastTimeRef.current ? Math.min(48, time - lastTimeRef.current) : 16;
      lastTimeRef.current = time;

      if (!paused) {
        const eventMultiplier = eventRef.current === 'buses' ? 3.1 : eventRef.current === 'infinite' ? 1.9 : eventRef.current === 'one' ? 1.35 : 1;
        setCameraRoom((value) => value + (delta / 1000) * cameraSpeed * eventMultiplier);
        if (eventRef.current !== 'idle') {
          const elapsed = (time - startedAtRef.current) / (2600 / simulationSpeed);
          const nextProgress = Math.min(1, elapsed);
          setProgress(nextProgress);
          if (eventRef.current === 'buses' && nextProgress === 1) setFinale(true);
        }
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cameraSpeed, paused, simulationSpeed]);

  const triggerEvent = (nextEvent) => {
    setEventType(nextEvent);
    setProgress(0.001);
    setFinale(false);
    startedAtRef.current = performance.now();
  };

  return {
    cameraRoom,
    corridorDepth,
    eventType,
    finale,
    paused,
    progress,
    showLabels,
    showMappings,
    simulationSpeed,
    cameraSpeed,
    setCameraSpeed,
    setCorridorDepth,
    setPaused,
    setShowLabels,
    setShowMappings,
    setSimulationSpeed,
    triggerEvent,
  };
}
