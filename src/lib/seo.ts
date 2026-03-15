import { useEffect } from 'react';

const SITE_URL = 'https://chronyapp.com';

interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
}

function ensureMeta(name: string, attr: 'name' | 'property' = 'name'): HTMLMetaElement {
  const selector = `meta[${attr}="${name}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) return existing;
  const meta = document.createElement('meta');
  meta.setAttribute(attr, name);
  document.head.appendChild(meta);
  return meta;
}

function ensureCanonical(): HTMLLinkElement {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (existing) return existing;
  const link = document.createElement('link');
  link.rel = 'canonical';
  document.head.appendChild(link);
  return link;
}

export function absoluteCanonical(path: string): string {
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}

export function usePageMeta(meta: PageMeta): void {
  useEffect(() => {
    document.title = meta.title;

    const canonical = ensureCanonical();
    const canonicalHref = absoluteCanonical(meta.canonicalPath);
    canonical.href = canonicalHref;

    ensureMeta('description').content = meta.description;

    ensureMeta('og:type', 'property').content = 'website';
    ensureMeta('og:site_name', 'property').content = 'chrony';
    ensureMeta('og:title', 'property').content = meta.title;
    ensureMeta('og:description', 'property').content = meta.description;
    ensureMeta('og:url', 'property').content = canonicalHref;
    ensureMeta('og:image', 'property').content = `${SITE_URL}/og-image.svg`;

    ensureMeta('twitter:card').content = 'summary_large_image';
    ensureMeta('twitter:title').content = meta.title;
    ensureMeta('twitter:description').content = meta.description;
    ensureMeta('twitter:image').content = `${SITE_URL}/og-image.svg`;
  }, [meta]);
}

export function enforceApexCanonicalHost(): void {
  if (typeof window === 'undefined') return;
  if (window.location.hostname !== 'www.chronyapp.com') return;

  const target = `https://chronyapp.com${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.replace(target);
}
