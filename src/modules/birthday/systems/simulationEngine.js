import { birthdayProbability } from '../../../utils/math';

function hasCollision(count) {
  const seen = new Set();
  for (let i = 0; i < count; i += 1) {
    const day = Math.floor(Math.random() * 365);
    if (seen.has(day)) return true;
    seen.add(day);
  }
  return false;
}

export function runSimulations(count, peopleCount) {
  let collisions = 0;
  for (let i = 0; i < count; i += 1) {
    collisions += Number(hasCollision(peopleCount));
  }
  return {
    runs: count,
    collisions,
    theoretical: birthdayProbability(peopleCount),
  };
}
