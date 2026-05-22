import { useEffect, useState } from 'react';

export default function useHilbertNarrative() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [attemptMessage, setAttemptMessage] = useState('');
  const [replayKey, setReplayKey] = useState(0);
  const [slowMotion, setSlowMotion] = useState(true);
  const [autoMode, setAutoMode] = useState(false);

  const nextStep = () => {
    if (phaseIndex === 1 && choice !== 'shift') return;
    setPhaseIndex((value) => Math.min(5, value + 1));
  };

  const replay = () => setReplayKey((value) => value + 1);

  const choose = (nextChoice) => {
    setChoice(nextChoice);
    if (nextChoice === 'reject') setAttemptMessage('Finite intuition says no. But infinity has another move.');
    if (nextChoice === 'build') setAttemptMessage('Building one room dodges the paradox. Try using only the rooms that already exist.');
    if (nextChoice === 'shift') setAttemptMessage('Yes. Let every guest move together.');
  };

  useEffect(() => {
    if (!autoMode) return undefined;
    if (phaseIndex === 1 && choice !== 'shift') return undefined;
    if (phaseIndex >= 5) return undefined;
    const timer = setTimeout(nextStep, phaseIndex < 2 ? 3600 : 5200);
    return () => clearTimeout(timer);
  }, [autoMode, choice, phaseIndex]);

  return {
    attemptMessage,
    autoMode,
    choice,
    phaseIndex,
    replayKey,
    slowMotion,
    choose,
    nextStep,
    replay,
    setAutoMode,
    setSlowMotion,
  };
}
