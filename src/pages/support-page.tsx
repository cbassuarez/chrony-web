import type React from 'react';
import { Activity, Mail, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { Accordion } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById, supportEmail, supportFaq } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function SupportPage(): React.JSX.Element {
  const meta = routeMetaById.support;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-line bg-panel">
        <ChronyShader intensity="mono" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-24 md:pb-12 md:pt-28">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-ink md:text-5xl">Support</h1>
              <p className="max-w-3xl text-[15px] leading-8 text-muted">
                For help with sign-in, sync, subscriptions, or account deletion, contact Stage Devices support.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${supportEmail}`} className={cn(buttonVariants({ variant: 'default' }), 'inline-flex')}>
                  Email {supportEmail}
                </a>
                <Link to="/status" className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex')}>
                  Open public status page
                </Link>
              </div>
            </div>

            <Card className="bg-page/84 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Wrench className="size-4" /> Fastest route to resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[13px] leading-7 text-muted">
                Include reproduction steps, exact timestamps, app version, device model, and OS version so support can
                trace sync and diagnostics events immediately.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" /> Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[13px] text-muted">
            <p>Email support and include reproduction steps plus diagnostics to speed up resolution.</p>
            <a href={`mailto:${supportEmail}`} className={buttonVariants({ variant: 'default' })}>
              Email {supportEmail}
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5" /> Service status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[13px] text-muted">
            <p>Check current incidents, maintenance windows, and uptime history.</p>
            <Link to="/status" className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex')}>
              Open public status page
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="size-5" /> Diagnostics checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="text-[13px] leading-7 text-muted">
          Include app version, device model, OS version, locale, sign-in state, subscription state, and the exact time
          of failure. chrony can copy support diagnostics from the in-app support area.
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-3xl font-semibold text-ink">Frequently asked questions</h2>
        <Accordion items={supportFaq} />
      </section>
    </div>
  );
}
