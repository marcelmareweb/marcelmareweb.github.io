export interface MatrixQuadrant {
  title: string;
  description: string;
  implication: string;
}

export interface StrategicMatrix {
  id: string;
  title: string;
  question: string;
  insight: string;
  xAxis: { label: string; low: string; high: string };
  yAxis: { label: string; low: string; high: string };
  quadrants: Record<'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', MatrixQuadrant>;
  highlight: keyof StrategicMatrix['quadrants'];
}

export const strategyIllusion: StrategicMatrix = {
  id: 'strategy-illusion',
  title: 'The Strategy Illusion',
  question: 'Are you following a strategy, or just a plan?',
  insight: 'Doing the work well does not make the choice right.',
  xAxis: { label: 'Clarity of choice', low: 'Low', high: 'High' },
  yAxis: { label: 'Consistency of action', low: 'Low', high: 'High' },
  quadrants: {
    topLeft: {
      title: 'The Efficient Treadmill',
      description: 'Unclear choices. Consistent action.',
      implication: 'Ask who you serve, why they would choose you and what you will stop doing.',
    },
    topRight: {
      title: 'Coherent Advantage',
      description: 'Clear choices. Consistent action.',
      implication: 'Keep checking whether your choices work as customers and conditions change.',
    },
    bottomLeft: {
      title: 'Strategic Drift',
      description: 'Unclear choices. Inconsistent action.',
      implication: 'Agree who you serve and what you offer, then organise the work around those choices.',
    },
    bottomRight: {
      title: 'Unrealised Strategy',
      description: 'Clear choices. Inconsistent action.',
      implication: 'Make responsibilities clear and give the team what it needs to follow through.',
    },
  },
  highlight: 'topLeft',
};
