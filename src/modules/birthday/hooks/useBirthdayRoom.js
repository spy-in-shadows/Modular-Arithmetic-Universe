import { useEffect, useMemo, useState } from 'react';
import { birthdayProbability } from '../../../utils/math';
import { createPerson, seedPeople } from '../systems/crowdSystem';
import { detectCollisions, pairCount } from '../systems/collisionDetector';
import { runSimulations } from '../systems/simulationEngine';

export default function useBirthdayRoom() {
  const [prediction, setPrediction] = useState(100);
  const [confidence, setConfidence] = useState(72);
  const [committed, setCommitted] = useState(false);
  const [people, setPeople] = useState([]);
  const [autoPopulate, setAutoPopulate] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [showPairs, setShowPairs] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCurve, setShowCurve] = useState(false);
  const [comparePrediction, setComparePrediction] = useState(true);
  const [stats, setStats] = useState({ runs: 0, collisions: 0 });
  const [firstCollisionAt, setFirstCollisionAt] = useState(null);
  const [simulationLoop, setSimulationLoop] = useState(false);

  const collisions = useMemo(() => detectCollisions(people), [people]);
  const probability = birthdayProbability(people.length);
  const pairs = pairCount(people.length);

  useEffect(() => {
    if (!firstCollisionAt && collisions.clusters.length) {
      setFirstCollisionAt(people.length);
      setAutoPopulate(false);
      setShowPairs(true);
      setShowCurve(true);
    }
  }, [collisions.clusters.length, firstCollisionAt, people.length]);

  useEffect(() => {
    if (!autoPopulate || !committed) return undefined;
    const timer = setInterval(() => {
      setPeople((current) => {
        if (current.length >= 60) return current;
        return [...current, createPerson(current.length + 1, window.innerWidth, window.innerHeight)];
      });
    }, 850 / simulationSpeed);
    return () => clearInterval(timer);
  }, [autoPopulate, committed, simulationSpeed]);

  const addPerson = () => {
    setPeople((current) => [...current, createPerson(current.length + 1, window.innerWidth, window.innerHeight)]);
  };

  const resetRoom = () => {
    setPeople([]);
    setFirstCollisionAt(null);
    setAutoPopulate(false);
  };

  const commitPrediction = () => {
    setCommitted(true);
    setPeople(seedPeople(1, window.innerWidth, window.innerHeight));
    setAutoPopulate(true);
  };

  const autoSimulate = (count) => {
    const result = runSimulations(count, Math.max(2, people.length || 23));
    setStats((current) => ({
      runs: current.runs + result.runs,
      collisions: current.collisions + result.collisions,
    }));
    setShowHeatmap(true);
    setShowCurve(true);
  };

  useEffect(() => {
    if (!simulationLoop) return undefined;
    const timer = setInterval(() => autoSimulate(100), 650 / simulationSpeed);
    return () => clearInterval(timer);
  }, [simulationLoop, simulationSpeed, people.length]);

  return {
    autoPopulate,
    collisions,
    committed,
    comparePrediction,
    confidence,
    firstCollisionAt,
    pairs,
    people,
    prediction,
    probability,
    showCalendar,
    showCurve,
    showHeatmap,
    showPairs,
    simulationSpeed,
    simulationLoop,
    stats,
    addPerson,
    autoSimulate,
    commitPrediction,
    resetRoom,
    setAutoPopulate,
    setComparePrediction,
    setConfidence,
    setPrediction,
    setSimulationLoop,
    setShowCalendar,
    setShowCurve,
    setShowHeatmap,
    setShowPairs,
    setSimulationSpeed,
  };
}
