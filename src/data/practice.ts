export const services = [
  {
    id: 'strategic-decision-design',
    interest: 'strategic-decision',
    number: '01',
    title: 'Strategic Decision Design.',
    problem: 'Several priorities. One commitment.',
    question: 'Which alternatives deserve comparison, and what are we choosing to leave out?',
    description:
      'When familiar assumptions no longer hold, examine the decision before committing more effort to a plan.',
    output: 'A clearly framed decision, examined assumptions and explicit commitments.',
    work: [
      'Frame the question and the constraints.',
      'Compare alternatives and make trade-offs explicit.',
      'Assign responsibility and the evidence that would prompt a review.',
    ],
    evidence: {
      label: 'Read the policy-analysis case account',
      href: '/cases/policy-analyst-strategic-review',
      note: 'Case account / Reported outcome',
    },
  },
  {
    id: 'behavioural-design',
    interest: 'behavioural-design',
    number: '02',
    title: 'Behavioural Design.',
    problem: 'Agreement has not become action.',
    question: 'Which incentives, barriers and working conditions shape what people actually do?',
    description:
      'Begin with the conditions of real work. Understand motivations and everyday practices before prescribing an intervention.',
    output: 'Research and interventions grounded in the conditions of real work.',
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
    problem: 'AI is entering consequential work.',
    question: 'Where must people decide, review, challenge or stop an action?',
    description:
      'Make decision authority and retained human judgement explicit as AI becomes part of a workflow.',
    output: 'Decision authority, review points and clear responsibility for consequences.',
    work: [
      'Identify consequential choices in the workflow.',
      'Define what AI may recommend and where human review is required.',
      'Clarify who can authorise, challenge or stop an action.',
    ],
    evidence: {
      label: 'Explore a map of strategic choices',
      href: '/thinking/strategic-decision-maps/strategy-illusion/',
      note: 'Thinking / A discussion instrument',
    },
  },
] as const;

export const learningOptions = [
  {
    number: '01',
    type: 'Custom workshop',
    title: 'A live decision. A working session.',
    description:
      'Bring competing perspectives into the same conversation. Examine alternatives, assumptions and responsibility.',
    audience: 'Teams facing a consequential choice',
    format: 'Facilitated / Scope discussed around your decision',
    output: 'A framed decision, explicit trade-offs and ownership.',
    status: 'Discuss a team engagement',
    href: '/workshops',
    action: 'Explore decision workshops',
  },
  {
    number: '02',
    type: 'Executive programme',
    title: 'Strategic Design Leadership in the Age of AI.',
    description:
      'Five strategic questions, from what success means to how decisions are governed. Explore a standalone day or the connected programme.',
    audience: 'Executive leaders, strategy directors and business-unit owners',
    format: 'Five standalone working days / Connected progression',
    output: 'Five executive outputs, including a Strategic Choice Cascade and Governance Charter.',
    status: 'Discuss delivery and attendance options',
    href: '/workshops/strategic-design-leadership/',
    action: 'Explore the five-day masterclass',
  },
  {
    number: '03',
    type: 'Self-paced learning',
    title: 'Should We Invest in Solar?',
    description:
      'Compare three proposals, question the assumptions and defend a recommendation in the fictional Cape Manufacturing case.',
    audience: 'Individual learners, analysts and teams',
    format: '65–80 minutes / Excel & Google Sheets',
    output: 'A working comparison model and a qualified recommendation.',
    status: 'Open the material now / Team sessions by enquiry',
    href: '/courses',
    action: 'Explore the solar learning case',
  },
] as const;

export const publicResources = {
  course: 'https://thespottedape.com/Courses/solar-investment/learn/',
  alternativeCourse: 'https://marcelmare.com/dla-course-2/',
  research: 'https://thespottedape.com/research/index.html',
  essay: 'https://thespottedape.com/posts/substack/2026-02-14-the-laboratory-fallacy.html',
  biography: 'https://marcelmare.com',
} as const;
