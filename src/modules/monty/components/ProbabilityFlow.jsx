export default function ProbabilityFlow({ show, showTree }) {
  if (!show && !showTree) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-[58%] z-10 mx-auto max-w-4xl -translate-y-1/2 md:top-[70%]">
      <div className="rounded-2xl border border-white/10 bg-slate-950/38 p-4 backdrop-blur-md">
        <div className="grid grid-cols-[1fr_2fr] gap-3 text-sm text-slate-200">
          <div>
            <p className="font-mono text-cyan-100">Your first pick</p>
            <div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full w-1/3 bg-cyan-300" />
            </div>
            <p className="mt-2 font-mono">1/3</p>
          </div>
          <div>
            <p className="font-mono text-fuchsia-100">The other unopened door</p>
            <div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-900">
              <div className="h-full w-2/3 bg-fuchsia-300" />
            </div>
            <p className="mt-2 font-mono">2/3</p>
          </div>
        </div>
        {showTree ? <p className="mt-4 text-sm text-slate-300">The host is constrained: they must reveal a goat. That action transfers attention, not probability, and exposes where the original 2/3 was hiding.</p> : null}
      </div>
    </div>
  );
}
