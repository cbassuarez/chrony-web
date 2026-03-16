import type React from 'react';
import { cn } from '@/lib/cn';

interface WordmarkProps {
  className?: string;
  tone?: 'inherit' | 'light' | 'dark';
}

export function Wordmark({ className, tone = 'inherit' }: WordmarkProps): React.JSX.Element {
  const toneClass = tone === 'light' ? 'text-white' : tone === 'dark' ? 'text-ink' : 'text-inherit';

  return (
    <span className={cn('chrony-wordmark normal-case font-semibold tracking-tight', toneClass, className)}>
      chrony
    </span>
  );
}

export function renderWordmarkCopy(copy: string): React.ReactNode {
  const matches = [...copy.matchAll(/\bchrony\b/gi)];
  if (matches.length === 0) {
    return copy;
  }

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    const start = match.index ?? 0;
    if (start > cursor) {
      nodes.push(copy.slice(cursor, start));
    }
    nodes.push(<Wordmark key={`wordmark-${index}`} />);
    cursor = start + match[0].length;
  });

  if (cursor < copy.length) {
    nodes.push(copy.slice(cursor));
  }

  return nodes;
}
