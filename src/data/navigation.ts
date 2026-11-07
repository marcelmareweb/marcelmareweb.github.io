export const primaryNavigation = [
  { label: 'How we help', href: '/services/', paths: ['/services'] },
  {
    label: 'Workshops & learning',
    href: '/learning/',
    paths: ['/learning', '/workshops', '/courses'],
  },
  { label: 'Work & research', href: '/work/', paths: ['/work', '/cases'] },
  { label: 'Thinking', href: '/thinking/', paths: ['/thinking'] },
  { label: 'About', href: '/about', paths: ['/about'] },
] as const;

export const normalisePath = (path: string) => path.replace(/\/$/, '') || '/';

export function navigationState(path: string, item: (typeof primaryNavigation)[number]) {
  const current = normalisePath(path);
  return {
    exact: current === normalisePath(item.href),
    active: item.paths.some((prefix) => current === prefix || current.startsWith(prefix + '/')),
  };
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export function breadcrumbsFor(path: string): Breadcrumb[] {
  const current = normalisePath(path);
  const home = { label: 'Home', href: '/' };
  const learning = { label: 'Workshops & learning', href: '/learning/' };
  const work = { label: 'Work & research', href: '/work/' };
  const thinking = { label: 'Thinking', href: '/thinking/' };
  const known: Record<string, Breadcrumb[]> = {
    '/services': [home, { label: 'How we help' }],
    '/learning': [home, { label: learning.label }],
    '/work': [home, { label: work.label }],
    '/contact': [home, { label: 'Let’s talk' }],
    '/workshops': [home, learning, { label: 'Custom decision workshops' }],
    '/workshops/strategic-design-leadership': [home, learning, { label: 'Executive masterclass' }],
    '/courses': [home, learning, { label: 'Solar learning case' }],
    '/about': [home, { label: 'About' }],
    '/thinking': [home, { label: thinking.label }],
    '/thinking/strategic-decision-maps/strategy-illusion': [
      home,
      thinking,
      { label: 'The Strategy Illusion' },
    ],
  };
  if (current.startsWith('/cases/')) return [home, work, { label: current.startsWith('/cases/policy-analyst-strategic-review') ? 'Teaching scenario' : 'Case account' }];
  return known[current] ?? [];
}
