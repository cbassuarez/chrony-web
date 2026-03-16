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
      <div className="relative z-10 mx-auto min-h-[calc(100vh-10rem)] max-w-6xl space-y-6 px-6 py-10 md:py-12">
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

        <Card className="bg-page/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Embedded Better Stack status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-[13px] text-muted">
              If your browser blocks embedded content, use the direct status link above.
            </p>
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

        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Monitoring scope</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-[13px] leading-7 text-muted">
              <li>Sync API availability and latency</li>
              <li>Websocket connectivity for live pad updates</li>
              <li>Snapshot write and restore health checks</li>
              <li>Website and deployment pipeline uptime</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
