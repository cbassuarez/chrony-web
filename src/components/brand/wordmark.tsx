import type React from 'react';
import { cn } from '@/lib/cn';

interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className }: WordmarkProps): React.JSX.Element {
  return (
    <span className={cn('chrony-wordmark normal-case font-semibold tracking-tight text-inherit', className)}>
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
