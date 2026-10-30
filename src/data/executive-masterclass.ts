export interface MasterclassDay {
  id: string;
  number: string;
  letter: string;
  stage: string;
  focus: string;
  cardQuestion: string;
  question: string;
  problem: string;
  tool: string;
  morningTitle: string;
  afternoonTitle: string;
  morning: string;
  afternoon: string;
  outputName: string;
  output: string;
}

export const masterclassDays: MasterclassDay[] = [
  {
    id: 'explorer',
    number: '01',
    letter: 'E',
    stage: 'Explorer',
    focus: 'Market Discovery & Option Space Mapping',
    cardQuestion: 'What does success mean for this organisation?',
    question: 'What does success mean for this organisation?',
    problem:
      'Leadership teams frequently confuse operational performance with market success, overlooking emerging customer needs and competitive disruption.',
    tool: 'AI Opportunity Landscape Mapper',
    morningTitle: 'Read the signals.',
    afternoonTitle: 'Frame the opportunities.',
    morning:
      'AI-assisted horizon scanning, competitor intelligence and identification of weak market signals.',
    afternoon:
      'Customer hypothesis development, AI-assisted exploration and evaluation of emerging strategic opportunities.',
    outputName: 'Opportunity Landscape',
    output:
      'A prioritised Opportunity Landscape identifying promising strategic arenas, supporting evidence and critical assumptions.',
  },
  {
    id: 'practitioner',
    number: '02',
    letter: 'P',
    stage: 'Practitioner',
    focus: 'Strategic Prototyping & Scenario Testing',
    cardQuestion: 'Why will customers choose us over alternatives?',
    question: 'Why will customers choose us over alternatives?',
    problem:
      'Strategies are frequently built on assumptions about customer preference and competitive advantage that remain untested.',
    tool: 'LLM-Driven Scenario Stress-Tester',
    morningTitle: 'Make the hypothesis testable.',
    afternoonTitle: 'Challenge the scenario.',
    morning: 'Translate strategic hypotheses into testable value propositions and scenarios.',
    afternoon:
      'Use AI-assisted adversarial testing to examine competitive responses, operational constraints and strategic vulnerabilities.',
    outputName: 'Strategic Hypothesis & Scenario Assessment',
    output:
      'A Strategic Hypothesis and Scenario Assessment documenting alternative pathways, assumptions, risks and evidence requirements.',
  },
  {
    id: 'integrator',
    number: '03',
    letter: 'I',
    stage: 'Integrator',
    focus: 'Cross-Functional Alignment & Capability Orchestration',
    cardQuestion: 'What must we be able to do exceptionally well?',
    question: 'What must the organisation be able to do exceptionally well?',
    problem:
      'Strategic choices fail when organisational capabilities, incentives and responsibilities remain disconnected.',
    tool: 'Enterprise Alignment & Friction Matrix',
    morningTitle: 'Map the friction.',
    afternoonTitle: 'Coordinate the work.',
    morning: 'Map organisational capabilities, dependencies and conflicting performance measures.',
    afternoon:
      'Design cross-functional coordination mechanisms and appropriate human–AI workflows.',
    outputName: 'Enterprise Alignment Map',
    output:
      'An Enterprise Alignment Map defining critical capabilities, dependencies, responsibilities and organisational friction points.',
  },
  {
    id: 'architect',
    number: '04',
    letter: 'A',
    stage: 'Architect',
    focus: 'Strategic Choice Cascades & Business Architecture',
    cardQuestion: 'Where will we compete—and where will we not?',
    question: 'Where will we compete—and where will we not?',
    problem:
      'Organisations accumulate initiatives and plans without making explicit strategic choices or accepting meaningful trade-offs.',
    tool: 'Strategy Cascade & Capability Weaver',
    morningTitle: 'Choose where to play.',
    afternoonTitle: 'Connect choices to capabilities.',
    morning: 'Define where to play, how to win and which activities to discontinue.',
    afternoon:
      'Connect strategic choices to organisational capabilities, resource allocation and implementation priorities.',
    outputName: 'Strategic Choice Cascade',
    output:
      'A Strategic Choice Cascade documenting the organisation’s winning aspiration, competitive choices, capability requirements and exclusions.',
  },
  {
    id: 'steward',
    number: '05',
    letter: 'S',
    stage: 'Steward',
    focus: 'Governance, Guardrails & Strategic Accountability',
    cardQuestion: 'How will we govern decisions and sustain advantage?',
    question: 'How will we govern decisions and sustain advantage?',
    problem:
      'Increasing organisational and technological capabilities create new accountability, governance and strategic risks.',
    tool: 'AI & Strategic Risk Governance Matrix',
    morningTitle: 'Locate accountability.',
    afternoonTitle: 'Design the review.',
    morning:
      'Evaluate strategic risks, AI governance requirements, accountability and decision rights.',
    afternoon: 'Establish decision processes, performance measures and review mechanisms.',
    outputName: 'Executive Strategy Dossier & Governance Charter',
    output:
      'An Executive Strategy Dossier and Governance Charter integrating the five days’ strategic decisions.',
  },
];

export const masterclassTitle = 'Strategic Design Leadership in the Age of AI';
