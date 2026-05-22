export default function SequenceRibbon({ visibleSequence }) {
  return (
    <div className="absolute bottom-4 left-4 z-20 hidden max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] p-3 backdrop-blur-xl md:block">
      <div className="flex gap-2 overflow-hidden">
        {visibleSequence.slice(-18).map((value, index) => (
          <div key={`${value}-${index}`} className={`min-w-20 rounded-xl border border-white/10 px-3 py-2 ${value % 2 ? 'bg-orange-300/10 text-orange-100' : 'bg-cyan-300/10 text-cyan-100'}`}>
            <p className="font-mono text-sm">{value}</p>
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">{value % 2 ? '3n+1' : '÷2'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
