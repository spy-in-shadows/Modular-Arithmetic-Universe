import { useEffect, useState } from 'react';

export default function useBanachNarrative() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [slowMotion, setSlowMotion] = useState(true);
  const [autoMode, setAutoMode] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const choose = (value) => setChoice(value);
  const nextStep = () => {
    if (phaseIndex === 0 && !choice) return;
    setPhaseIndex((value) => Math.min(7, value + 1));
  };
  const replay = () => setReplayKey((value) => value + 1);

  useEffect(() => {
    if (!autoMode) return undefined;
    if (phaseIndex === 0 && !choice) return undefined;
    if (phaseIndex >= 7) return undefined;
    const timer = setTimeout(nextStep, slowMotion ? 6200 : 3800);
    return () => clearTimeout(timer);
  }, [autoMode, choice, phaseIndex, slowMotion]);

  return {
    autoMode,
    choice,
    phaseIndex,
    replayKey,
    slowMotion,
    choose,
    nextStep,
    replay,
    setAutoMode,
    setPhaseIndex,
    setSlowMotion,
  };
}
