import type React from 'react';
import { productSnapshots, type ProductSnapshotAsset, type ProductSnapshotId } from '@/content/media';
import { cn } from '@/lib/cn';

interface ProductSnapshotGridProps {
  ids: ProductSnapshotId[];
  className?: string;
}

function snapshotAspect(snapshot: ProductSnapshotAsset): string {
  switch (snapshot.device) {
    case 'mac':
      return 'aspect-[3/2]';
    case 'ipad':
      return 'aspect-[3/4]';
    case 'iphone':
      return 'aspect-[9/19]';
  }
}

export function ProductSnapshotGrid({ ids, className }: ProductSnapshotGridProps): React.JSX.Element {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {ids.map((id) => {
        const snapshot = productSnapshots[id];
        return (
          <figure key={snapshot.id} className="rounded-standard border border-line bg-row p-3">
            <div className={cn('overflow-hidden rounded-compact border border-line bg-page', snapshotAspect(snapshot))}>
              <img src={snapshot.src} alt={snapshot.alt} loading="lazy" className="h-full w-full object-contain object-center" />
            </div>
            <figcaption className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted">{snapshot.label}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
