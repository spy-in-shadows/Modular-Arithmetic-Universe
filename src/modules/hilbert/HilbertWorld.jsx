import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CorridorRenderer from './components/CorridorRenderer';
import ControlDeck from './components/ControlDeck';
import EquationOverlay from './components/EquationOverlay';
import FiniteHotelStage from './components/FiniteHotelStage';
import NarrativePanel from './components/NarrativePanel';
import StepControls from './components/StepControls';
import { narrativePhases } from './data/phases';
import useHilbertNarrative from './hooks/useHilbertNarrative';
import useHilbertSimulation from './hooks/useHilbertSimulation';

export default function HilbertWorld() {
  const simulation = useHilbertSimulation();
  const narrative = useHilbertNarrative();
  const phase = narrativePhases[narrative.phaseIndex];
  const cinematicMode = narrative.phaseIndex >= 4;

  useEffect(() => {
    if (narrative.phaseIndex < 4) {
      simulation.triggerEvent('idle');
      simulation.setPaused(true);
      simulation.setCameraSpeed(0.08);
      simulation.setCorridorDepth(window.innerWidth < 768 ? 12 : 16);
      return;
    }

    if (narrative.phaseIndex === 4) {
      simulation.setPaused(false);
      simulation.triggerEvent('infinite');
      simulation.setCameraSpeed(0.34);
      simulation.setCorridorDepth(window.innerWidth < 768 ? 16 : 22);
    }

    if (narrative.phaseIndex === 5) {
      simulation.setPaused(false);
      simulation.triggerEvent('buses');
      simulation.setCameraSpeed(0.5);
      simulation.setCorridorDepth(window.innerWidth < 768 ? 18 : 28);
    }
  }, [narrative.phaseIndex]);

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`absolute inset-0 transition-opacity duration-1000 ${cinematicMode ? 'opacity-100' : 'opacity-20'}`}>
        <CorridorRenderer {...simulation} />
        <EquationOverlay eventType={simulation.eventType} finale={simulation.finale} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent,rgba(2,6,23,0.78)_74%),linear-gradient(180deg,rgba(2,6,23,0.6),transparent_32%,rgba(2,6,23,0.72))]" />

      <Link to="/" className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-cyan-50 backdrop-blur-xl transition hover:border-cyan-200/35 md:left-6 md:top-6">
        <ArrowLeft className="h-4 w-4" />
        Return to observatory
      </Link>

      <NarrativePanel
        attemptMessage={narrative.attemptMessage}
        choice={narrative.choice}
        phaseIndex={narrative.phaseIndex}
        onChoose={narrative.choose}
      />

      {!cinematicMode ? (
        <FiniteHotelStage
          choice={narrative.choice}
          phaseId={phase.id}
          replayKey={narrative.replayKey}
          slowMotion={narrative.slowMotion}
        />
      ) : null}

      <StepControls
        autoMode={narrative.autoMode}
        canAdvance={narrative.phaseIndex !== 1 || narrative.choice === 'shift'}
        phaseIndex={narrative.phaseIndex}
        slowMotion={narrative.slowMotion}
        onAutoMode={() => narrative.setAutoMode((value) => !value)}
        onNext={narrative.nextStep}
        onReplay={narrative.replay}
        onSlowMotion={() => narrative.setSlowMotion((value) => !value)}
      />

      {cinematicMode ? (
        <ControlDeck
          {...simulation}
          onEvent={simulation.triggerEvent}
          onCameraSpeed={simulation.setCameraSpeed}
          onCorridorDepth={simulation.setCorridorDepth}
          onPause={() => simulation.setPaused((value) => !value)}
          onLabels={() => simulation.setShowLabels((value) => !value)}
          onMappings={() => simulation.setShowMappings((value) => !value)}
          onSimulationSpeed={simulation.setSimulationSpeed}
        />
      ) : null}
    </motion.main>
  );
}
