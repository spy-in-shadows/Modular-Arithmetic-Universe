import { entryLines } from '../data/copy';

export default function PredictionPanel({ confidence, entryIndex, onCommit, prediction, setConfidence, setPrediction }) {
  return (
    <aside className="absolute inset-x-4 top-20 z-30 md:left-6 md:right-auto md:top-24 md:w-[28rem]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/66 p-4 shadow-goldGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-yellow-100/55">Intuition anchor</p>
        <h1 className="mt-3 text-2xl text-white md:text-3xl">{entryLines[Math.min(entryIndex, entryLines.length - 1)]}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">Commit to a guess before the room starts filling. The surprise only works if your intuition has something to lose.</p>

        <label className="mt-5 grid gap-2 text-sm text-slate-300">
          <span className="flex justify-between">
            <span>people needed</span>
            <span className="font-mono text-yellow-100">{prediction}</span>
          </span>
          <input className="range" type="range" min="10" max="160" value={prediction} onChange={(event) => setPrediction(Number(event.target.value))} />
        </label>

        <label className="mt-4 grid gap-2 text-sm text-slate-300">
          <span className="flex justify-between">
            <span>confidence</span>
            <span className="font-mono text-yellow-100">{confidence}%</span>
          </span>
          <input className="range" type="range" min="0" max="100" value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} />
        </label>

        <button type="button" onClick={onCommit} className="birthday-button is-hot mt-5 w-full">
          Begin the room
        </button>
      </div>
    </aside>
  );
}
