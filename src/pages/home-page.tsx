import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { ProductFamilyScene } from '@/components/brand/product-family-scene';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  appStoreBadgeHref,
  appStoreBadgeImageUrl,
  appStoreUrl,
  featureCards,
  routeMetaById,
} from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function HomePage(): React.JSX.Element {
  const meta = routeMetaById.home;
  const reduceMotion = useReducedMotion();

  usePageMeta(meta);

  return (
    <div className="space-y-12">
      <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-line bg-panel">
        <ChronyShader intensity="hero" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-20 md:pt-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl font-semibold leading-[1.02] text-ink md:text-7xl">One shared pad, always ready.</h1>
              <p className="max-w-3xl text-[18px] leading-9 text-muted md:text-[20px]">
                chrony is built for fast writing and code-aware notes. Start in plain text, keep sync in the
                background, and unlock pro tools when you want deeper workflow control.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open App Store listing"
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'gap-2')}
                >
                  Download chrony <ArrowRight className="size-4" />
                </a>
                <Link className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'gap-2')} to="/about">
                  Read the product story <ArrowRight className="size-4" />
                </Link>
              </div>
              <a href={appStoreBadgeHref} style={{ display: 'inline-block' }}>
                <img
                  src={appStoreBadgeImageUrl}
                  alt="Download on the App Store"
                  style={{ width: '246px', height: '82px', verticalAlign: 'middle', objectFit: 'contain' }}
                />
              </a>
            </div>

            <ProductFamilyScene className="mt-2 lg:mt-0" />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">What you can do now</p>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">Capture once. Keep moving everywhere.</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.24, delay: index * 0.03 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-7">{feature.body}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
