export type Award = {
  id: string
  name: string
  levelId?: string
  isCompleter?: boolean
  blurb: string
}

export const AWARDS: Award[] = [
  {
    id: 'explorer',
    name: 'The Explorer',
    levelId: 'anveshan',
    blurb: 'For opening the first gate of inquiry.',
  },
  {
    id: 'bridge',
    name: 'The Bridge',
    levelId: 'nagar',
    blurb: 'For walking between cities, kingdoms and travellers.',
  },
  {
    id: 'scholar',
    name: 'The Scholar',
    levelId: 'jijnasa',
    blurb: 'For following questions into mathematics and the sky.',
  },
  {
    id: 'weaver',
    name: 'The Weaver',
    levelId: 'karigari',
    blurb: 'For seeing knowledge in material, craft and design.',
  },
  {
    id: 'keeper',
    name: 'The Keeper',
    levelId: 'yatra',
    blurb: 'For tracing water, ships, rivers and routes.',
  },
  {
    id: 'completer',
    name: 'The Acomplisher',
    levelId: 'pratiksha',
    isCompleter: true,
    blurb: 'For finishing the journey and carrying a lesson forward.',
  },
]
