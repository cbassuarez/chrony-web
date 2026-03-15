import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChronyShader } from '@/components/brand/chrony-shader';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { featureCards, routeMetaById } from '@/content/site';
import { cn } from '@/lib/cn';
import { usePageMeta } from '@/lib/seo';

export function HomePage(): React.JSX.Element {
  const meta = routeMetaById.home;
  const reduceMotion = useReducedMotion();

  usePageMeta(meta);

  return (
    <div className="space-y-14">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-panel px-8 py-12 md:px-12 md:py-16">
        <ChronyShader intensity="hero" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <Badge variant="accent">Stage Devices</Badge>
          <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl">
            One shared pad,
            <br />
            always ready.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
            chrony is built for fast writing and code-aware notes. Start in plain text, keep sync in the background,
            and unlock pro tools when you want deeper workflow control.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className={cn(buttonVariants({ size: 'default' }), 'gap-2')} to="/download">
              Download chrony <Download className="size-4" />
            </Link>
            <Link className={cn(buttonVariants({ variant: 'secondary' }), 'gap-2')} to="/about">
              Read the product story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Core capabilities</p>
          <h2 className="font-serif text-3xl text-ink md:text-4xl">Built from the same principles as the app</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.28, delay: index * 0.04 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-7">{feature.body}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-line bg-panel px-8 py-10">
        <ChronyShader intensity="soft" className="opacity-80" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-serif text-2xl text-ink">Ready to try chrony?</h3>
            <p className="mt-2 text-sm text-muted">
              Install on iPhone, iPad, or Mac and keep one writing surface in sync.
            </p>
          </div>
          <Link className={cn(buttonVariants({ size: 'lg' }), 'gap-2')} to="/download">
            Open download page <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
