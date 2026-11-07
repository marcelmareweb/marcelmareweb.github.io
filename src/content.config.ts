import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { substackLoader } from './lib/substack-loader';
import { enquiryInterests, type EnquiryInterest } from './lib/contact';

// Two case formats: the original engagement account, and the five-part format for research
// and workshops (challenge, investigation, designed experience, what was seen, what remains uncertain).
const caseAccount = z.object({
  format: z.literal('account'),
  slug: z.string(),
  title: z.string(),
  clientContext: z.string(),
  pattern: z.string(),
  intervention: z.string(),
  shift: z.string(),
  result: z.string(),
  quote: z.string(),
  timeframe: z.string(),
  featured: z.boolean(),
  /** A fictional teaching scenario, not an account of a real engagement. */
  scenario: z.boolean().default(false),
});

const caseFivePart = z.object({
  format: z.literal('five-part'),
  slug: z.string(),
  title: z.string(),
  evidenceType: z.string(),
  context: z.string(),
  role: z.string(),
  question: z.string(),
  challenge: z.string(),
  investigation: z.string(),
  designedExperience: z.string(),
  reported: z.string(),
  observed: z.string(),
  uncertain: z.string(),
  interest: z.enum(enquiryInterests.map(({ id }) => id) as [EnquiryInterest, ...EnquiryInterest[]]),
  service: z.string(),
  featured: z.boolean(),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.discriminatedUnion('format', [caseAccount, caseFivePart]),
});

const insights = defineCollection({
  loader: substackLoader(),
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    readingTime: z.string(),
    excerpt: z.string(),
    substackUrl: z.string(),
    tags: z.array(z.string()),
    isFallback: z.boolean(),
  }),
});

export const collections = { cases, insights };
