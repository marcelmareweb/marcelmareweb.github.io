import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const [pillars, stages, cases, insights] = await Promise.all([
    getCollection('pillars'),
    getCollection('stages'),
    getCollection('cases'),
    getCollection('insights'),
  ]);

  const orderedPillars = pillars.sort((first, second) => first.data.order - second.data.order);
  const orderedStages = stages.sort((first, second) => first.data.order - second.data.order);
  const featuredCase = cases.find((caseStudy) => caseStudy.data.featured);
  const latestInsights = insights
    .sort((first, second) => Date.parse(second.data.pubDate) - Date.parse(first.data.pubDate))
    .slice(0, 3);

  const markdown = `# The Spotted Ape — The Visible Agent

> AI literacy, human-in-the-loop strategy, and agentic orchestration for organizations developing professional capability in the age of AI.

## Core Thesis: The Knowledge Work Shift

If AI does the work, what are you doing? Work used to be simple: learn, make, improve, repeat. Now AI does the making. So our roles change from producing work to deciding what matters. The constraint is no longer effort; it is judgment.

## The !Kharos Strategy

The !Kharos Strategy is derived from the Welwitschia mirabilis, a biological metaphor for surviving through wet and dry. In the Namib Desert, where Atlantic fog meets scorching dunes, it represents rhizomatic resilience: staying grounded through structural integrity as conditions change.

A !Kharos practitioner is not overwhelmed by AI, but grounded within it.

### The Three Pillars

${orderedPillars.map(({ data }) => `- **${data.title}:** ${data.description} Foundation: ${data.foundation} Outcome: ${data.outcome}`).join('\n')}

## Agentic Mastery: Five Stages

${orderedStages.map(({ data }) => `- **${data.stageNumber} ${data.title} — ${data.automationLevel}:** ${data.summary}`).join('\n')}

## Studio Services

- AI Agent Design
- Creative Direction
- Strategic Oversight
- System Training

## Latest Substack Dispatches

${latestInsights.map(({ data }) => `- [${data.title}](${data.substackUrl}) (${data.pubDate}, ${data.readingTime}): ${data.excerpt} Topics: ${data.tags.join(', ')}`).join('\n')}

## Featured Case Study

${featuredCase ? `- [${featuredCase.data.title}](https://thespottedape.com/cases/${featuredCase.data.slug}): ${featuredCase.data.clientContext} ${featuredCase.data.result}` : 'Case studies are published on the website as they become available.'}

## Contact

The Spotted Ape (Pty) Ltd is based in Cape Town, South Africa.

- Email: [contact@spottedape.com](mailto:contact@spottedape.com)
- Website: [https://thespottedape.com](https://thespottedape.com)
- Privacy: [https://thespottedape.com/privacy](https://thespottedape.com/privacy)
- Terms: [https://thespottedape.com/terms](https://thespottedape.com/terms)
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
