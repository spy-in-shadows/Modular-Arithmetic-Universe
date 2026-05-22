import { assignBirthday, birthdayHue } from './birthdayAssignmentEngine';

export function createPerson(id, width = 1000, height = 700) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(Math.random()) * 0.38;
  const birthday = assignBirthday();
  return {
    id,
    birthday,
    hue: birthdayHue(birthday),
    x: width * (0.5 + Math.cos(angle) * radius),
    y: height * (0.54 + Math.sin(angle) * radius * 0.72),
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    bornAt: performance.now(),
  };
}

export function seedPeople(count, width, height) {
  return Array.from({ length: count }, (_, index) => createPerson(index + 1, width, height));
}
