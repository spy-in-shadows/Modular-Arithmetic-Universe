import MontyDoor from './MontyDoor';

export default function GameShowStage({ round, stage, onChoose }) {
  return (
    <section className="absolute inset-x-4 top-[34%] z-10 -translate-y-1/2 md:inset-x-12 md:top-[48%]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex justify-center">
          <div className="relative h-32 w-32 rounded-full border border-fuchsia-200/20 bg-slate-950/45 shadow-violetGlow backdrop-blur-xl">
            <div className="absolute inset-x-0 top-7 text-center text-xs uppercase tracking-[0.3em] text-fuchsia-100/55">Host</div>
            <div className="absolute bottom-6 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-200/80 to-fuchsia-300/70 shadow-cyanGlow" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {[0, 1, 2].map((door) => (
            <MontyDoor key={door} door={door} round={round} stage={stage} onChoose={onChoose} />
          ))}
        </div>
      </div>
    </section>
  );
}
