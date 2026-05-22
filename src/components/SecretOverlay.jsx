export default function SecretOverlay() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <div className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-fuchsia-100 shadow-violetGlow backdrop-blur-xl">
        hidden mode: impossible geometry engaged
      </div>
    </div>
  );
}
