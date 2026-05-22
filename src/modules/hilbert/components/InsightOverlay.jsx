import { hotelEvents } from '../data/events';

export default function InsightOverlay({ eventType, finale, entryStage }) {
  const event = hotelEvents[eventType];

  return (
    <div className="pointer-events-none absolute inset-x-4 top-20 z-10 md:left-8 md:right-auto md:top-24 md:max-w-xl">
      {entryStage < 3 ? (
        <div className="space-y-3">
          {entryStage >= 1 ? <p className="font-mono text-sm uppercase tracking-[0.4em] text-cyan-100/65">Every room is occupied.</p> : null}
          {entryStage >= 2 ? <p className="text-2xl text-white md:text-4xl">Yet infinity still has space.</p> : null}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 backdrop-blur-md">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyan-100/55">{event.equation}</p>
          <p className="mt-3 text-lg text-white md:text-xl">{finale ? 'Infinity is not a number.' : event.revelation}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
            {finale ? 'It is a different kind of reality.' : event.insight}
          </p>
        </div>
      )}
    </div>
  );
}
