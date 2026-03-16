import type React from 'react';
import { ChevronDown } from 'lucide-react';
import { renderWordmarkCopy } from '@/components/brand/wordmark';
import { cn } from '@/lib/cn';
import type { FaqItem } from '@/content/site';

interface AccordionProps {
  items: FaqItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps): React.JSX.Element {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => (
        <details key={item.question} className="group rounded-xl border border-line bg-panel p-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-left font-medium text-ink">
            <span>{renderWordmarkCopy(item.question)}</span>
            <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-sm leading-7 text-muted">{renderWordmarkCopy(item.answer)}</p>
        </details>
      ))}
    </div>
  );
}
