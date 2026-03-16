import type React from 'react';
import { ExternalLink, Laptop, Smartphone, Tablet } from 'lucide-react';
import { ProductSnapshotGrid } from '@/components/brand/product-snapshot-grid';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { appStoreBadgeHref, appStoreBadgeImageUrl, appStoreUrl, routeMetaById } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function DownloadPage(): React.JSX.Element {
  const meta = routeMetaById.download;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold text-ink md:text-5xl">Download chrony</h1>
        <p className="max-w-2xl text-[15px] leading-8 text-muted">
          chrony is available from the App Store with a single listing for iPhone, iPad, and Mac.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-ink">Product snapshots</h2>
        <ProductSnapshotGrid ids={['iphoneWarm', 'ipadWarm', 'macWarm']} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>App Store</CardTitle>
          <CardDescription>Install the latest public build from Apple&apos;s App Store listing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open App Store listing"
            className={cn(buttonVariants({ size: 'lg' }), 'inline-flex gap-2')}
          >
            Open App Store listing <ExternalLink className="size-4" />
          </a>

          <a href={appStoreBadgeHref} style={{ display: 'inline-block' }}>
            <img
              src={appStoreBadgeImageUrl}
              alt="Download on the App Store"
              style={{ width: '246px', height: '82px', verticalAlign: 'middle', objectFit: 'contain' }}
            />
          </a>

          <ul className="grid gap-3 text-sm text-muted md:grid-cols-3">
            <li className="rounded-standard border border-line bg-row p-4">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-compact border border-line bg-page">
                <Smartphone className="size-4 text-ink" />
              </div>
              iPhone support
            </li>
            <li className="rounded-standard border border-line bg-row p-4">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-compact border border-line bg-page">
                <Tablet className="size-4 text-ink" />
              </div>
              iPad support
            </li>
            <li className="rounded-standard border border-line bg-row p-4">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-compact border border-line bg-page">
                <Laptop className="size-4 text-ink" />
              </div>
              Mac support
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
