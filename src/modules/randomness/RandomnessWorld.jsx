import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnalysisPanel from './components/AnalysisPanel';
import ComparisonGrid from './components/ComparisonGrid';
import LabControls from './components/LabControls';
import LabNarrativePanel from './components/LabNarrativePanel';
import RandomnessFinale from './components/RandomnessFinale';
import StreakLab from './components/StreakLab';
import useRandomnessLab from './hooks/useRandomnessLab';
import ScannerFog from './particles/ScannerFog';
import { generateRandomPoints } from './systems/randomnessEngine';

export default function RandomnessWorld() {
  const lab = useRandomnessLab();

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <ScannerFog active={lab.phase === 'reveal' || lab.massiveMode} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_54%,transparent,rgba(2,6,23,0.58)_58%,rgba(2,6,23,0.94)_100%),radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(244,114,182,0.12),transparent_25%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,auto,44px_44px,44px_44px]" />

      <Link to="/" className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-cyan-50 backdrop-blur-xl transition hover:border-cyan-200/35 md:left-6 md:top-6">
        <ArrowLeft className="h-4 w-4" />
        Return to observatory
      </Link>

      <LabNarrativePanel entryIndex={lab.entryIndex} humanCount={lab.humanPoints.length} phase={lab.phase} simulationCount={lab.simulationCount} />
      <ComparisonGrid
        fakeAnalysis={lab.fakeAnalysis}
        fakeHumanPoints={lab.fakeHumanPoints}
        humanAnalysis={lab.humanAnalysis}
        humanPoints={lab.humanPoints}
        onPoint={lab.addHumanPoint}
        phase={lab.phase}
        rngAnalysis={lab.rngAnalysis}
        rngPoints={lab.rngPoints}
        showClusters={lab.showClusters}
        showEntropy={lab.showEntropy}
      />
      <AnalysisPanel human={lab.humanAnalysis} rng={lab.rngAnalysis} phase={lab.phase} simulationCount={lab.simulationCount} />
      <StreakLab
        challengeIndex={lab.challengeIndex}
        challengeResult={lab.challengeResult}
        onAnswer={lab.answerChallenge}
        sequence={lab.streakSequence}
        show={lab.showStreaks}
        stats={lab.streakStats}
      />
      <LabControls
        canCompare={lab.humanPoints.length >= 12}
        illusionMode={lab.illusionMode}
        massiveMode={lab.massiveMode}
        phase={lab.phase}
        showClusters={lab.showClusters}
        showEntropy={lab.showEntropy}
        showStreaks={lab.showStreaks}
        onCompare={lab.comparePatterns}
        onGenerateHuman={lab.generateHumanLikePattern}
        onGenerateRng={() => lab.setRngPoints(generateRandomPoints(60))}
        onIllusion={() => lab.setIllusionMode((value) => !value)}
        onMassive={() => lab.setMassiveMode((value) => !value)}
        onReset={lab.resetExperiment}
        onReveal={lab.revealAnalysis}
        onShowClusters={() => lab.setShowClusters((value) => !value)}
        onShowEntropy={() => lab.setShowEntropy((value) => !value)}
        onShowStreaks={() => lab.setShowStreaks((value) => !value)}
      />
      {lab.illusionMode ? (
        <div className="pointer-events-none absolute inset-x-4 top-[58%] z-20 mx-auto max-w-xl -translate-y-1/2 rounded-2xl border border-fuchsia-200/20 bg-slate-950/66 p-4 text-center shadow-violetGlow backdrop-blur-xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-fuchsia-100/55">Pattern hallucination mode</p>
          <p className="mt-3 text-xl text-white">If you see a structure, your brain may have invented it.</p>
        </div>
      ) : null}
      <RandomnessFinale simulationCount={lab.simulationCount} />
    </motion.main>
  );
}
