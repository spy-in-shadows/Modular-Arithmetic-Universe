export function reverseChildren(value) {
  const children = [value * 2];
  const candidate = (value - 1) / 3;
  if (Number.isInteger(candidate) && candidate > 1 && candidate % 2 === 1) children.push(candidate);
  return children;
}

export function buildReverseTree(depth = 6) {
  const nodes = [{ value: 1, depth: 0, x: 0.5, y: 0.08 }];
  let frontier = [nodes[0]];
  for (let level = 1; level <= depth; level += 1) {
    const next = [];
    frontier.forEach((node, index) => {
      reverseChildren(node.value).forEach((value, childIndex) => {
        const spread = 1 / (2 ** level + 1);
        const x = Math.min(0.95, Math.max(0.05, node.x + (childIndex ? 1 : -1) * spread * (index + 1)));
        const child = { value, depth: level, x, y: 0.08 + level * 0.13, parent: node.value };
        nodes.push(child);
        next.push(child);
      });
    });
    frontier = next.slice(0, 24);
  }
  return nodes;
}
