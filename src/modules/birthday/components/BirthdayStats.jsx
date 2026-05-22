import { birthdayProbability } from '../../../utils/math';

function Curve({ peopleCount, prediction }) {
  const path = Array.from({ length: 80 }, (_, index) => {
    const people = index + 1;
    const x = (index / 79) * 300;
    const y = 100 - birthdayProbability(people) * 96;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  const markerX = (Math.min(80, peopleCount) / 80) * 300;
  const predictionX = (Math.min(160, prediction) / 160) * 300;

  return (
    <svg viewBox="0 0 300 110" className="h-32 w-full">
      <path d={path} fill="none" stroke="rgba(250,204,21,0.92)" strokeWidth="3" />
      <line x1="0" x2="300" y1="52" y2="52" stroke="rgba(255,255,255,0.16)" strokeDasharray="4 4" />
      <line x1={markerX} x2={markerX} y1="0" y2="110" stroke="rgba(103,232,249,0.8)" />
      <line x1={predictionX} x2={predictionX} y1="0" y2="110" stroke="rgba(244,114,182,0.75)" />
      <text x="86" y="22" fill="rgba(250,204,21,0.9)" fontSize="10">23 ≈ 50%</text>
    </svg>
  );
}

export default function BirthdayStats({ collisions, comparePrediction, pairs, peopleCount, prediction, probability, showCurve, stats }) {
  const simulationRate = stats.runs ? (stats.collisions / stats.runs) * 100 : 0;
  return (
    <aside className="absolute right-4 top-20 z-20 hidden w-[24rem] rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl md:block">
      <p className="font-mono text-xs uppercase tracking-[0.34em] text-yellow-100/55">Live probability</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric label="people" value={peopleCount} />
        <Metric label="probability" value={`${(probability * 100).toFixed(1)}%`} />
        <Metric label="pairs" value={pairs} />
        <Metric label="collisions" value={collisions.clusters.length} />
      </div>
      {comparePrediction ? <p className="mt-4 text-sm text-slate-300">Prediction error: {Math.max(0, prediction - peopleCount)} people away from what you expected.</p> : null}
      {showCurve ? <div className="mt-4"><Curve peopleCount={peopleCount} prediction={prediction} /></div> : null}
      {stats.runs ? <p className="mt-4 text-sm text-cyan-100">{stats.runs} simulations · matches in {simulationRate.toFixed(1)}% of rooms.</p> : null}
    </aside>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.22em] text-yellow-100/45">{label}</p>
      <p className="mt-1 font-mono text-xl text-white">{value}</p>
    </div>
  );
}
