export default function GlassPanel({ children, className = '' }) {
  return <section className={`rounded-2xl border border-white/10 bg-white/[0.07] shadow-cyanGlow backdrop-blur-xl ${className}`}>{children}</section>;
}
