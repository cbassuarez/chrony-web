import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { privacySections, routeMetaById } from '@/content/site';
import { usePageMeta } from '@/lib/seo';

export function PrivacyPage(): React.JSX.Element {
  const meta = routeMetaById.privacy;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Privacy Policy</h1>
        <p className="max-w-3xl text-base leading-8 text-muted">
          This policy explains how Stage Devices handles data for chrony. It is an initial operational draft based on
          current product behavior.
        </p>
      </section>

      <div className="space-y-4">
        {privacySections.map((section) => (
          <Card key={section.heading}>
            <CardHeader>
              <CardTitle className="text-2xl">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-6">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
