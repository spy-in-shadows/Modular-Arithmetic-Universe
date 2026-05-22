export default function AxiomChoiceLayer({ visible }) {
  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-40 z-20 md:bottom-8 md:left-6 md:right-auto md:w-[25rem]">
      <div className="rounded-2xl border border-fuchsia-200/20 bg-fuchsia-300/[0.08] p-4 shadow-violetGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-fuchsia-100/60">Axiom of Choice</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          Imagine selecting one point from infinitely many invisible groups. The paradox needs this kind of selection. It is not a recipe for cutting physical material.
        </p>
      </div>
    </div>
  );
}
