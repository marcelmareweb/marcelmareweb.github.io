import type { Loader } from 'astro/loaders';
import fallbackData from '../data/insights-fallback.json';

interface InsightData {
  title: string;
  pubDate: string;
  readingTime: string;
  excerpt: string;
  substackUrl: string;
  tags: string[];
  isFallback: boolean;
}

interface InsightEntry extends InsightData {
  id: string;
}

const DEFAULT_FEED_URL = 'https://thespottedape.substack.com/feed';
const fallbackEntries = fallbackData as InsightEntry[];

function decodeEntities(value: string): string {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
    const named: Record<string, string> = {
      amp: '&',
      lt: '<',
      gt: '>',
      quot: '"',
      apos: "'",
      nbsp: ' ',
    };
    const normalizedCode = code.toLowerCase();

    if (normalizedCode.startsWith('#x')) {
      const point = Number.parseInt(normalizedCode.slice(2), 16);
      return Number.isFinite(point) && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }
    if (normalizedCode.startsWith('#')) {
      const point = Number.parseInt(normalizedCode.slice(1), 10);
      return Number.isFinite(point) && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    }

    return named[normalizedCode] ?? entity;
  });
}

function unwrapCdata(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
}

function plainText(value: string): string {
  return decodeEntities(unwrapCdata(value))
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, ' ')
    .replace(/<\s*br\s*\/?>/gi, ' ')
    .replace(/<\/(?:p|div|li|h[1-6])\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptFor(value: string): string {
  const text = plainText(value);
  if (text.length <= 210) return text;

  const shortened = text.slice(0, 209).trimEnd();
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 160 ? lastSpace : shortened.length)}…`;
}

function slugFor(title: string, usedIds: Set<string>): string {
  const base = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'dispatch';

  let slug = base;
  let suffix = 2;
  while (usedIds.has(slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  usedIds.add(slug);
  return slug;
}

function elementText(xml: string, tagName: string): string {
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = xml.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}\\s*>`, 'i'));
  return match ? decodeEntities(unwrapCdata(match[1]).trim()) : '';
}

function parseItems(xml: string): InsightEntry[] {
  const usedIds = new Set<string>();
  const entries: InsightEntry[] = [];
  const items = xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item\s*>/gi);

  for (const itemMatch of items) {
    const item = itemMatch[1];
    const title = plainText(elementText(item, 'title'));
    const link = elementText(item, 'link').trim();
    const pubDateValue = elementText(item, 'pubDate');
    const description = elementText(item, 'description');
    const fullArticle = elementText(item, 'content:encoded') || description;

    if (!title || !link) continue;

    let substackUrl: string;
    try {
      const parsedUrl = new URL(link);
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') continue;
      substackUrl = parsedUrl.href;
    } catch {
      continue;
    }

    const parsedDate = new Date(pubDateValue);
    const pubDate = Number.isNaN(parsedDate.valueOf())
      ? new Date().toISOString().slice(0, 10)
      : parsedDate.toISOString().slice(0, 10);
    const articleText = plainText(fullArticle);
    const wordCount = articleText ? articleText.split(/\s+/).length : 0;
    const tags = Array.from(item.matchAll(/<category\b[^>]*>([\s\S]*?)<\/category\s*>/gi))
      .map((category) => plainText(category[1]))
      .filter(Boolean);

    entries.push({
      id: slugFor(title, usedIds),
      title,
      pubDate,
      readingTime: `${Math.max(1, Math.ceil(wordCount / 220))} min read`,
      excerpt: excerptFor(description || fullArticle || title),
      substackUrl,
      tags,
      isFallback: false,
    });
  }

  return entries;
}

export function substackLoader(): Loader {
  return {
    name: 'the-spotted-ape-substack-rss',
    async load({ store, parseData, generateDigest, logger }) {
      let entries: InsightEntry[];
      const feedUrl = import.meta.env.SUBSTACK_FEED_URL || DEFAULT_FEED_URL;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8_000);

      try {
        const response = await fetch(feedUrl, {
          headers: { Accept: 'application/rss+xml, application/xml, text/xml;q=0.9' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Feed request returned HTTP ${response.status}.`);

        const xml = await response.text();
        entries = parseItems(xml);
        if (entries.length === 0) throw new Error('Feed contained no usable RSS items.');
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'Unknown feed error.';
        logger.info(`Substack RSS unavailable (${reason}); using local insight fallback entries.`);
        entries = fallbackEntries;
      } finally {
        clearTimeout(timeout);
      }

      store.clear();
      for (const entry of entries) {
        const { id, ...rawData } = entry;
        const data = await parseData({ id, data: rawData });
        store.set({ id, data, digest: generateDigest(JSON.stringify(entry)) });
      }
    },
  };
}
