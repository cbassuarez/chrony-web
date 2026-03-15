import type React from 'react';
import { ExternalLink, Smartphone, Tablet, Laptop } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { appStoreUrl, routeMetaById } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function DownloadPage(): React.JSX.Element {
  const meta = routeMetaById.download;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Download chrony</h1>
        <p className="max-w-2xl text-base leading-8 text-muted">
          chrony is available from the App Store with a single listing for iPhone, iPad, and Mac.
        </p>
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
            className={cn(buttonVariants({ size: 'lg' }), 'inline-flex gap-2')}
          >
            Open App Store listing <ExternalLink className="size-4" />
          </a>
          <ul className="grid gap-3 text-sm text-muted md:grid-cols-3">
            <li className="rounded-xl border border-line bg-page/70 p-4">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-line/40">
                <Smartphone className="size-4 text-ink" />
              </div>
              iPhone support
            </li>
            <li className="rounded-xl border border-line bg-page/70 p-4">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-line/40">
                <Tablet className="size-4 text-ink" />
              </div>
              iPad support
            </li>
            <li className="rounded-xl border border-line bg-page/70 p-4">
              <div className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-line/40">
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
