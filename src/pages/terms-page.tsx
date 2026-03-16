import type React from 'react';
import { renderWordmarkCopy } from '@/components/brand/wordmark';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { routeMetaById, termsSections } from '@/content/site';
import { usePageMeta } from '@/lib/seo';

export function TermsPage(): React.JSX.Element {
  const meta = routeMetaById.terms;
  usePageMeta(meta);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="font-sans text-4xl text-ink md:text-5xl">Terms of Use</h1>
        <p className="max-w-3xl text-[15px] leading-8 text-muted">
          {renderWordmarkCopy(
            'These terms govern your use of chrony and chronyapp.com. They are an initial operational draft and may be updated as the product evolves.',
          )}
        </p>
      </section>

      <div className="space-y-4">
        {termsSections.map((section) => (
          <Card key={section.heading}>
            <CardHeader>
              <CardTitle className="text-2xl">{section.heading}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[13px] leading-7 text-muted">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{renderWordmarkCopy(paragraph)}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-6">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{renderWordmarkCopy(bullet)}</li>
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
