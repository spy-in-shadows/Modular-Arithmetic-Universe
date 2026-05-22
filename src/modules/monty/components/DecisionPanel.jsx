export default function DecisionPanel({ round, stage, onDecide, onReplay }) {
  if (stage === 'choose' || stage === 'intro') return null;
  const canDecide = stage === 'decide';
  const result = stage === 'result' ? `${round.strategy === 'switch' ? 'Switched' : 'Stayed'} and ${round.outcome === 'win' ? 'won' : 'lost'}.` : null;

  return (
    <div className="absolute inset-x-4 bottom-4 z-30 rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl md:left-6 md:right-auto md:w-[25rem]">
      {result ? <p className="mb-3 text-center text-lg text-white">{result}</p> : null}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" disabled={!canDecide} onClick={() => onDecide('stay')} className="monty-button disabled:opacity-40">
          Stay
        </button>
        <button type="button" disabled={!canDecide} onClick={() => onDecide('switch')} className="monty-button is-hot disabled:opacity-40">
          Switch
        </button>
      </div>
      {stage === 'result' ? (
        <button type="button" onClick={onReplay} className="monty-button mt-2 w-full">
          Replay round
        </button>
      ) : null}
    </div>
  );
}
