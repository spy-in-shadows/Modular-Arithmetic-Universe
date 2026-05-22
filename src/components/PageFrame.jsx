import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { routeTransition } from '../animations/routeTransitions';

export default function PageFrame({ eyebrow, title, thesis, children }) {
  return (
    <motion.main
      className="relative min-h-screen px-4 pb-8 pt-20 md:px-6 md:pb-10 md:pt-24"
      initial={routeTransition.initial}
      animate={routeTransition.animate}
      exit={routeTransition.exit}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-100/75 transition hover:text-cyan-50">
          <ArrowLeft className="h-4 w-4" />
          Return to observatory
        </Link>

        <header className="mb-8 max-w-4xl">
          <p className="mb-3 text-xs uppercase tracking-[0.42em] text-cyan-100/55">{eyebrow}</p>
          <h1 className="text-3xl font-semibold tracking-[0.08em] text-white md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">{thesis}</p>
        </header>

        {children}
      </div>
    </motion.main>
  );
}
