import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BirthdayControls from './components/BirthdayControls';
import BirthdayFinale from './components/BirthdayFinale';
import BirthdayNarrative from './components/BirthdayNarrative';
import BirthdayStats from './components/BirthdayStats';
import PredictionPanel from './components/PredictionPanel';
import SocialRoomCanvas from './components/SocialRoomCanvas';
import useBirthdayRoom from './hooks/useBirthdayRoom';

export default function BirthdayWorld() {
  const room = useBirthdayRoom();
  const [entryIndex, setEntryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEntryIndex((value) => Math.min(2, value + 1));
    }, 1100);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <SocialRoomCanvas collisions={room.collisions} people={room.people} showCalendar={room.showCalendar} showHeatmap={room.showHeatmap} showPairs={room.showPairs} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,transparent,rgba(2,6,23,0.54)_58%,rgba(2,6,23,0.92)_100%),radial-gradient(circle_at_15%_18%,rgba(250,204,21,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(34,211,238,0.12),transparent_25%)]" />

      <Link to="/" className="absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-yellow-50 backdrop-blur-xl transition hover:border-yellow-200/35 md:left-6 md:top-6">
        <ArrowLeft className="h-4 w-4" />
        Return to observatory
      </Link>

      {!room.committed ? (
        <PredictionPanel
          confidence={room.confidence}
          entryIndex={entryIndex}
          onCommit={room.commitPrediction}
          prediction={room.prediction}
          setConfidence={room.setConfidence}
          setPrediction={room.setPrediction}
        />
      ) : (
        <>
          <BirthdayNarrative firstCollisionAt={room.firstCollisionAt} peopleCount={room.people.length} prediction={room.prediction} probability={room.probability} />
          <BirthdayStats
            collisions={room.collisions}
            comparePrediction={room.comparePrediction}
            pairs={room.pairs}
            peopleCount={room.people.length}
            prediction={room.prediction}
            probability={room.probability}
            showCurve={room.showCurve}
            stats={room.stats}
          />
          <BirthdayControls
            autoPopulate={room.autoPopulate}
            comparePrediction={room.comparePrediction}
            showCalendar={room.showCalendar}
            showCurve={room.showCurve}
            showHeatmap={room.showHeatmap}
            showPairs={room.showPairs}
            simulationSpeed={room.simulationSpeed}
            simulationLoop={room.simulationLoop}
            onAddPerson={room.addPerson}
            onAutoPopulate={() => room.setAutoPopulate((value) => !value)}
            onAutoSimulate={room.autoSimulate}
            onCalendar={() => room.setShowCalendar((value) => !value)}
            onCompare={() => room.setComparePrediction((value) => !value)}
            onCurve={() => room.setShowCurve((value) => !value)}
            onHeatmap={() => room.setShowHeatmap((value) => !value)}
            onPairs={() => room.setShowPairs((value) => !value)}
            onReset={room.resetRoom}
            onSimulationSpeed={room.setSimulationSpeed}
            onSimulationLoop={() => room.setSimulationLoop((value) => !value)}
          />
          <BirthdayFinale stats={room.stats} />
        </>
      )}
    </motion.main>
  );
}
