/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      colors: {
        cosmic: {
          ink: '#020617',
          panel: 'rgba(255, 255, 255, 0.08)',
        },
      },
      boxShadow: {
        cyanGlow: '0 0 32px rgba(34, 211, 238, 0.28)',
        violetGlow: '0 0 42px rgba(139, 92, 246, 0.26)',
        goldGlow: '0 0 30px rgba(250, 204, 21, 0.18)',
      },
    },
  },
  plugins: [],
};
