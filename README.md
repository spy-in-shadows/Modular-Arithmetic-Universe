# PARADOXIUM

## Mathematics Beyond Intuition

PARADOXIUM is a cinematic React experience about mathematical truths that feel impossible on first contact. It is designed as an interactive observatory rather than a school-style lesson site: users move through atmospheric worlds, manipulate paradoxes directly, and watch simple rules produce unsettling consequences.

## Vision

The project blends:

- a mathematical museum
- a sci-fi observatory
- an interactive documentary
- a Numberphile-inspired exploration engine

The emotional target is simple:

> This should not be true.

## Worlds

1. **Hilbert's Infinite Hotel**  
   Reassign finite and infinite guests through visible mappings such as `n -> n + 1` and `n -> 2n`.

2. **Banach-Tarski Paradox**  
   A Three.js scene showing abstract decomposition and reassembly while clearly distinguishing mathematical paradox from physical duplication.

3. **Monty Hall**  
   A neon game-show simulator with playable rounds and large-batch simulations showing switching converge toward `2/3`.

4. **Birthday Paradox**  
   A live crowd simulation where shared birthdays ignite visually, paired with exact and approximate probability curves.

5. **Randomness Illusion Lab**  
   A human-generated randomness field compared against true RNG using entropy and clustering measures.

6. **The Collatz Machine**  
   An industrial sequence engine for `3n + 1`, with stopping time, peaks, trajectory visualization, and local worst-case comparison.

7. **Prime Number Observatory**  
   A glowing Ulam spiral with adjustable horizon and zoom, exposing structure inside apparent numerical scatter.

## Screenshots

- `[landing-page-placeholder]`
- `[hilbert-world-placeholder]`
- `[banach-tarski-placeholder]`
- `[monty-hall-placeholder]`
- `[birthday-paradox-placeholder]`
- `[randomness-lab-placeholder]`
- `[collatz-machine-placeholder]`
- `[prime-observatory-placeholder]`

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Canvas API
- Three.js for Banach-Tarski only
- Lucide React icons

## Local Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Preview the production bundle:

```bash
npm run preview
```

## Project Structure

```txt
src/
  app/
  assets/
  components/
  pages/
  modules/
    hilbert/
    banach/
    monty/
    birthday/
    randomness/
    collatz/
    primes/
  hooks/
  utils/
  animations/
  data/
  styles/
  shaders/
```

## Mathematical Inspirations

- David Hilbert and countable infinity
- Banach-Tarski and the axiom of choice
- Marilyn vos Savant's popularization of Monty Hall
- Birthday collision probability
- Human randomness bias experiments
- The unresolved Collatz conjecture
- Stanislaw Ulam's prime spiral

## Performance Notes

- Worlds are lazy-loaded by route.
- Ambient background motion uses a single lightweight Canvas layer.
- The prime spiral and atmospheric renderers use device-pixel-ratio-aware canvases.
- Expensive computations are memoized where appropriate.
- Heavy visual behavior is intentionally concentrated in one Three.js module.
- Mobile layouts simplify density and preserve interaction without requiring desktop-only hover behavior.

## Easter Eggs

- The Konami code toggles a hidden visual mode.
- Floating equations and route-specific ambient tones hint at deeper layers of the museum.

## Future Improvements

- richer Birthday Paradox histograms and batch simulation overlays
- pseudo-RNG comparison mode in the randomness lab
- prime gap constellations and animated density heatmaps
- Collatz tree explorer and worst-case search controls
- richer sound design with authored ambient loops
- shader-driven dimensional transitions between worlds
