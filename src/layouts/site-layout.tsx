import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArcticSyncCursor } from '@/components/brand/arctic-sync-cursor';
import { Wordmark } from '@/components/brand/wordmark';
import { routeMetaList, supportEmail } from '@/content/site';
import { cn } from '@/lib/cn';
import { enforceApexCanonicalHost } from '@/lib/seo';

export function SiteLayout(): React.JSX.Element {
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [headerWordmarkTone, setHeaderWordmarkTone] = useState<'light' | 'dark'>('dark');
  const isHomeRoute = location.pathname === '/';
  const isStatusRoute = location.pathname.startsWith('/status');
  const isDownloadRoute = location.pathname.startsWith('/download');
  const isAboutRoute = location.pathname.startsWith('/about');
  const isSupportRoute = location.pathname.startsWith('/support');
  const primaryNavRoutes = routeMetaList.filter((route) => route.id !== 'privacy' && route.id !== 'terms');
  const legalFooterRoutes = routeMetaList.filter((route) => route.id === 'privacy' || route.id === 'terms');

  useEffect(() => {
    enforceApexCanonicalHost();
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const resolveTone = (): void => {
      const header = headerRef.current;
      if (!header) {
        return;
      }

      const headerRect = header.getBoundingClientRect();
      const sampleY = headerRect.top + headerRect.height * 0.5;
      const sampleX = headerRect.left + Math.min(130, Math.max(92, headerRect.width * 0.15));

      let nextTone: 'light' | 'dark' = 'dark';
      const toneZones = document.querySelectorAll<HTMLElement>('[data-header-wordmark]');

      toneZones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        const withinX = sampleX >= rect.left && sampleX <= rect.right;
        const withinY = sampleY >= rect.top && sampleY <= rect.bottom;
        const tone = zone.dataset.headerWordmark;

        if (withinX && withinY && (tone === 'light' || tone === 'dark')) {
          nextTone = tone;
        }
      });

      setHeaderWordmarkTone((current) => (current === nextTone ? current : nextTone));
    };

    const onScroll = (): void => {
      resolveTone();
    };

    const onResize = (): void => {
      resolveTone();
    };

    const rafId = window.requestAnimationFrame(resolveTone);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-page text-ink">
      <ArcticSyncCursor />

      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-standard border border-line bg-page/92 shadow-[0_16px_40px_-28px_hsl(var(--ink)/0.55)] backdrop-blur-md">
          <div className="flex flex-col gap-3 px-4 py-3 sm:px-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between md:block">
              <NavLink to="/" className="text-[30px] font-semibold tracking-tight text-ink">
                <Wordmark tone={headerWordmarkTone} />
              </NavLink>
              <button
                type="button"
                className="chrony-button rounded-compact border border-line bg-row px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted hover:text-ink md:hidden"
                onClick={() => setIsMobileNavOpen((value) => !value)}
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-primary-nav"
                aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                Menu
              </button>
            </div>
            <nav aria-label="Primary" className="hidden w-full gap-2 md:flex md:w-auto md:pb-0">
              {primaryNavRoutes.map((route) => (
                <NavLink
                  key={route.id}
                  to={route.path}
                  end={route.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'chrony-button rounded-compact border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap',
                      isActive ? 'border-rowBorder bg-rowActive text-ink' : 'border-line bg-row text-muted hover:text-ink',
                    )
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <AnimatePresence>
            {isMobileNavOpen ? (
              <motion.div
                id="mobile-primary-nav"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                className="border-t border-line bg-page px-4 pb-4 pt-2 sm:px-5 md:hidden"
              >
                <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                  {primaryNavRoutes.map((route) => (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      end={route.path === '/'}
                      className={({ isActive }) =>
                        cn(
                          'chrony-button rounded-compact border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.12em]',
                          isActive
                            ? 'border-rowBorder bg-rowActive text-ink'
                            : 'border-line bg-row text-muted hover:text-ink',
                        )
                      }
                    >
                      {route.label}
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className={cn(
            'mx-auto max-w-6xl px-6 pb-16',
            isHomeRoute || isStatusRoute || isDownloadRoute || isAboutRoute || isSupportRoute ? 'pt-0' : 'pt-28 md:pt-32',
          )}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-line bg-page/96">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-lg font-semibold">
              <Wordmark tone="dark" />
            </p>
            <p className="mt-2 max-w-md text-xs leading-6 text-muted">
              One shared pad, always ready. Built by Stage Devices.
            </p>
          </div>
          <div className="md:justify-self-end">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Support</p>
            <a className="mt-2 inline-block text-xs text-ink underline-offset-4 hover:underline" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            <div className="mt-4 flex flex-wrap gap-4">
              {legalFooterRoutes.map((route) => (
                <NavLink key={route.id} to={route.path} className="text-[11px] uppercase tracking-[0.14em] text-muted hover:text-ink">
                  {route.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
