export const enquiryInterests = [
  {
    id: 'strategic-decision',
    value: 'Strategic Decision Design',
    label: 'Strategic Decision Design',
  },
  {
    id: 'behavioural-design',
    value: 'Behavioural Design & Research',
    label: 'Behavioural Design & Research',
  },
  { id: 'human-ai', value: 'Human–AI Decision Design', label: 'Human–AI Decision Design' },
  { id: 'workshop', value: 'Strategic Decision Workshop', label: 'Custom decision workshop' },
  { id: 'masterclass', value: 'Executive Masterclass', label: 'Five-day executive masterclass' },
  { id: 'course', value: 'Strategy Course (DLA)', label: 'Solar learning case / Team session' },
  {
    id: 'advisory',
    value: 'Executive Advisory Conversation',
    label: 'Executive advisory conversation',
  },
] as const;

export type EnquiryInterest = (typeof enquiryInterests)[number]['id'];

export const courseModuleNames = [
  'Understand',
  'Spreadsheet Essentials',
  'Build',
  'Test',
  'Decide',
  'Reflect',
] as const;

export interface ContactOptions {
  interest?: EnquiryInterest;
  day?: string;
  module?: string;
  audience?: 'individual' | 'team';
  source?: string;
}

export function contactHref(options: ContactOptions = {}): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    if (value) params.set(key, value);
  }
  return '/contact/' + (params.size ? '?' + params.toString() : '');
}
