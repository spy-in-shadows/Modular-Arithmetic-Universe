import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AppShell from './app/AppShell';
import LoadingWorld from './components/LoadingWorld';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const HilbertPage = lazy(() => import('./pages/HilbertPage'));
const BanachPage = lazy(() => import('./pages/BanachPage'));
const MontyPage = lazy(() => import('./pages/MontyPage'));
const BirthdayPage = lazy(() => import('./pages/BirthdayPage'));
const RandomnessPage = lazy(() => import('./pages/RandomnessPage'));
const CollatzPage = lazy(() => import('./pages/CollatzPage'));
const PrimesPage = lazy(() => import('./pages/PrimesPage'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hilbert" element={<HilbertPage />} />
        <Route path="/banach-tarski" element={<BanachPage />} />
        <Route path="/monty-hall" element={<MontyPage />} />
        <Route path="/birthday-paradox" element={<BirthdayPage />} />
        <Route path="/randomness-lab" element={<RandomnessPage />} />
        <Route path="/collatz-machine" element={<CollatzPage />} />
        <Route path="/prime-observatory" element={<PrimesPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<LoadingWorld />}>
          <AnimatedRoutes />
        </Suspense>
      </AppShell>
    </BrowserRouter>
  );
}
