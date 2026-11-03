// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://marcelmareweb.github.io',
	integrations: [sitemap({
		// Working pages stay out of search: the style guide and the lab prototype are noindex.
		filter: (page) => !page.includes('/style-guide/') && !page.includes('/lab/'),
	}), mdx()],
});
