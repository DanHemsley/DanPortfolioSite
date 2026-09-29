import { useEffect } from 'react';

const SITE = 'https://danhemsley.com';

/** Sets the document title, meta description and canonical URL for the current route. */
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    document.title = title;
    setTag('meta[name="description"]', 'content', description);
    setTag('link[rel="canonical"]', 'href', SITE + path);
    setTag('meta[property="og:title"]', 'content', title);
    setTag('meta[property="og:description"]', 'content', description);
    setTag('meta[property="og:url"]', 'content', SITE + path);
  }, [title, description, path]);
}

function setTag(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}
