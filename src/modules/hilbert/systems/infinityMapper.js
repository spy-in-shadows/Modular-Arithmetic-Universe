const smallPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];

export function mapRoom(roomId, eventType) {
  if (eventType === 'one') return roomId + 1;
  if (eventType === 'infinite') return roomId * 2;
  if (eventType === 'buses') {
    const bus = ((roomId - 1) % 4) + 1;
    const seat = Math.floor((roomId - 1) / 4) + 1;
    return 2 ** bus * (2 * seat - 1);
  }
  if (eventType === 'prime') return smallPrimes[(roomId - 1) % smallPrimes.length];
  return roomId;
}

export function describeOccupancy(roomId, eventType, progress) {
  if (eventType === 'one' && roomId === 1 && progress > 0.12 && progress < 0.72) return false;
  if (eventType === 'infinite' && progress > 0.58) return roomId % 2 === 0;
  if (eventType === 'prime' && progress > 0.58) return smallPrimes.includes(roomId);
  return true;
}
