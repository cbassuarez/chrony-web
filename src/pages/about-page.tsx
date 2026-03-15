import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById } from '@/content/site';
import { usePageMeta } from '@/lib/seo';

export function AboutPage(): React.JSX.Element {
  const meta = routeMetaById.about;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">About chrony</h1>
        <p className="max-w-3xl text-base leading-8 text-muted">
          chrony is a writing-first notepad designed around one continuously available document. The product is built by
          Stage Devices.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Product direction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7 text-muted">
          <p>
            chrony emphasizes immediacy: open the app and write. The experience borrows from editorial paper workflows
            while supporting language-aware readability for technical notes.
          </p>
          <p>
            Pro features extend this base with timeline restore, sanitize and validate, pinned snapshots, advanced
            language access, and export workflows.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform scope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7 text-muted">
          <p>chrony is currently distributed through Apple platforms via a unified App Store listing.</p>
          <p>
            The web presence at chronyapp.com exists for download routing, policy documents, support contact, and
            product context.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
