import { motion } from 'framer-motion';

const rooms = Array.from({ length: 10 }, (_, index) => index + 1);

function targetFor(room, phaseId) {
  if (phaseId === 'shift') return room + 1;
  if (phaseId === 'double') return room * 2;
  return room;
}

function roomState(room, phaseId) {
  if (phaseId === 'shift' && room === 1) return 'freed';
  if (phaseId === 'double') return room % 2 === 0 ? 'occupied' : 'freed';
  return 'occupied';
}

export default function FiniteHotelStage({ phaseId, choice, replayKey, slowMotion }) {
  const showShift = phaseId === 'shift';
  const showDouble = phaseId === 'double';
  const showGuest = phaseId === 'arrival';
  const duration = slowMotion ? 1.5 : 0.75;

  return (
    <section className="absolute inset-x-4 top-1/2 z-10 -translate-y-[42%] md:inset-x-10">
      <div className="mx-auto max-w-5xl">
        {showGuest ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center justify-center gap-3 text-cyan-50"
          >
            <span className="h-4 w-4 rounded-full bg-fuchsia-200 shadow-violetGlow" />
            New guest waiting
          </motion.div>
        ) : null}

        <div className="relative grid grid-cols-5 gap-3 md:grid-cols-10">
          {rooms.map((room) => {
            const state = roomState(room, phaseId);
            const target = targetFor(room, phaseId);
            const moving = showShift || showDouble;

            return (
              <div key={`${room}-${replayKey}`} className="relative min-h-32 rounded-2xl border border-white/10 bg-slate-950/55 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between font-mono text-xs text-slate-300">
                  <span>Room</span>
                  <span>{room}</span>
                </div>

                <div className={`mt-6 h-12 rounded-xl border ${
                  state === 'occupied'
                    ? 'border-yellow-200/35 bg-yellow-300/12'
                    : 'border-cyan-200/35 bg-cyan-300/12 shadow-cyanGlow'
                }`} />

                {state === 'freed' ? <span className="absolute bottom-3 left-3 text-[0.68rem] uppercase tracking-[0.24em] text-cyan-100">free</span> : null}

                {(!moving || room <= 5) ? (
                  <motion.span
                    className="absolute left-1/2 top-[4.85rem] h-4 w-4 -translate-x-1/2 rounded-full bg-yellow-200 shadow-goldGlow"
                    initial={moving ? { x: 0, opacity: 1 } : false}
                    animate={
                      moving
                        ? {
                            x: showShift ? 42 : 78,
                            opacity: [1, 1, 0],
                          }
                        : { opacity: 1 }
                    }
                    transition={{ duration, delay: room * 0.08, ease: 'easeInOut' }}
                  />
                ) : null}

                {moving ? (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-cyan-50"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: room * 0.08 }}
                  >
                    {room} {'->'} {target}
                  </motion.div>
                ) : null}
              </div>
            );
          })}
        </div>

        {showDouble ? (
          <div className="mt-12 grid grid-cols-5 gap-3 md:grid-cols-10">
            {rooms.map((room) => (
              <div key={`odd-${room}`} className={`text-center font-mono text-xs ${room % 2 === 1 ? 'text-cyan-100' : 'text-slate-600'}`}>
                {room % 2 === 1 ? 'odd room free' : 'even occupied'}
              </div>
            ))}
          </div>
        ) : null}

        {phaseId === 'arrival' && choice ? (
          <p className="mt-8 text-center text-sm text-slate-300">
            {choice === 'shift' ? 'Watch the guests move together.' : 'That answer follows finite intuition.'}
          </p>
        ) : null}
      </div>
    </section>
  );
}
