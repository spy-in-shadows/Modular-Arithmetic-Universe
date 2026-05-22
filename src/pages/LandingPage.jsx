import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Infinity as InfinityIcon, Orbit, Sparkles } from 'lucide-react';
import { worlds } from '../data/worlds';

function WorldPreview({ world, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <Link
        to={world.route}
        className="world-link group block min-h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-white/[0.1]"
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <span className="world-glyph font-mono text-3xl text-cyan-100 transition duration-300">{world.glyph}</span>
          <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-100" />
        </div>
        <h3 className="text-xl text-white">{world.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">{world.teaser}</p>
      </Link>
    </motion.div>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.38], [1, 0.2]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(14px)' }}
      transition={{ duration: 0.7 }}
    >
      <section className="relative flex min-h-[88vh] items-center px-4 pt-20 md:px-6">
        <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-100/70 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Mathematical observatory
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.25, duration: 1.1 }}
              className="text-[2.3rem] font-semibold tracking-[0.16em] text-white sm:text-6xl sm:tracking-[0.24em] md:text-8xl"
            >
              PARADOXIUM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-6 text-lg tracking-[0.18em] text-cyan-50/80 md:text-2xl"
            >
              Mathematics beyond intuition.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg"
            >
              Enter a cinematic museum of infinity, randomness, chaos, and impossible structure. Every world begins with a rule that looks harmless, then reveals a truth that feels unreal.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-100/55">Manifesto</p>
            <h2 className="mt-4 text-3xl text-white md:text-4xl">Reality is stranger than intuition.</h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-slate-300 md:grid-cols-2">
            <p>Infinity can absorb infinity. Coincidences appear long before they should. Switching doors beats loyalty. Prime numbers look scattered until they quietly form constellations.</p>
            <p>PARADOXIUM is built as an exploration engine, not a classroom. Touch the rules. Disturb the systems. Let the impossible become visible before it becomes explainable.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-100/55">Seven worlds</p>
              <h2 className="mt-3 text-3xl text-white md:text-4xl">Choose a reality fracture.</h2>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><InfinityIcon className="h-4 w-4" /> infinity</span>
              <span className="inline-flex items-center gap-2"><Orbit className="h-4 w-4" /> emergence</span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {worlds.map((world, index) => (
              <WorldPreview key={world.route} world={world} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-6">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center shadow-violetGlow backdrop-blur-xl md:p-10">
          <p className="font-mono text-sm uppercase tracking-[0.4em] text-fuchsia-100/60">This should not be true</p>
          <h2 className="mt-4 text-3xl text-white md:text-5xl">And yet the universe keeps agreeing.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Explore the museum slowly. The equations are simple. The consequences are not.
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-slate-400 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>PARADOXIUM</span>
          <span className="font-mono">Hilbert · Banach-Tarski · Monty Hall · Birthday paradox · Collatz · Ulam</span>
        </div>
      </footer>
    </motion.main>
  );
}
