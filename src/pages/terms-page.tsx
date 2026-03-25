import { useEffect } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';
import { appleStandardEulaUrl, routeMetaById } from '@/content/site';
import { usePageMeta } from '@/lib/seo';

export function TermsPage(): React.JSX.Element {
  const meta = routeMetaById.terms;
  usePageMeta(meta);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof navigator !== 'undefined' && /\bjsdom\b/i.test(navigator.userAgent)) return;

    try {
      window.location.replace(appleStandardEulaUrl);
    } catch {
      // jsdom does not implement full navigation; keep fallback content usable.
    }
  }, []);

  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <h1 className="font-sans text-4xl text-ink md:text-5xl">Redirecting to Apple Terms</h1>
        <p className="max-w-3xl text-[15px] leading-8 text-muted">
          chrony uses Apple&apos;s Standard Licensed Application End User License Agreement for terms.
        </p>
        <p className="max-w-3xl text-[15px] leading-8 text-muted">
          If you are not redirected automatically,{' '}
          <a href={appleStandardEulaUrl} className="underline underline-offset-4" rel="noopener noreferrer">
            open the Apple standard EULA
          </a>
          .
        </p>
        <p className="max-w-3xl text-[15px] leading-8 text-muted">
          For data handling details, review the{' '}
          <Link to="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
