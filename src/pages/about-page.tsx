import type React from 'react';
import { ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { ProductFamilyScene } from '@/components/brand/product-family-scene';
import { ProductSnapshotGrid } from '@/components/brand/product-snapshot-grid';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById, appStoreUrl, statusPageUrl, supportEmail } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function AboutPage(): React.JSX.Element {
  const meta = routeMetaById.about;
  usePageMeta(meta);

  const journeyMilestones = [
    {
      id: '01',
      title: 'Why chrony exists',
      body:
        'Most notes tools force context switching before writing can begin. chrony was built to keep one continuous document always ready so ideas are captured the moment they appear.',
    },
    {
      id: '02',
      title: 'How chrony works today',
      body:
        'Sign in once, keep one shared pad synced across iPhone, iPad, and Mac, and use compact chrome controls that preserve flow while exposing snapshots, language modes, and diagnostics.',
    },
    {
      id: '03',
      title: 'What we are building next',
      body:
        'The roadmap extends reliability and depth: stronger restore workflows, clearer operational transparency, and more precise pro tooling for technical writing and iteration.',
    },
  ] as const;

  return (
    <div className="space-y-10">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-line bg-panel">
        <ChronyShader intensity="hero" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-8 md:pb-20 md:pt-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Product story</p>
              <h1 className="text-4xl font-semibold leading-[1.06] text-ink md:text-6xl">About chrony</h1>
              <p className="max-w-3xl text-[15px] leading-8 text-muted md:text-[17px]">
                chrony is built around a simple premise: writing should start immediately, not after project setup,
                template choice, or app navigation. Open the app and your shared pad is already there.
              </p>
              <p className="max-w-3xl text-[15px] leading-8 text-muted md:text-[17px]">
                The same document context follows you across iPhone, iPad, and Mac, with synchronization in the
                background and pro workflows available when you need deeper control.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'inline-flex gap-2')}
                >
                  Download chrony <ArrowRight className="size-4" />
                </a>
                <a
                  href={statusPageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'inline-flex gap-2')}
                >
                  View live status <ExternalLink className="size-4" />
                </a>
                <a href={`mailto:${supportEmail}`} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'inline-flex gap-2')}>
                  Contact support <Mail className="size-4" />
                </a>
              </div>
            </div>

            <ProductFamilyScene className="mt-2 lg:mt-0" />
          </div>
        </div>
      </section>

      <Card className="bg-page/88 backdrop-blur-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Chrony journey</CardTitle>
          <p className="max-w-4xl text-[13px] leading-7 text-muted">
            The product direction stays focused on continuity: faster capture, dependable sync behavior, and operational
            transparency when something goes wrong.
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-standard border border-line bg-page/85">
            {journeyMilestones.map((milestone, index) => (
              <article
                key={milestone.id}
                className={cn(
                  'grid gap-3 px-4 py-4 md:grid-cols-[104px_minmax(0,1fr)] md:gap-6 md:px-5',
                  index === journeyMilestones.length - 1 ? '' : 'border-b border-line',
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {milestone.id}
                </p>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold text-ink">{milestone.title}</h3>
                  <p className="text-[13px] leading-7 text-muted">{milestone.body}</p>
                </div>
              </article>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-ink">Cross-device continuity</h2>
          <p className="max-w-3xl text-[14px] leading-7 text-muted">
            chrony keeps the same workflow geometry and top chrome behavior as you move between tablet and desktop,
            reducing relearning friction and preserving momentum.
          </p>
        </div>
        <ProductSnapshotGrid ids={['ipadWarm', 'macWarm']} className="lg:grid-cols-2" />
      </section>

      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Built for reliability and support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-[13px] leading-7 text-muted">
          <p>
            chrony ships through Apple storefronts and pairs product features with clear support and status pathways so
            users can install confidently and recover quickly when issues arise.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'default' }), 'inline-flex gap-2')}
            >
              Download chrony <ArrowRight className="size-4" />
            </a>
            <a href={`mailto:${supportEmail}`} className={cn(buttonVariants({ variant: 'secondary' }), 'inline-flex gap-2')}>
              Support <Mail className="size-4" />
            </a>
            <a
              href={statusPageUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), 'inline-flex gap-2')}
            >
              Status <ExternalLink className="size-4" />
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
