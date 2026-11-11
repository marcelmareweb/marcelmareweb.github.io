export const services = [
  {
    id: 'strategic-decision-design',
    interest: 'strategic-decision',
    number: '01',
    title: 'Strategic Decision Design.',
    problem: 'Twelve priorities is another word for none.',
    question: 'What are you willing to stop doing?',
    description:
      'Every yes costs something you only notice later. We put the costs on the table while you can still change your mind.',
    output: 'One choice, the reasons for it, and a short list of what you’ve agreed not to do.',
    work: [
      'Frame the question and the constraints.',
      'Compare alternatives and make trade-offs explicit.',
      'Assign responsibility and the evidence that would prompt a review.',
    ],
    evidence: {
      label: 'Open the solar investment case',
      href: '/work/#solar',
      note: 'Educational simulation / No outcome claim',
    },
  },
  {
    id: 'behavioural-design',
    interest: 'behavioural-design',
    number: '02',
    title: 'Behavioural Design.',
    problem: 'The campaign landed. The habit stayed.',
    question: 'What makes the old way easier than the new one?',
    description:
      'People rarely resist a plan. They do what’s easier, more normal or more noticed. We start where the behaviour happens, not where it was decided. Our cookstove research began with fresh bread, not a safety lecture.',
    output: 'What actually gets in the way, and small changes worth testing.',
    work: [
      'Observe behaviour in its actual context.',
      'Examine motivations, incentives and practical barriers.',
      'Develop and assess interventions against the question being investigated.',
    ],
    evidence: {
      label: 'Examine the cookstove research',
      href: '/work/#research',
      note: 'Research / Qualified findings',
    },
  },
  {
    id: 'human-ai-decision-design',
    interest: 'human-ai',
    number: '03',
    title: 'Human–AI Decision Design.',
    problem: 'If AI does the work, what are you doing?',
    question: 'Where must people decide, review, challenge or stop an action?',
    description:
      'As machines do more of the work, the valuable part is knowing who decides, who checks and who can say stop. We draw those lines with you before something goes wrong.',
    output: 'Who decides, who reviews, and who answers for the result.',
    work: [
      'Identify consequential choices in the workflow.',
      'Define what AI may recommend and where human review is required.',
      'Clarify who can authorise, challenge or stop an action.',
    ],
    evidence: {
      label: 'Read the Creative x AI workshop account',
      href: '/cases/creative-x-ai-workshop',
      note: 'Case account / One workshop session',
    },
  },
] as const;

export const publicResources = {
  course: 'https://thespottedape.com/Courses/solar-investment/learn/',
  alternativeCourse: 'https://marcelmare.com/dla-course-2/',
  research: 'https://thespottedape.com/research/index.html',
  essay: 'https://thespottedape.com/posts/substack/2026-02-14-the-laboratory-fallacy.html',
  biography: 'https://marcelmare.com',
} as const;
