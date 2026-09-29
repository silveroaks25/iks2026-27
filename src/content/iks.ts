export type GradeId = '5-6' | '7-8' | '9-10' | '11-12'

export type TaskKind = 'text' | 'blanks' | 'checks' | 'triple' | 'final'

export type Task = {
  id: string
  kind: TaskKind
  prompt: string
  blanks?: string[]
  options?: string[]
  otherLabel?: string
  followUps?: string[]
  lines?: number
}

export type Video = {
  id: string
  title: string
  duration?: string
  url?: string
  note?: string
  optionalGroup?: string
}

export type Level = {
  id: string
  number: number
  name: string
  english: string
  title: string
  subtitle: string
  paragraphs: string[]
  videos: Video[]
  tasks: Record<GradeId, Task[]>
  extra?: Task[]
  awardId: string
  architectureNote?: string
}

export const GRADE_LABELS: { id: GradeId; label: string }[] = [
  { id: '5-6', label: 'Grades 5–6' },
  { id: '7-8', label: 'Grades 7–8' },
  { id: '9-10', label: 'Grades 9–10' },
  { id: '11-12', label: 'Grades 11–12' },
]

export const HOME = {
  kicker: 'A BLAST FROM OUR PAST',
  title: 'Exploring Indian Knowledge Systems!',
  tagline: 'Look Back. Think Deep. Imagine Forward.',
  paragraphs: [
    'India has a long and diverse history of people observing their surroundings, asking questions, finding solutions and passing their learning from one generation to another.',
    'During this journey, you will explore some of these ideas through a collection of videos. You will come across ancient cities, universities, mathematics, astronomy, languages, textiles, architecture, water management, maritime trade and much more.',
    "As you watch, don't worry about remembering every detail.",
    'Instead, try to notice how people thought, what problems they were trying to solve, what they observed and how their knowledge was used.',
  ],
}

function yt(id: string, start?: number) {
  return start
    ? `https://www.youtube.com/watch?v=${id}&t=${start}s`
    : `https://www.youtube.com/watch?v=${id}`
}

export const LEVELS: Level[] = [
  {
    id: 'anveshan',
    number: 1,
    name: 'What do we know?',
    english: 'The quest begins',
    title: 'What do we know?',
    subtitle: 'What do we mean by Indian Knowledge Systems?',
    awardId: 'explorer',
    paragraphs: [
      'We often use the word ‘knowledge’. But where does knowledge come from? How is it preserved? How does it travel from one generation to another?',
    ],
    videos: [
      {
        id: 'l1v1',
        title: 'Understanding of IKS | Indian Knowledge System | English',
        duration: '8:15',
        url: yt('r6jiJkEN58U', 180),
      },
      { id: 'l1v2', title: 'Historical Overview' },
      { id: 'l1v3', title: 'What exactly are Vedas?', duration: '11:15' },
      {
        id: 'l1v4',
        title: "Takshashila & Nalanda: The Story of Ancient India's Great Universities",
        duration: '9:56',
      },
      {
        id: 'l1v5',
        title: 'How Sanskrit Built the Foundations of Half the Languages on Earth',
        duration: '11:43',
      },
    ],
    tasks: {
      '5-6': [
        {
          id: 'l1g56a',
          kind: 'text',
          prompt:
            'After watching the videos, write two things that you now understand about Indian Knowledge Systems.',
        },
        {
          id: 'l1g56b',
          kind: 'text',
          prompt:
            'Choose one of these—Vedas, Nalanda, Takshashila or Sanskrit. What interested you about it?',
        },
        {
          id: 'l1g56c',
          kind: 'text',
          prompt:
            'Imagine you are a student in an ancient centre of learning. What would you like to learn, and who would you want to learn it from?',
        },
      ],
      '7-8': [
        {
          id: 'l1g78a',
          kind: 'text',
          prompt:
            'The videos show different ways in which knowledge was developed and passed on. Give one example.',
        },
        {
          id: 'l1g78b',
          kind: 'text',
          prompt:
            'Why do you think language and oral traditions were important in preserving knowledge?',
        },
        {
          id: 'l1g78c',
          kind: 'text',
          prompt:
            'If you could ask a scholar from Takshashila or Nalanda one question, what would you ask?',
        },
      ],
      '9-10': [
        {
          id: 'l1g910a',
          kind: 'text',
          prompt:
            'What do the examples of Takshashila, Nalanda, Sanskrit and the Vedic tradition tell us about the ways in which knowledge was preserved and shared?',
        },
        {
          id: 'l1g910b',
          kind: 'text',
          prompt:
            'Why is it important to understand how knowledge was developed, rather than simply memorising what was known?',
        },
        {
          id: 'l1g910c',
          kind: 'text',
          prompt:
            'When you come across a claim about ancient Indian knowledge, what would you look for before accepting it as reliable?',
        },
      ],
      '11-12': [
        {
          id: 'l1g1112a',
          kind: 'text',
          prompt:
            'How do language, institutions and methods of transmission influence the survival of knowledge?',
        },
        {
          id: 'l1g1112b',
          kind: 'text',
          prompt:
            'Why might oral transmission be both a strength and a challenge when preserving knowledge over long periods?',
        },
        {
          id: 'l1g1112c',
          kind: 'text',
          prompt:
            'In your view, what is the difference between preserving knowledge and keeping knowledge alive?',
        },
      ],
    },
  },
  {
    id: 'nagar',
    number: 2,
    name: 'What was India Like?',
    english: 'Cities & travellers',
    title: 'What was India Like?',
    subtitle: 'Cities, kingdoms and the people who visited India',
    awardId: 'bridge',
    paragraphs: [
      'History does not come to us in one neat package. We learn about the past through buildings, inscriptions, objects, writings and the accounts of people who lived in or travelled through different places.',
    ],
    videos: [
      {
        id: 'l2v1',
        title: 'Forgotten Kingdoms That Ruled Ancient India',
        duration: '12:17',
      },
      {
        id: 'l2v2',
        title:
          'This Is What Ancient Indian Cities Looked Like | Bharat Bioscope with Palki Sharma | IGR',
        duration: '14:44',
      },
      {
        id: 'l2v3',
        title:
          'How Did Foreign Travellers See Ancient India? | Bharat Bioscope with Palki Sharma | IGR',
        duration: '11:22',
      },
      {
        id: 'l2v4',
        title: 'What did Megasthenes see in India?',
        duration: '1:56',
        optionalGroup: 'Optional: Meet the Travellers',
      },
      {
        id: 'l2v5',
        title: 'What did Marco Polo see in India?',
        duration: '1:27',
        optionalGroup: 'Optional: Meet the Travellers',
      },
      {
        id: 'l2v6',
        title: 'This Chinese Monk Visited India Almost 1,400 Years Ago',
        duration: '1:25',
        optionalGroup: 'Optional: Meet the Travellers',
      },
      {
        id: 'l2v7',
        title: "Arabian Traveller's Accounts of Ancient India",
        duration: '1:08',
        optionalGroup: 'Optional: Meet the Travellers',
      },
    ],
    tasks: {
      '5-6': [
        {
          id: 'l2g56a',
          kind: 'text',
          prompt: 'What was one thing about an ancient Indian city or kingdom that surprised you?',
        },
        {
          id: 'l2g56b',
          kind: 'text',
          prompt:
            'Think about a city you know today. Write one thing it has in common with an ancient city and one thing that is different.',
        },
        {
          id: 'l2g56c',
          kind: 'text',
          prompt:
            'If you were visiting India hundreds of years ago, what three things would you be curious to see?',
        },
      ],
      '7-8': [
        {
          id: 'l2g78a',
          kind: 'text',
          prompt:
            'Choose one feature of an ancient Indian city. What does it tell you about the people who lived there?',
        },
        {
          id: 'l2g78b',
          kind: 'text',
          prompt: "Why might a traveller's description be useful to someone studying the past?",
        },
        {
          id: 'l2g78c',
          kind: 'text',
          prompt:
            'Two travellers may visit India and write very different descriptions. Give one possible reason.',
        },
      ],
      '9-10': [
        {
          id: 'l2g910a',
          kind: 'text',
          prompt:
            'What can features such as roads, drainage, houses, water systems and public spaces tell us about an ancient society?',
        },
        {
          id: 'l2g910b',
          kind: 'text',
          prompt:
            "A traveller's account is a source of information, but it is not necessarily the complete picture. What should a historian consider before using it as evidence?",
        },
        {
          id: 'l2g910c',
          kind: 'text',
          prompt:
            'If you were researching an ancient Indian city, what sources other than a traveller\'s account would you use?',
        },
      ],
      '11-12': [
        {
          id: 'l2g1112a',
          kind: 'text',
          prompt: 'Why does the background of a traveller matter when interpreting their account?',
        },
        {
          id: 'l2g1112b',
          kind: 'text',
          prompt:
            'Suppose a traveller describes an Indian city as prosperous and well organised. How would you try to verify the description?',
        },
        {
          id: 'l2g1112c',
          kind: 'text',
          prompt: 'What can we learn from combining different kinds of evidence about the past?',
        },
      ],
    },
  },
  {
    id: 'jijnasa',
    number: 3,
    name: 'How did they know?',
    english: 'How ideas arrive',
    title: 'How did they know?',
    subtitle: 'How did people arrive at new ideas?',
    awardId: 'scholar',
    paragraphs: [
      'The people and ideas in these videos remind us that many discoveries begin with something quite simple—a question, an observation or a problem that needs solving.',
    ],
    videos: [
      {
        id: 'l3v1',
        title: "The World's Oldest Record for the Number Zero",
        duration: '1:23',
      },
      { id: 'l3v2', title: 'Aryabhatta: Documentary', duration: '7:30' },
      {
        id: 'l3v3',
        title: 'Contributions of India in Astronomy',
        duration: '10:29',
      },
      {
        id: 'l3v4',
        title:
          'Ep 6: The Inventions India Gave the World | Bharat Bioscope with Palki Sharma | India Global Review',
        duration: '11:26',
      },
    ],
    tasks: {
      '5-6': [
        {
          id: 'l3g56a',
          kind: 'text',
          prompt:
            'Choose one idea from mathematics or astronomy that you found interesting. What did you learn about it?',
        },
        {
          id: 'l3g56b',
          kind: 'text',
          prompt:
            'Imagine studying the sky without a telescope, satellite or computer. What would you have to observe carefully?',
        },
        {
          id: 'l3g56c',
          kind: 'text',
          prompt:
            'If you could give an ancient astronomer one modern piece of technology, what would you give them? What would they use it for?',
        },
      ],
      '7-8': [
        {
          id: 'l3g78a',
          kind: 'text',
          prompt:
            'Choose one contribution made by Aryabhata, Brahmagupta or another scholar mentioned in the videos. Why was it useful?',
        },
        {
          id: 'l3g78b',
          kind: 'text',
          prompt:
            "How could people learn about the movement of the Sun, Moon and stars without today's technology?",
        },
        {
          id: 'l3g78c',
          kind: 'text',
          prompt:
            'What is one question about Indian mathematics or astronomy that you would like to find the answer to?',
        },
      ],
      '9-10': [
        {
          id: 'l3g910a',
          kind: 'text',
          prompt:
            'Choose one idea from the videos. What role did observation and reasoning play in developing it?',
        },
        {
          id: 'l3g910b',
          kind: 'text',
          prompt: 'Why does a claim about an ancient scientific achievement need evidence?',
        },
        {
          id: 'l3g910c',
          kind: 'text',
          prompt:
            'What does the development of mathematics and astronomy tell us about the importance of curiosity?',
        },
      ],
      '11-12': [
        {
          id: 'l3g1112a',
          kind: 'text',
          prompt:
            'Choose one contribution discussed in the videos and trace how observation, reasoning and mathematical thinking could contribute to the development of such knowledge.',
        },
        {
          id: 'l3g1112b',
          kind: 'text',
          prompt:
            'Select one claim from a video that you found particularly interesting. What evidence would you examine before accepting it?',
        },
        {
          id: 'l3g1112c',
          kind: 'text',
          prompt:
            'Scientific knowledge can be refined or changed when new evidence becomes available. Why is this important?',
        },
      ],
    },
  },
  {
    id: 'karigari',
    number: 4,
    name: 'How did they use it?',
    english: 'Making & material knowledge',
    title: 'How did they use it?',
    subtitle: 'Building, making, designing and creating',
    awardId: 'weaver',
    paragraphs: [
      'Knowledge is not always found in books. Sometimes it can be seen in a building, a piece of metal, a textile, a tool or a craft.',
      'Look closely at the materials, techniques and skills behind what you see.',
    ],
    videos: [
      {
        id: 'l4v1',
        title: 'IKS in Architecture: Ancient Wisdom for Sustainable Living | NLD',
        duration: '42:07',
        note: '(For Grades 9–12)',
      },
      {
        id: 'l4v2',
        title: 'The Rust-Proof Iron Pillar | India’s 1600-Year-Old Scientific Wonder!',
        duration: '5:27',
      },
      {
        id: 'l4v3',
        title: 'How Indian Cotton Fuelled the Industrial Revolution | Storybook by InHERIT',
        duration: '7:11',
      },
      {
        id: 'l4v4',
        title: 'Traditional Art Forms of India',
        duration: '11:40',
      },
      {
        id: 'l4v5',
        title:
          'Ep 6: The Inventions India Gave the World | Bharat Bioscope with Palki Sharma | India Global Review',
        duration: '11:26',
      },
    ],
    tasks: {
      '5-6': [
        {
          id: 'l4g56a',
          kind: 'text',
          prompt:
            'Choose one building, object, textile or art form from the videos. What did you find interesting about it?',
        },
        {
          id: 'l4g56b',
          kind: 'text',
          prompt: 'What skills would someone need to make or create it?',
        },
        {
          id: 'l4g56c',
          kind: 'text',
          prompt: 'Find one traditional craft or art form from your own state. What makes it special?',
        },
      ],
      '7-8': [
        {
          id: 'l4g78a',
          kind: 'blanks',
          prompt: 'Choose one example from the videos and complete:',
          blanks: ['Material used:', 'Skill/technique:', 'Purpose:'],
        },
        {
          id: 'l4g78b',
          kind: 'text',
          prompt:
            'What can a traditional craft or textile tell us about the people and place where it developed?',
        },
        {
          id: 'l4g78c',
          kind: 'text',
          prompt:
            'If you could meet the person who developed or practised the technique, what would you ask?',
        },
      ],
      '9-10': [
        {
          id: 'l4g910a',
          kind: 'text',
          prompt:
            'Choose one example and explain how knowledge of materials, environment or technique contributed to its development.',
        },
        {
          id: 'l4g910b',
          kind: 'text',
          prompt:
            'What does the story of Indian cotton tell us about the relationship between craft, trade and industrialisation?',
        },
        {
          id: 'l4g910c',
          kind: 'text',
          prompt:
            'Choose one traditional technique. How could modern technology help it survive or develop further?',
        },
      ],
      '11-12': [
        {
          id: 'l4g1112a',
          kind: 'text',
          prompt:
            'What is the relationship between practical experience and formal knowledge in the examples shown?',
        },
        {
          id: 'l4g1112b',
          kind: 'text',
          prompt:
            'The Iron Pillar is popularly described as “rust-proof”. Why would a scientist investigate the reasons for its unusual corrosion resistance rather than simply accept the label?',
        },
        {
          id: 'l4g1112c',
          kind: 'text',
          prompt: 'Choose one traditional practice and suggest a contemporary use for it.',
        },
      ],
    },
  },
  {
    id: 'yatra',
    number: 5,
    name: 'How were we connected?',
    english: 'Water, ships & routes',
    title: 'How were we connected?',
    subtitle: 'How did people respond to their surroundings?',
    awardId: 'keeper',
    paragraphs: [
      'The examples in these videos are very different—a stepwell, a ship, a river and a trade route.',
      'But they have something in common.',
      'People had to understand their surroundings and use that understanding to meet their needs.',
    ],
    videos: [
      {
        id: 'l5v1',
        title: 'Unraveling the MYSTERIES of Ancient Indian STEPWELLS',
        duration: '9:38',
      },
      {
        id: 'l5v2',
        title: "Cholas: The Force Behind India's First Naval Fleet",
      },
      {
        id: 'l5v3',
        title: 'How the Cholas Became a Maritime Power',
        duration: '1:37',
      },
      {
        id: 'l5v4',
        title:
          "Why India's Rise Runs Through the Indian Ocean | Bharat Bioscope with Palki Sharma | IGR",
        duration: '11:50',
      },
      {
        id: 'l5v5',
        title: 'How India’s Spice Route Inspired G20 Corridor',
        duration: '9:34',
      },
      {
        id: 'l5v6',
        title: 'How the Ahoms Repelled a Mighty Mughal Armada',
      },
    ],
    tasks: {
      '5-6': [
        {
          id: 'l5g56a',
          kind: 'text',
          prompt:
            'Why were stepwells important in places where water was not easily available throughout the year?',
        },
        {
          id: 'l5g56b',
          kind: 'text',
          prompt:
            'Imagine travelling by sea hundreds of years ago. What three things would you need to know?',
        },
        {
          id: 'l5g56c',
          kind: 'text',
          prompt:
            'Which example from these videos—stepwells, ships, rivers or trade routes—interested you most? Why?',
        },
      ],
      '7-8': [
        {
          id: 'l5g78a',
          kind: 'text',
          prompt: "What does the design of a stepwell tell us about people's understanding of water?",
        },
        {
          id: 'l5g78b',
          kind: 'text',
          prompt: 'What kinds of knowledge would sailors need before travelling across the sea?',
        },
        {
          id: 'l5g78c',
          kind: 'text',
          prompt:
            'In the story of the Ahoms, how did knowledge of the local river and surroundings help them?',
        },
      ],
      '9-10': [
        {
          id: 'l5g910a',
          kind: 'text',
          prompt:
            'Choose either the stepwell, Chola maritime activity or Ahom strategy. Explain how understanding the physical environment helped people solve a problem.',
        },
        {
          id: 'l5g910b',
          kind: 'text',
          prompt:
            "Why has the Indian Ocean been important for India's trade and connections with other parts of the world?",
        },
        {
          id: 'l5g910c',
          kind: 'text',
          prompt:
            'Choose one traditional idea from these videos that could be useful in addressing a present-day problem.',
        },
      ],
      '11-12': [
        {
          id: 'l5g1112a',
          kind: 'text',
          prompt:
            'Compare the stepwell with either Chola maritime activity or Ahom strategy. What does each example tell us about the relationship between geography and human action?',
        },
        {
          id: 'l5g1112b',
          kind: 'text',
          prompt:
            "How have water, geography and trade influenced India's connections with the wider world?",
        },
        {
          id: 'l5g1112c',
          kind: 'text',
          prompt:
            'Choose one traditional system and suggest how it could be adapted to address a contemporary challenge.',
        },
      ],
    },
  },
  {
    id: 'pratiksha',
    number: 6,
    name: 'What can we learn?',
    english: 'Looking back',
    title: 'What can we learn?',
    subtitle: 'What do we take with us?',
    awardId: 'completer',
    paragraphs: [
      'You have now travelled through different examples of Indian knowledge—from learning and language to cities, science, craft, water, oceans and trade.',
      'Take a few minutes to look back at your journey.',
    ],
    videos: [],
    tasks: {
      '5-6': [
        {
          id: 'l6g56a',
          kind: 'text',
          prompt: 'The most surprising thing I learnt was:',
        },
        {
          id: 'l6g56b',
          kind: 'text',
          prompt: 'One idea from the past that is still useful today is:',
        },
        {
          id: 'l6g56c',
          kind: 'text',
          prompt: 'If I could improve one old idea using modern technology, I would:',
        },
      ],
      '7-8': [
        {
          id: 'l6g78a',
          kind: 'text',
          prompt: 'One example that showed me how people solved a problem was:',
        },
        {
          id: 'l6g78b',
          kind: 'text',
          prompt: 'Something I now understand differently about knowledge from the past is:',
        },
        {
          id: 'l6g78c',
          kind: 'text',
          prompt: "One idea I would like to see adapted for today's world is:",
        },
      ],
      '9-10': [
        {
          id: 'l6g910a',
          kind: 'checks',
          prompt: 'Looking across the videos, I noticed that knowledge often developed through:',
          options: [
            'Observation',
            'Curiosity',
            'Experience',
            'Experimentation',
            'Reasoning',
            'Need',
          ],
          otherLabel: 'Other:',
          followUps: ['Explain your choice:'],
        },
        {
          id: 'l6g910b',
          kind: 'text',
          prompt: 'One historical achievement I appreciate more after this journey is:',
        },
        {
          id: 'l6g910c',
          kind: 'text',
          prompt: 'One thing I would still want to verify or investigate is:',
        },
        {
          id: 'l6g910d',
          kind: 'text',
          prompt: 'One idea from the past that could be reimagined for the future is:',
        },
      ],
      '11-12': [
        {
          id: 'l6g1112a',
          kind: 'triple',
          prompt:
            'Looking across the six sections, identify three features that repeatedly appear in the development of knowledge.',
          lines: 3,
          followUps: ['Explain why you chose them:'],
        },
        {
          id: 'l6g1112b',
          kind: 'text',
          prompt: 'One idea from the videos that I would like to investigate further is:',
        },
        {
          id: 'l6g1112c',
          kind: 'text',
          prompt:
            'One traditional idea that could be adapted to address a contemporary challenge is:',
        },
      ],
    },
    extra: [
      {
        id: 'l6final',
        kind: 'final',
        prompt: 'One final thought',
        followUps: [
          'The past is valuable not only because of what people knew, but also because of how they observed, questioned, created and solved problems.',
          "What is one lesson from India's knowledge traditions that you would like to carry into the future?",
        ],
      },
    ],
  },
]

export const JOURNEY_LEVELS = LEVELS.filter((l) => l.number <= 5)
export const FINAL_LEVEL = LEVELS.find((l) => l.id === 'pratiksha')!
