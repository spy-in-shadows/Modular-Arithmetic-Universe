export function detectCollisions(people) {
  const groups = new Map();
  people.forEach((person) => {
    const group = groups.get(person.birthday) || [];
    group.push(person);
    groups.set(person.birthday, group);
  });

  const clusters = [...groups.values()].filter((group) => group.length > 1);
  const collidingIds = new Set(clusters.flat().map((person) => person.id));
  return { clusters, collidingIds };
}

export function pairCount(count) {
  return (count * (count - 1)) / 2;
}
