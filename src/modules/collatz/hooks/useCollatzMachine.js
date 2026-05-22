import { useEffect, useMemo, useState } from 'react';
import { buildSequence, sequenceStats } from '../systems/sequenceEngine';
import { heatmapValues, worstNumbersUnder } from '../systems/chaosMapSystem';

export default function useCollatzMachine() {
  const [input, setInput] = useState(27);
  const [activeStart, setActiveStart] = useState(27);
  const [stepIndex, setStepIndex] = useState(0);
  const [running, setRunning] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [massiveMode, setMassiveMode] = useState(false);
  const [showPath, setShowPath] = useState(true);
  const [showTree, setShowTree] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [machineStability, setMachineStability] = useState(0.75);
  const [memory, setMemory] = useState([]);
  const [simulations, setSimulations] = useState(0);

  const sequence = useMemo(() => buildSequence(activeStart, 1200), [activeStart]);
  const visibleSequence = sequence.slice(0, Math.max(1, stepIndex + 1));
  const stats = sequenceStats(visibleSequence);
  const fullStats = sequenceStats(sequence);
  const worst = useMemo(() => worstNumbersUnder(220), []);
  const heatmap = useMemo(() => heatmapValues(180), []);

  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setStepIndex((current) => {
        if (current >= sequence.length - 1) {
          setMemory((items) => [...items, sequence].slice(-8));
          if (autoGenerate || massiveMode) {
            const next = massiveMode ? Math.floor(1000 + Math.random() * 90000) : Math.floor(2 + Math.random() * 400);
            setActiveStart(next);
            setInput(next);
            setSimulations((value) => value + 1);
            return 0;
          }
          return current;
        }
        return current + 1;
      });
    }, 520 / simulationSpeed);
    return () => clearInterval(timer);
  }, [autoGenerate, massiveMode, running, sequence, simulationSpeed]);

  const injectNumber = () => {
    setActiveStart(Math.max(1, Math.floor(input)));
    setStepIndex(0);
    setRunning(true);
  };

  const resetMachine = () => {
    setActiveStart(27);
    setInput(27);
    setStepIndex(0);
    setMemory([]);
    setSimulations(0);
    setRunning(true);
    setAutoGenerate(false);
    setMassiveMode(false);
  };

  return {
    activeStart,
    autoGenerate,
    chaosMode,
    fullStats,
    heatmap,
    input,
    machineStability,
    massiveMode,
    memory,
    running,
    sequence,
    showHeatmap,
    showPath,
    showTree,
    simulations,
    simulationSpeed,
    stats,
    stepIndex,
    visibleSequence,
    worst,
    injectNumber,
    resetMachine,
    setAutoGenerate,
    setChaosMode,
    setInput,
    setMachineStability,
    setMassiveMode,
    setRunning,
    setShowHeatmap,
    setShowPath,
    setShowTree,
    setSimulationSpeed,
  };
}
