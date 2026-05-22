import { useEffect, useState } from 'react';
import { createRound, resolveRound } from '../systems/doorSystem';
import { addBatch, addOutcome, initialStats } from '../systems/statisticsTracker';

export default function useMontyGame() {
  const [round, setRound] = useState(() => createRound());
  const [stage, setStage] = useState('intro');
  const [stats, setStats] = useState(initialStats);
  const [showProbability, setShowProbability] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [hostCommentary, setHostCommentary] = useState(true);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [entryIndex, setEntryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEntryIndex((value) => {
        if (value >= 3) {
          clearInterval(timer);
          setStage('choose');
          return value;
        }
        return value + 1;
      });
    }, 950);
    return () => clearInterval(timer);
  }, []);

  const chooseDoor = (door) => {
    if (stage !== 'choose') return;
    setRound(createRound(door));
    setStage('reveal');
    setTimeout(() => setStage('decide'), 1200);
  };

  const decide = (strategy) => {
    if (stage !== 'decide') return;
    setRound((current) => {
      const resolved = resolveRound(current, strategy);
      setStats((statsCurrent) => addOutcome(statsCurrent, strategy, resolved.outcome === 'win'));
      return resolved;
    });
    setShowStats(true);
    setStage('result');
  };

  const replay = () => {
    setRound(createRound());
    setStage('choose');
  };

  const autoSimulate = (count) => {
    setStats((current) => addBatch(current, count));
    setShowStats(true);
    if (count >= 1000) setShowProbability(true);
  };

  return {
    entryIndex,
    hostCommentary,
    round,
    showProbability,
    showStats,
    showTree,
    simulationSpeed,
    stage,
    stats,
    autoSimulate,
    chooseDoor,
    decide,
    replay,
    setHostCommentary,
    setShowProbability,
    setShowStats,
    setShowTree,
    setSimulationSpeed,
  };
}
