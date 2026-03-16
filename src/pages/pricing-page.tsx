import type React from 'react';
import { ArrowRight, CircleCheckBig, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { Wordmark, renderWordmarkCopy } from '@/components/brand/wordmark';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  appStoreBadgeHref,
  appStoreBadgeImageUrl,
  appStoreUrl,
  deriveProPricingValues,
  proPricingContent,
  routeMetaById,
  supportEmail,
} from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const proUnlocks = [
  'Restore exact timeline points when you need to roll back safely.',
  'Run sanitize and validate passes before sharing technical snippets.',
  'Pin known-good snapshots for repeat workflows and handoffs.',
  'Use deeper language workflow controls beyond baseline AUTO mode.',
  'Escalate faster with diagnostics context designed for support triage.',
] as const;

const freeVsProRows = [
  {
    outcome: 'Timeline restore depth',
    free: 'Current state only',
    pro: 'Restore from timeline snapshots',
  },
  {
    outcome: 'Sanitize and validate tools',
    free: 'Not included',
    pro: 'Built-in sanitize and validate passes',
  },
  {
    outcome: 'Pinned snapshot recall',
    free: 'Not included',
    pro: 'Pin and revisit known-good states',
  },
  {
    outcome: 'Language workflow control',
    free: 'Baseline AUTO workflow',
    pro: 'Advanced language workflow options',
  },
  {
    outcome: 'Support diagnostics context',
    free: 'Manual details collection',
    pro: 'Structured diagnostics for faster escalation',
  },
] as const;

function formatUsd(valueInCents: number): string {
  return usdFormatter.format(valueInCents / 100);
}

export function PricingPage(): React.JSX.Element {
  const meta = routeMetaById.pricing;
  const monthlyPlan = proPricingContent.plans.monthly;
  const annualPlan = proPricingContent.plans.annual;
  const derivedPricing = deriveProPricingValues(proPricingContent);

  usePageMeta(meta);

  return (
    <div className="space-y-10">
      <section
        data-header-wordmark="light"
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-line bg-[#111217]"
      >
        <ChronyShader intensity="obsidian" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-20 md:pt-28">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <div className="space-y-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                <Wordmark className="text-white" /> pro
              </p>
              <h1 className="text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
                Pricing for deeper writing and recovery workflows.
              </h1>
              <p className="max-w-3xl text-[15px] leading-8 text-white/90 md:text-[17px]">
                {renderWordmarkCopy(
                  'chrony Pro is designed for users who need stronger timeline control, cleaner technical output, and faster support escalation when precision matters.',
                )}
              </p>
              <p className="text-sm font-medium text-white/85">{proPricingContent.trustLine}</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'inline-flex gap-2')}
                >
                  Open App Store listing <ExternalLink className="size-4" />
                </a>
                <Link to="/download" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex gap-2')}>
                  View download options <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <Card className="bg-page/84 backdrop-blur-md">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl">Why teams choose Pro</CardTitle>
                <CardDescription className="text-[13px] leading-7">
                  Outcome-focused tools for technical writing, revision safety, and support-ready diagnostics.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-[13px] leading-7 text-muted">
                {proUnlocks.slice(0, 3).map((value) => (
                  <p key={value} className="flex items-start gap-2">
                    <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-rowBorder" />
                    <span>{renderWordmarkCopy(value)}</span>
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-ink">Choose your Pro plan</h2>
          <p className="max-w-3xl text-[14px] leading-7 text-muted">
            Annual includes a {annualPlan.trialLabel} intro and saves {derivedPricing.annualSavingsPercent}% versus paying monthly for a full year.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-page/88 backdrop-blur-md">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{monthlyPlan.label}</CardTitle>
                <Badge>{proPricingContent.storefrontCurrencyCode}</Badge>
              </div>
              <p className="text-4xl font-semibold text-ink">
                {formatUsd(monthlyPlan.priceUsdCents)}
                <span className="ml-1 text-base font-medium text-muted">/{monthlyPlan.cadence.replace('per ', '')}</span>
              </p>
              <CardDescription className="text-[13px] leading-7">{renderWordmarkCopy(monthlyPlan.description)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}
              >
                {monthlyPlan.ctaLabel} <ExternalLink className="size-4" />
              </a>
              <p className="text-[12px] leading-6 text-muted">
                Good for trying Pro flexibility with month-to-month billing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-rowBorder bg-page shadow-[0_20px_40px_-30px_hsl(var(--ink)/0.52)]">
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>{annualPlan.label}</CardTitle>
                <div className="flex items-center gap-2">
                  {annualPlan.recommended ? <Badge variant="accent">Recommended</Badge> : null}
                  {annualPlan.trialLabel ? <Badge>{annualPlan.trialLabel}</Badge> : null}
                </div>
              </div>
              <p className="text-4xl font-semibold text-ink">
                {formatUsd(annualPlan.priceUsdCents)}
                <span className="ml-1 text-base font-medium text-muted">/{annualPlan.cadence.replace('per ', '')}</span>
              </p>
              <CardDescription className="text-[13px] leading-7">{renderWordmarkCopy(annualPlan.description)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: 'default' }), 'inline-flex gap-2')}
              >
                {annualPlan.ctaLabel} <ExternalLink className="size-4" />
              </a>
              <div className="rounded-compact border border-line bg-row p-3 text-[12px] leading-6 text-muted">
                <p>Equivalent to {formatUsd(derivedPricing.monthlyEquivalentUsdCents)}/month.</p>
                <p>
                  Save {derivedPricing.annualSavingsPercent}% ({formatUsd(derivedPricing.annualSavingsUsdCents)}) compared with 12 monthly renewals.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">What Pro unlocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-[13px] leading-7 text-muted">
            {proUnlocks.map((feature) => (
              <p key={feature} className="flex items-start gap-2">
                <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-rowBorder" />
                <span>{renderWordmarkCopy(feature)}</span>
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Free vs Pro</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[12px] leading-6 text-muted">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-[0.12em]">
                  <th className="py-2 pr-3 font-semibold text-muted">Outcome</th>
                  <th className="py-2 pr-3 font-semibold text-muted">Free</th>
                  <th className="py-2 font-semibold text-muted">Pro</th>
                </tr>
              </thead>
              <tbody>
                {freeVsProRows.map((row) => (
                  <tr key={row.outcome} className="border-b border-line last:border-b-0">
                    <td className="py-2.5 pr-3 text-ink">{row.outcome}</td>
                    <td className="py-2.5 pr-3">{row.free}</td>
                    <td className="py-2.5">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="size-5" /> Billing clarity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[13px] leading-7 text-muted">
            {proPricingContent.disclosures.map((disclosure) => (
              <p key={disclosure.id}>{disclosure.body}</p>
            ))}
            <p>
              Need policy details? Review <Link to="/terms" className="underline underline-offset-4">Terms</Link> and{' '}
              <Link to="/privacy" className="underline underline-offset-4">Privacy</Link>.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="size-5" /> Renewal and trial FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[13px] leading-7 text-muted">
            {proPricingContent.faq.map((item) => (
              <article key={item.question}>
                <h3 className="font-semibold text-ink">{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="bg-page/88 backdrop-blur-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Install Pro through the App Store</CardTitle>
          <CardDescription className="text-[13px] leading-7">
            {renderWordmarkCopy(
              `Pricing shown uses ${proPricingContent.storefrontLabel} (${proPricingContent.storefrontCurrencyCode}) as an example. Open the listing to confirm local storefront pricing and trial availability.`,
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'inline-flex gap-2')}
          >
            Download <Wordmark /> and view Pro plans <ExternalLink className="size-4" />
          </a>
          <Link to="/download" className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex gap-2')}>
            Open download page <ArrowRight className="size-4" />
          </Link>
          <a href={`mailto:${supportEmail}`} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'inline-flex gap-2')}>
            Contact support
          </a>
          <a href={appStoreBadgeHref} target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
            <img
              src={appStoreBadgeImageUrl}
              alt="Download on the App Store"
              style={{ width: '246px', height: '82px', verticalAlign: 'middle', objectFit: 'contain' }}
            />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
