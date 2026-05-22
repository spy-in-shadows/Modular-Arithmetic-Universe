import { useEffect, useRef } from 'react';

const frequencies = {
  '/': [55, 110],
  '/hilbert': [48, 96],
  '/banach-tarski': [63, 126],
  '/monty-hall': [72, 144],
  '/birthday-paradox': [58, 116],
  '/randomness-lab': [67, 101],
  '/collatz-machine': [44, 88],
  '/prime-observatory': [52, 156],
};

export default function useAmbientAudio(enabled, route) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      if (audioRef.current) {
        audioRef.current.context.close();
        audioRef.current = null;
      }
      return undefined;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.value = 0.018;
    gain.connect(context.destination);
    const oscillators = (frequencies[route] || frequencies['/']).map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });
    audioRef.current = { context, gain, oscillators };

    return () => {
      oscillators.forEach((oscillator) => oscillator.stop());
      context.close();
      audioRef.current = null;
    };
  }, [enabled, route]);
}
