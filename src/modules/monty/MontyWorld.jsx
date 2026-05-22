import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import DecisionPanel from './components/DecisionPanel';
import GameShowStage from './components/GameShowStage';
import HostPanel from './components/HostPanel';
import ProbabilityFlow from './components/ProbabilityFlow';
import RevelationTicker from './components/RevelationTicker';
import SimulationPanel from './components/SimulationPanel';
import StatsPanel from './components/StatsPanel';
import useMontyGame from './hooks/useMontyGame';
import StageParticles from './particles/StageParticles';

export default function MontyWorld() {
  const game = useMontyGame();
  const intensity = game.stage === 'reveal' ? 2 : game.stage === 'result' ? 1.5 : 1;

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <StageParticles intensity={intensity} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(236,72,153,0.18),transparent_32%),radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.58),transparent_45%,rgba(2,6,23,0.86))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0_1px,transparent_1px_80px)] [transform:perspective(600px)_rotateX(62deg)]" />

      <Link to="/" className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-cyan-50 backdrop-blur-xl transition hover:border-fuchsia-200/35 md:left-6 md:top-6">
        <ArrowLeft className="h-4 w-4" />
        Return to observatory
      </Link>

      <HostPanel entryIndex={game.entryIndex} hostCommentary={game.hostCommentary} round={game.round} stage={game.stage} stats={game.stats} />
      <SimulationPanel
        hostCommentary={game.hostCommentary}
        showProbability={game.showProbability}
        showStats={game.showStats}
        showTree={game.showTree}
        simulationSpeed={game.simulationSpeed}
        onAutoSimulate={game.autoSimulate}
        onHostCommentary={() => game.setHostCommentary((value) => !value)}
        onProbability={() => game.setShowProbability((value) => !value)}
        onSimulationSpeed={game.setSimulationSpeed}
        onStats={() => game.setShowStats((value) => !value)}
        onTree={() => game.setShowTree((value) => !value)}
      />
      <GameShowStage round={game.round} stage={game.stage} onChoose={game.chooseDoor} />
      <ProbabilityFlow show={game.showProbability} showTree={game.showTree} />
      <RevelationTicker show={game.stage === 'decide' || game.showProbability} stats={game.stats} />
      <DecisionPanel round={game.round} stage={game.stage} onDecide={game.decide} onReplay={game.replay} />
      <StatsPanel show={game.showStats} stats={game.stats} />
    </motion.main>
  );
}
