import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CollatzFinale from './components/CollatzFinale';
import CollatzNarrative from './components/CollatzNarrative';
import MachineConsole from './components/MachineConsole';
import MachineRenderer from './components/MachineRenderer';
import MachineStats from './components/MachineStats';
import SequenceRibbon from './components/SequenceRibbon';
import useCollatzMachine from './hooks/useCollatzMachine';

export default function CollatzWorld() {
  const machine = useCollatzMachine();

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <MachineRenderer
        chaosMode={machine.chaosMode}
        heatmap={machine.heatmap}
        machineStability={machine.machineStability}
        memory={machine.memory}
        sequence={machine.sequence}
        showHeatmap={machine.showHeatmap}
        showPath={machine.showPath}
        showTree={machine.showTree}
        stats={machine.stats}
        stepIndex={machine.stepIndex}
        visibleSequence={machine.visibleSequence}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,transparent,rgba(2,6,23,0.52)_58%,rgba(2,6,23,0.94)_100%),radial-gradient(circle_at_16%_18%,rgba(251,146,60,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(34,211,238,0.12),transparent_25%)]" />

      <Link to="/" className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-orange-50 backdrop-blur-xl transition hover:border-orange-200/35 md:left-6 md:top-6">
        <ArrowLeft className="h-4 w-4" />
        Return to observatory
      </Link>

      <CollatzNarrative activeStart={machine.activeStart} simulations={machine.simulations} stats={machine.stats} stepIndex={machine.stepIndex} />
      <MachineStats fullStats={machine.fullStats} simulations={machine.simulations} stats={machine.stats} worst={machine.worst} />
      <SequenceRibbon visibleSequence={machine.visibleSequence} />
      <MachineConsole
        autoGenerate={machine.autoGenerate}
        chaosMode={machine.chaosMode}
        input={machine.input}
        machineStability={machine.machineStability}
        massiveMode={machine.massiveMode}
        running={machine.running}
        showHeatmap={machine.showHeatmap}
        showPath={machine.showPath}
        showTree={machine.showTree}
        simulationSpeed={machine.simulationSpeed}
        onAutoGenerate={() => machine.setAutoGenerate((value) => !value)}
        onChaosMode={() => machine.setChaosMode((value) => !value)}
        onHeatmap={() => machine.setShowHeatmap((value) => !value)}
        onInput={machine.setInput}
        onInject={machine.injectNumber}
        onMassiveMode={() => machine.setMassiveMode((value) => !value)}
        onReset={machine.resetMachine}
        onRunning={() => machine.setRunning((value) => !value)}
        onShowPath={() => machine.setShowPath((value) => !value)}
        onShowTree={() => machine.setShowTree((value) => !value)}
        onStability={machine.setMachineStability}
        onSpeed={machine.setSimulationSpeed}
      />
      <CollatzFinale simulations={machine.simulations} />
    </motion.main>
  );
}
