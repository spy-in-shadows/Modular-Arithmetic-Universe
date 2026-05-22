import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiomChoiceLayer from './components/AxiomChoiceLayer';
import BanachControls from './components/BanachControls';
import BanachEquationField from './components/BanachEquationField';
import BanachNarrativePanel from './components/BanachNarrativePanel';
import BanachRenderer from './components/BanachRenderer';
import { banachPhases } from './data/phases';
import useBanachNarrative from './hooks/useBanachNarrative';

export default function BanachWorld() {
  const narrative = useBanachNarrative();
  const phase = banachPhases[narrative.phaseIndex];
  const [rotateSphere, setRotateSphere] = useState(true);
  const [equations, setEquations] = useState(true);
  const [topology, setTopology] = useState(false);
  const [pointCloud, setPointCloud] = useState(true);
  const [cameraOrbit, setCameraOrbit] = useState(true);
  const [fragmentDensity, setFragmentDensity] = useState(0.8);
  const [realityStability, setRealityStability] = useState(0.85);

  useEffect(() => {
    if (narrative.phaseIndex >= 2) setTopology(true);
    if (narrative.phaseIndex >= 3) setRealityStability(0.38);
    if (narrative.phaseIndex >= 5) setRealityStability(0.72);
    if (narrative.phaseIndex >= 7) setRealityStability(0.18);
  }, [narrative.phaseIndex]);

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <BanachRenderer
        cameraOrbit={cameraOrbit}
        fragmentDensity={fragmentDensity}
        phaseId={phase.id}
        pointCloud={pointCloud}
        realityStability={realityStability}
        replayKey={narrative.replayKey}
        rotateSphere={rotateSphere}
        slowMotion={narrative.slowMotion}
        topology={topology}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent,rgba(2,6,23,0.55)_58%,rgba(2,6,23,0.92)_100%),radial-gradient(circle_at_70%_18%,rgba(168,85,247,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.52),transparent_40%,rgba(2,6,23,0.68))]" />
      <BanachEquationField visible={equations} phaseIndex={narrative.phaseIndex} />

      <Link to="/" className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-violet-50 backdrop-blur-xl transition hover:border-violet-200/35 md:left-6 md:top-6">
        <ArrowLeft className="h-4 w-4" />
        Return to observatory
      </Link>

      <BanachNarrativePanel choice={narrative.choice} phaseIndex={narrative.phaseIndex} onChoose={narrative.choose} />
      <AxiomChoiceLayer visible={phase.id === 'choice'} />

      <BanachControls
        autoMode={narrative.autoMode}
        canAdvance={narrative.phaseIndex !== 0 || Boolean(narrative.choice)}
        cameraOrbit={cameraOrbit}
        equations={equations}
        fragmentDensity={fragmentDensity}
        phaseIndex={narrative.phaseIndex}
        pointCloud={pointCloud}
        realityStability={realityStability}
        rotateSphere={rotateSphere}
        slowMotion={narrative.slowMotion}
        topology={topology}
        onAutoMode={() => narrative.setAutoMode((value) => !value)}
        onCameraOrbit={() => setCameraOrbit((value) => !value)}
        onDensity={setFragmentDensity}
        onEquations={() => setEquations((value) => !value)}
        onNext={narrative.nextStep}
        onPointCloud={() => setPointCloud((value) => !value)}
        onReplay={narrative.replay}
        onRotateSphere={() => setRotateSphere((value) => !value)}
        onSlowMotion={() => narrative.setSlowMotion((value) => !value)}
        onStability={setRealityStability}
        onTopology={() => setTopology((value) => !value)}
      />
    </motion.main>
  );
}
