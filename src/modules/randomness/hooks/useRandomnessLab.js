import { useEffect, useMemo, useState } from 'react';
import { analyzePattern } from '../analysis/analyzePattern';
import { alternationRate, longestStreak } from '../analysis/streakAnalyzer';
import { challengePairs } from '../data/copy';
import { generateCoinFlips, generatePseudoHumanPoints, generateRandomPoints } from '../systems/randomnessEngine';

export default function useRandomnessLab() {
  const [phase, setPhase] = useState('entry');
  const [entryIndex, setEntryIndex] = useState(0);
  const [humanPoints, setHumanPoints] = useState([]);
  const [rngPoints, setRngPoints] = useState(() => generateRandomPoints(42));
  const [fakeHumanPoints, setFakeHumanPoints] = useState(() => generatePseudoHumanPoints(42));
  const [showClusters, setShowClusters] = useState(false);
  const [showEntropy, setShowEntropy] = useState(false);
  const [showStreaks, setShowStreaks] = useState(false);
  const [illusionMode, setIllusionMode] = useState(false);
  const [massiveMode, setMassiveMode] = useState(false);
  const [simulationCount, setSimulationCount] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeResult, setChallengeResult] = useState(null);
  const [streakSequence, setStreakSequence] = useState(() => generateCoinFlips(42));

  useEffect(() => {
    const timer = setInterval(() => setEntryIndex((value) => Math.min(2, value + 1)), 1050);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!massiveMode) return undefined;
    const timer = setInterval(() => {
      setRngPoints(generateRandomPoints(90));
      setSimulationCount((value) => value + 1000);
      setShowClusters(true);
      setShowEntropy(true);
    }, 520);
    return () => clearInterval(timer);
  }, [massiveMode]);

  const humanAnalysis = useMemo(() => analyzePattern(humanPoints), [humanPoints]);
  const rngAnalysis = useMemo(() => analyzePattern(rngPoints), [rngPoints]);
  const fakeAnalysis = useMemo(() => analyzePattern(fakeHumanPoints), [fakeHumanPoints]);
  const streakStats = useMemo(
    () => ({
      longest: longestStreak(streakSequence),
      alternation: alternationRate(streakSequence),
    }),
    [streakSequence],
  );

  const addHumanPoint = (point) => {
    if (phase === 'entry') setPhase('human');
    setHumanPoints((current) => [...current, { ...point, id: current.length + 1 }].slice(-80));
  };

  const comparePatterns = () => {
    setPhase('compare');
    setShowClusters(true);
    setShowEntropy(true);
    setRngPoints(generateRandomPoints(Math.max(36, humanPoints.length || 42)));
    setFakeHumanPoints(generatePseudoHumanPoints(Math.max(36, humanPoints.length || 42)));
  };

  const revealAnalysis = () => {
    setPhase('reveal');
    setShowClusters(true);
    setShowEntropy(true);
    setShowStreaks(true);
  };

  const resetExperiment = () => {
    setPhase('entry');
    setHumanPoints([]);
    setRngPoints(generateRandomPoints(42));
    setFakeHumanPoints(generatePseudoHumanPoints(42));
    setShowClusters(false);
    setShowEntropy(false);
    setShowStreaks(false);
    setIllusionMode(false);
    setMassiveMode(false);
    setSimulationCount(0);
    setChallengeResult(null);
  };

  const generateHumanLikePattern = () => {
    setHumanPoints(generatePseudoHumanPoints(42));
    setPhase('human');
  };

  const answerChallenge = (answer) => {
    const pair = challengePairs[challengeIndex % challengePairs.length];
    const correct = answer === 'rng';
    setChallengeResult(correct ? 'Correct. The ugly streaks were real randomness.' : 'That was the trap. The balanced sequence was human-like.');
    setStreakSequence(pair.rng);
    setShowStreaks(true);
    setChallengeIndex((value) => value + 1);
  };

  return {
    challengeIndex,
    challengeResult,
    entryIndex,
    fakeAnalysis,
    fakeHumanPoints,
    humanAnalysis,
    humanPoints,
    illusionMode,
    massiveMode,
    phase,
    rngAnalysis,
    rngPoints,
    showClusters,
    showEntropy,
    showStreaks,
    simulationCount,
    streakSequence,
    streakStats,
    addHumanPoint,
    answerChallenge,
    comparePatterns,
    generateHumanLikePattern,
    resetExperiment,
    revealAnalysis,
    setIllusionMode,
    setMassiveMode,
    setRngPoints,
    setShowClusters,
    setShowEntropy,
    setShowStreaks,
    setStreakSequence,
  };
}
