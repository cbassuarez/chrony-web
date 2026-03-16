import type React from 'react';
import { ArrowUpRight, CircleCheckBig, ExternalLink, Laptop, ShieldCheck, Smartphone, Tablet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { ProductSnapshotGrid } from '@/components/brand/product-snapshot-grid';
import { Wordmark, renderWordmarkCopy } from '@/components/brand/wordmark';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { appIconAsset, productSnapshotCards } from '@/content/media';
import {
  appStoreBadgeHref,
  appStoreBadgeImageUrl,
  appStoreUrl,
  macAppStoreBadgeImageUrl,
  macAppStoreUrl,
  routeMetaById,
  statusPageUrl,
  supportEmail,
} from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function DownloadPage(): React.JSX.Element {
  const meta = routeMetaById.download;
  usePageMeta(meta);

  const trustHighlights = [
    {
      label: 'Universal app account flow',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ),
    },
    {
      label: 'Live sync + snapshots',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992V4.356m0 4.992-3.181-3.183a8.25 8.25 0 0 0-13.803 3.7M3.977 14.652H.75v4.992h4.992m-4.992-4.992 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7"
          />
        </svg>
      ),
    },
    {
      label: 'No web signup required',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21h-10.5A2.25 2.25 0 0 1 4.5 18.75v-6a2.25 2.25 0 0 1 2.25-2.25Z"
          />
        </svg>
      ),
    },
  ] as const;

  return (
    <div className="space-y-10">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-line bg-panel">
        <ChronyShader intensity="hero" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-20 md:pt-28">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Install <Wordmark />
              </p>
              <h1 className="text-4xl font-semibold leading-[1.05] text-ink md:text-6xl">
                Download on the App Store and Mac App Store.
              </h1>
              <p className="max-w-3xl text-[15px] leading-8 text-muted md:text-[17px]">
                One listing, one shared pad, and one account context across iPhone, iPad, and Mac. Install in seconds,
                sign in with Apple, and pick up where you left off on any device.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'inline-flex gap-2')}
                >
                  Open iPhone and iPad listing <ExternalLink className="size-4" />
                </a>
                <a
                  href={macAppStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex gap-2')}
                >
                  Open Mac App Store listing <ExternalLink className="size-4" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href={appStoreBadgeHref} target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
                  <img
                    src={appStoreBadgeImageUrl}
                    alt="Download on the App Store"
                    style={{ width: '246px', height: '82px', verticalAlign: 'middle', objectFit: 'contain' }}
                  />
                </a>
                <a href={macAppStoreUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
                  <img
                    src={macAppStoreBadgeImageUrl}
                    alt="Download on the Mac App Store"
                    style={{ width: '282px', height: '82px', verticalAlign: 'middle', objectFit: 'contain' }}
                  />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 text-[12px] text-muted">
                {trustHighlights.map((highlight) => (
                  <div key={highlight.label} className="inline-flex w-fit rounded-compact border border-line bg-page/75 px-3 py-2">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="inline-flex size-4 shrink-0 text-muted">{highlight.icon}</span>
                      <span>{highlight.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-page/86 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <img
                    src={appIconAsset.src}
                    alt={appIconAsset.alt}
                  className="size-11 rounded-standard border border-line bg-page object-cover object-center"
                  />
                  <span className="inline-flex items-baseline gap-1">
                    <Wordmark /> synced notepad
                  </span>
                </CardTitle>
                <CardDescription className="text-[13px] leading-7">
                  Writing-first notepad with one continuously available document and synced state across Apple devices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-[13px] leading-7 text-muted">
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <CircleCheckBig className="mt-0.5 size-4 text-rowBorder" />
                    Start writing immediately without project setup.
                  </p>
                  <p className="flex items-start gap-2">
                    <CircleCheckBig className="mt-0.5 size-4 text-rowBorder" />
                    Restore previous states with snapshots and timeline tools.
                  </p>
                  <p className="flex items-start gap-2">
                    <CircleCheckBig className="mt-0.5 size-4 text-rowBorder" />
                    Keep diagnostics and support routing one click away.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={statusPageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex gap-1')}
                  >
                    Live status <ArrowUpRight className="size-4" />
                  </a>
                  <a href={`mailto:${supportEmail}`} className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex gap-1')}>
                    Contact support
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Smartphone className="size-4" /> iPhone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[13px] leading-7 text-muted">
            <p>Capture ideas instantly and keep your shared pad in reach while moving.</p>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}
            >
              Install on iPhone <ExternalLink className="size-4" />
            </a>
          </CardContent>
        </Card>

        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Tablet className="size-4" /> iPad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[13px] leading-7 text-muted">
            <p>Use full-width workspace layouts and keyboard-friendly controls on larger screens.</p>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}
            >
              Install on iPad <ExternalLink className="size-4" />
            </a>
          </CardContent>
        </Card>

        <Card className="bg-page/88 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Laptop className="size-4" /> Mac
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[13px] leading-7 text-muted">
            <p>{renderWordmarkCopy('Stay in flow at desktop scale with chrony’s compact chrome and synced context.')}</p>
            <a
              href={macAppStoreUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}
            >
              Install on Mac <ExternalLink className="size-4" />
            </a>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-ink">Product preview by device</h2>
          <p className="max-w-3xl text-[14px] leading-7 text-muted">
            The same shared pad experience scales from phone to tablet to desktop while preserving sync context and top
            chrome behavior.
          </p>
        </div>
        <ProductSnapshotGrid ids={['iphoneWarm', 'ipadWarm', 'macWarm']} />
      </section>

      <Card className="bg-page/88 backdrop-blur-md">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl">Press images and product captures</CardTitle>
          <CardDescription className="max-w-4xl text-[13px] leading-7">
            Use these screenshots for reviews, launch coverage, and product roundups. For alternate crops or platform
            specific requests, contact the Stage Devices team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProductSnapshotGrid ids={productSnapshotCards} />
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${supportEmail}?subject=chrony%20press%20assets`} className={cn(buttonVariants({ variant: 'outline' }))}>
              Request additional press assets
            </a>
            <Link to="/about" className={cn(buttonVariants({ variant: 'ghost' }), 'inline-flex gap-1')}>
              Read product background <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShieldCheck className="size-5" /> Download with confidence
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-[13px] leading-7 text-muted md:grid-cols-2">
          <p>
            {renderWordmarkCopy(
              'chrony distribution is handled through Apple’s storefronts only. Install updates directly through the App Store and Mac App Store channels.',
            )}
          </p>
          <p>
            Need help after install? Visit the live status page for incidents or contact support for account and sync
            troubleshooting.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
