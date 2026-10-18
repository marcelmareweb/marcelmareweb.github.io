// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://thespottedape.com',
	integrations: [sitemap(), mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
});
