export const hotelEvents = {
  idle: {
    equation: 'ℵ₀',
    insight: 'Every room is occupied.',
    revelation: 'Yet infinity still has space.',
  },
  one: {
    label: 'Add Guest',
    equation: 'n -> n + 1',
    insight: 'One new guest enters because every current guest can shift one room forward.',
    revelation: 'Infinity can absorb one more without growing.',
  },
  infinite: {
    label: 'Add Infinite Guests',
    equation: 'n -> 2n',
    insight: 'Move each existing guest to an even room. Every odd room becomes available.',
    revelation: '|N| = |2N|',
  },
  buses: {
    label: 'Add Infinite Buses',
    equation: 'room = 2^bus x (2seat - 1)',
    insight: 'Each bus and seat pair receives a unique room. Infinity can index infinities.',
    revelation: 'Infinity has levels.',
  },
  prime: {
    label: 'Prime Remap',
    equation: 'guest(n) -> prime(n)',
    insight: 'The same countable crowd can be scattered into prime-numbered rooms.',
    revelation: 'Sparse does not mean smaller.',
  },
};
