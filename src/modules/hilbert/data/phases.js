export const narrativePhases = [
  {
    id: 'finite',
    title: 'Finite intuition',
    equation: '10 rooms. 10 guests.',
    narration: 'Every room is occupied.',
    revelation: 'A full hotel has no space.',
  },
  {
    id: 'arrival',
    title: 'One new guest arrives',
    equation: '10 + 1 ?',
    narration: 'A new guest appears at the desk.',
    revelation: 'How can a full hotel accept one more?',
  },
  {
    id: 'shift',
    title: 'The first paradox',
    equation: 'n -> n + 1',
    narration: 'Move every guest one room forward.',
    revelation: 'The hotel was full. Yet room 1 is now free.',
  },
  {
    id: 'double',
    title: 'Infinitely many guests',
    equation: 'n -> 2n',
    narration: 'Send every current guest to an even-numbered room.',
    revelation: 'Every odd-numbered room is now free.',
  },
  {
    id: 'cinematic',
    title: 'Infinity breaks intuition',
    equation: '|N| = |2N|',
    narration: 'The even rooms are as numerous as all rooms.',
    revelation: 'Infinity can absorb infinity.',
  },
  {
    id: 'buses',
    title: 'Infinite buses',
    equation: 'room = 2^bus x (2seat - 1)',
    narration: 'Now infinitely many buses arrive, each with infinitely many guests.',
    revelation: 'Infinite sets violate finite intuition.',
  },
];
