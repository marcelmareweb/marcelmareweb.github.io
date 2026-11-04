import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET({ site }: APIContext) {
  const siteURL = (site ?? new URL('https://marcelmareweb.github.io')).origin;
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

- [How we help](${siteURL}/services/)
- [Workshops & learning](${siteURL}/learning/)
- [Custom decision workshops](${siteURL}/workshops)
- [Executive masterclass](${siteURL}/workshops/strategic-design-leadership/)
- [Self-paced solar learning case](${siteURL}/courses)
- [Contact](${siteURL}/contact/)
- [Work and research](${siteURL}/work/)
- [Strategic Thinking](${siteURL}/thinking/)
- [The Strategy Illusion quadrant map](${siteURL}/thinking/strategic-decision-maps/strategy-illusion/)
- [About](${siteURL}/about)

## Latest Substack Dispatches

${latestInsights.map(({ data }) => `- [${data.title}](${data.substackUrl}) (${data.pubDate})`).join('\n')}

## Contact

- Email: [hello@thespottedape.com](mailto:hello@thespottedape.com)
- Website: [${siteURL}](${siteURL})
- Privacy: [${siteURL}/privacy](${siteURL}/privacy)
- Terms: [${siteURL}/terms](${siteURL}/terms)
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
