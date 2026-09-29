import { useEffect } from 'react';

const SITE = 'https://danhemsley.com';

/**
 * Site-wide head tags. Figma Make publishes through its own index.html
 * template, which only fills in the title and language, so every other tag is
 * created here if the template doesn't provide it.
 */
const SITE_TAGS: [kind: 'meta' | 'link', key: string, keyValue: string, attr: string, value: string][] = [
  ['link', 'rel', 'icon', 'href', '/favicon.svg'],
  ['meta', 'name', 'author', 'content', 'Dan Hemsley'],
  ['meta', 'name', 'theme-color', 'content', '#ffffff'],
  ['meta', 'property', 'og:type', 'content', 'website'],
  ['meta', 'property', 'og:site_name', 'content', 'Dan Hemsley'],
  ['meta', 'property', 'og:image', 'content', `${SITE}/og-image.jpg`],
  ['meta', 'property', 'og:image:width', 'content', '1200'],
  ['meta', 'property', 'og:image:height', 'content', '630'],
  ['meta', 'name', 'twitter:card', 'content', 'summary_large_image'],
];

/** Sets the title, description, canonical URL and Open Graph tags for the current route. */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const html = document.documentElement;
    // Figma's template can leave the lang attribute as an unfilled placeholder.
    if (!html.lang || html.lang.includes('figma')) html.lang = 'en-GB';

    document.title = title;
    for (const [kind, key, keyValue, attr, value] of SITE_TAGS) upsert(kind, key, keyValue, attr, value);
    upsert('meta', 'name', 'description', 'content', description);
    upsert('link', 'rel', 'canonical', 'href', SITE + path);
    upsert('meta', 'property', 'og:title', 'content', title);
    upsert('meta', 'property', 'og:description', 'content', description);
    upsert('meta', 'property', 'og:url', 'content', SITE + path);
  }, [title, description, path]);
}

/** Updates the matching <meta>/<link> in <head>, creating it if it doesn't exist. */
function upsert(kind: 'meta' | 'link', key: string, keyValue: string, attr: string, value: string) {
  let el = document.head.querySelector(`${kind}[${key}="${keyValue}"]`);
  if (!el) {
    el = document.createElement(kind);
    el.setAttribute(key, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}
