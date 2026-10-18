import { file, glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { substackLoader } from './lib/substack-loader';

const stages = defineCollection({
  loader: file('src/data/stages.json'),
  schema: z.object({
    order: z.number(),
    stageNumber: z.string(),
    title: z.string(),
    automationLevel: z.string(),
    summary: z.string(),
    primaryRisk: z.string(),
    humanCheckpoint: z.string(),
    workshopDeliverable: z.string(),
  }),
});

const pillars = defineCollection({
  loader: file('src/data/pillars.json'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    foundation: z.string(),
    outcome: z.string(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
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
  }),
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

export const collections = { stages, pillars, cases, insights };