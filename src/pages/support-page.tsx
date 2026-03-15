import type React from 'react';
import { Mail, Wrench } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById, supportEmail, supportFaq } from '@/content/site';
import { usePageMeta } from '@/lib/seo';

export function SupportPage(): React.JSX.Element {
  const meta = routeMetaById.support;
  usePageMeta(meta);

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Support</h1>
        <p className="max-w-3xl text-base leading-8 text-muted">
          For help with sign-in, sync, subscriptions, or account deletion, contact Stage Devices support.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Mail className="size-5" /> Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted">
          <p>Email support and include reproduction steps plus diagnostics to speed up resolution.</p>
          <a href={`mailto:${supportEmail}`} className={buttonVariants()}>
            Email {supportEmail}
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Wrench className="size-5" /> Diagnostics checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-muted">
          Include app version, device model, OS version, locale, sign-in state, subscription state, and the exact time
          of failure. chrony can copy support diagnostics from the in-app support area.
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="font-serif text-3xl text-ink">Frequently asked questions</h2>
        <Accordion items={supportFaq} />
      </section>
    </div>
  );
}
