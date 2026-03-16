import type React from 'react';
import { ExternalLink } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById, statusPageUrl } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function StatusPage(): React.JSX.Element {
  const meta = routeMetaById.status;
  usePageMeta(meta);

  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold text-ink md:text-5xl">Status</h1>
        <p className="max-w-3xl text-[15px] leading-8 text-muted">
          Live service status is embedded below from Better Stack. If your browser blocks embedded content, open the
          status page directly.
        </p>
        <a href={statusPageUrl} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}>
          Open status page directly <ExternalLink className="size-4" />
        </a>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Live service status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-standard border border-line bg-page">
            <iframe
              src={statusPageUrl}
              title="chrony service status"
              className="h-[80vh] min-h-[640px] w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
