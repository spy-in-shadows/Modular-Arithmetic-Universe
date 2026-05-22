import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AtmosphereCanvas from '../components/AtmosphereCanvas';
import EquationField from '../components/EquationField';
import SecretOverlay from '../components/SecretOverlay';
import useAmbientAudio from '../hooks/useAmbientAudio';
import useKonami from '../hooks/useKonami';

export default function AppShell({ children }) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const secretMode = useKonami();
  const location = useLocation();
  useAmbientAudio(audioEnabled, location.pathname);

  return (
    <div className={`relative min-h-screen overflow-hidden bg-slate-950 text-white ${secretMode ? 'secret-mode' : ''}`}>
      <AtmosphereCanvas />
      <EquationField />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_26%),radial-gradient(circle_at_82%_8%,rgba(217,70,239,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(250,204,21,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.75))]" />

      <button
        type="button"
        className="fixed right-4 top-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-cyan-50 shadow-cyanGlow backdrop-blur-xl transition hover:border-cyan-200/40 hover:bg-cyan-200/10 md:right-6 md:top-6"
        onClick={() => setAudioEnabled((value) => !value)}
        title={audioEnabled ? 'Mute ambience' : 'Enable ambience'}
      >
        {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>

      <div className="relative z-10">{children}</div>
      {secretMode ? <SecretOverlay /> : null}
    </div>
  );
}
