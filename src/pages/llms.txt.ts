import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const insights = await getCollection('insights');
  const latestInsights = insights
    .sort((first, second) => Date.parse(second.data.pubDate) - Date.parse(first.data.pubDate))
    .slice(0, 3);

  const markdown = `# The Spotted Ape

Independent strategic decision and behavioural design practice in Cape Town, South Africa.

## Capabilities

- Strategic Decision Design: examine alternatives, assumptions and trade-offs.
- Behavioural Design: identify the conditions preventing intended change.
- Human–AI Decision Design: define decision authority, review points and accountability.

## Website

- [What We Do](https://thespottedape.com/#practice)
- [Work and research](https://thespottedape.com/#evidence)
- [Strategic Thinking](https://thespottedape.com/thinking/)
- [The Strategy Illusion quadrant map](https://thespottedape.com/thinking/strategic-decision-maps/strategy-illusion/)
- [About](https://thespottedape.com/about)

## Latest Substack Dispatches

${latestInsights.map(({ data }) => `- [${data.title}](${data.substackUrl}) (${data.pubDate})`).join('\n')}

## Contact

- Email: [hello@thespottedape.com](mailto:hello@thespottedape.com)
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
