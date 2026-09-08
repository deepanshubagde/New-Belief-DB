import { PromptGroup, DesignRule } from '../types';

export const PROMPTS: PromptGroup[] = [
  {
    cat: 'ABOUT POSSIBILITY',
    color: 'var(--detect)',
    prompts: [
      "I can't achieve this because...",
      "The reason this hasn't happened yet is...",
      "This goal is unrealistic because...",
      "People like me don't...",
    ],
  },
  {
    cat: 'ABOUT DESERVING',
    color: 'var(--detect)',
    prompts: [
      "I don't deserve this because...",
      "If I get this, people will think...",
      "I'm not the kind of person who...",
      "Success will mean I have to...",
    ],
  },
  {
    cat: 'ABOUT SAFETY',
    color: 'var(--detect)',
    prompts: [
      "If I achieve this, I'm afraid that...",
      "The worst thing that could happen is...",
      "What I'll have to give up is...",
      "The person who would be upset is...",
    ],
  },
];

export const LOGIC_QS: string[] = [
  'Is this belief 100% true, always, in every case, for every person?',
  'What evidence do I have that this is NOT true?',
  "Who in the world has achieved this despite believing they couldn't?",
  'If my best friend had this belief, what would I tell them?',
  'What has this belief cost me so far in years, money, relationships, peace?',
  'If I keep this belief for 10 more years, what will my life look like?',
  'Am I willing to pay that price, or am I done?',
];

export const DESIGN_RULES: DesignRule[] = [
  {
    title: 'First Person, Present Tense',
    desc: '"I am capable of..." Not "I will be" or "I hope to." Your nervous system responds to NOW.',
  },
  {
    title: 'Specific, Not Vague',
    desc: '"I attract clients who value transformation." Not "Good things come to me."',
  },
  {
    title: 'Emotionally Charged',
    desc: 'It must create feeling when you say it. Add words like: proud, powerful, worthy, alive.',
  },
  {
    title: 'Identity Based',
    desc: 'Start with "I AM." Not "I can" or "I will" but "I AM." This programmes at identity level.',
  },
  {
    title: 'Believable Stretch',
    desc: "It must stretch you but not break credibility. Stretch, don't snap.",
  },
];

export const BRAND = {
  name: 'Monkhood Club',
  author: 'Deepanshu Bagde',
  methodTitle: '4D Belief Clearing Method™️',
  methodSubtitle: 'Subconscious Reprogramming & Inner Mastery',
  tagline: 'Subconscious Reprogramming Method',
};
