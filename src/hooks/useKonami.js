import { useEffect, useState } from 'react';

const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function useKonami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer = [];
    const handleKeyDown = (event) => {
      buffer = [...buffer, event.key].slice(-sequence.length);
      if (sequence.every((key, index) => key === buffer[index])) {
        setActive((value) => !value);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return active;
}
