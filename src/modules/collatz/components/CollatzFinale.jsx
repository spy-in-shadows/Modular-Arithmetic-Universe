export default function CollatzFinale({ simulations }) {
  if (simulations < 30) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 top-[58%] z-20 mx-auto max-w-2xl -translate-y-1/2 text-center">
      <div className="rounded-2xl border border-orange-200/20 bg-slate-950/66 p-5 shadow-violetGlow backdrop-blur-xl">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-orange-100/55">{simulations} trajectories processed</p>
        <h2 className="mt-3 text-2xl text-white md:text-4xl">Every tested number returns.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
          No proof exists. Simple rules can hide infinite mystery.
        </p>
      </div>
    </div>
  );
}
