import type React from 'react';
import { ExternalLink, HeartPulse } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { heartbeatSuggestions, routeMetaById, statusPageUrl } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function StatusPage(): React.JSX.Element {
  const meta = routeMetaById.status;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-4xl font-semibold text-ink md:text-5xl">Status and heartbeats</h1>
        <p className="max-w-3xl text-[15px] leading-8 text-muted">
          Public incident and uptime timeline is hosted on Better Stack. Recommended heartbeat monitors below are tuned
          for chrony sync and billing paths.
        </p>
        <a
          href={statusPageUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'inline-flex gap-2')}
        >
          Open Better Stack status page <ExternalLink className="size-4" />
        </a>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="size-5" /> Recommended Better Stack heartbeats
          </CardTitle>
          <CardDescription>
            Use URL monitors for external checks and Heartbeats for cron/background workers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {heartbeatSuggestions.map((heartbeat) => (
              <li key={heartbeat.name} className="rounded-standard border border-line bg-row p-4">
                <p className="text-sm font-semibold text-ink">{heartbeat.name}</p>
                <p className="mt-1 text-xs text-muted">{heartbeat.cadence}</p>
                <p className="mt-2 text-[13px] text-ink">{heartbeat.target}</p>
                <p className="mt-1 text-[13px] text-muted">{heartbeat.why}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
