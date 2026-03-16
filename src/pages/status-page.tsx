import type React from 'react';
import { Activity, ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById, statusPageUrl, supportEmail } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function StatusPage(): React.JSX.Element {
  const meta = routeMetaById.status;
  usePageMeta(meta);

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-line bg-panel">
      <ChronyShader intensity="hero" />
      <div className="relative z-10 mx-auto min-h-[calc(100vh-10rem)] max-w-6xl space-y-6 px-6 pb-10 pt-24 md:pb-12 md:pt-28">
        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Service health</p>
          <h1 className="text-4xl font-semibold text-ink md:text-5xl">Production status and incident timeline</h1>
          <p className="max-w-4xl text-[15px] leading-8 text-muted">
            This page mirrors the live Better Stack status feed for chrony. For active incidents, updates are posted
            on the embedded timeline as mitigation and recovery progress changes.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={statusPageUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'default' }), 'inline-flex gap-2')}
            >
              Open status page directly <ExternalLink className="size-4" />
            </a>
            <a href={`mailto:${supportEmail}`} className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}>
              Contact support <Mail className="size-4" />
            </a>
          </div>
        </section>

        <section
          aria-label="Live status timeline"
          className="overflow-hidden rounded-standard border border-line bg-page/95 shadow-card backdrop-blur-md"
        >
          <iframe
            src={statusPageUrl}
            title="chrony service status"
            className="h-[1200px] w-full md:h-[1320px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            scrolling="no"
          />
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <Card className="bg-page/88 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="size-4" /> Live telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[13px] leading-7 text-muted">
              Uptime, incidents, and recovery notes are published from the status backend in real time.
            </CardContent>
          </Card>

          <Card className="bg-page/88 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="size-4" /> Transparent updates
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[13px] leading-7 text-muted">
              Each incident update includes active investigation, mitigation progress, and resolved state.
            </CardContent>
          </Card>

          <Card className="bg-page/88 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="size-4" /> Escalation path
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[13px] leading-7 text-muted">
              If an issue is not reflected here, send diagnostics and incident timing to {supportEmail}.
            </CardContent>
          </Card>
        </section>

        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader className="space-y-3">
            <CardTitle>Monitoring scope</CardTitle>
            <p className="max-w-4xl text-[13px] leading-7 text-muted">
              Status coverage spans user-visible availability, realtime transport health, data integrity checks, and
              release pipeline signals so outages and degradations are surfaced quickly with clear impact context.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-compact border border-line bg-page/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Core platform</p>
                <ul className="mt-2 space-y-1 text-[13px] leading-7 text-muted">
                  <li>Sync API uptime and p95 latency tracking</li>
                  <li>Auth/session verification for signed-in pad access</li>
                  <li>Snapshot write and restore health probes</li>
                </ul>
              </div>
              <div className="rounded-compact border border-line bg-page/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Realtime and delivery</p>
                <ul className="mt-2 space-y-1 text-[13px] leading-7 text-muted">
                  <li>Websocket connect, reconnect, and message flow checks</li>
                  <li>Website edge uptime, TLS, and DNS availability</li>
                  <li>Deployment pipeline and post-release smoke monitoring</li>
                </ul>
              </div>
            </div>
            <p className="text-[12px] leading-6 text-muted">
              Alerts are configured for sustained impact thresholds, and incident updates are published with current
              investigation status, mitigation progress, and recovery confirmation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
