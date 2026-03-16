import type React from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { routeMetaList, supportEmail } from '@/content/site';
import { cn } from '@/lib/cn';
import { enforceApexCanonicalHost } from '@/lib/seo';

export function SiteLayout(): React.JSX.Element {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    enforceApexCanonicalHost();
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-page/94 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between md:block">
            <NavLink to="/" className="text-[30px] font-semibold tracking-tight text-ink">
              chrony
            </NavLink>
            <button
              type="button"
              className="rounded-compact border border-line bg-row px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink md:hidden"
              onClick={() => setIsMobileNavOpen((value) => !value)}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-primary-nav"
              aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              Menu
            </button>
          </div>
          <nav aria-label="Primary" className="hidden w-full gap-2 md:flex md:w-auto md:pb-0">
            {routeMetaList.map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                end={route.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-compact border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap',
                    isActive ? 'border-rowBorder bg-rowActive text-ink' : 'border-line bg-row text-muted hover:text-ink',
                  )
                }
              >
                {route.label}
              </NavLink>
            ))}
            <a
              href="https://status.chronyapp.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-compact border border-line bg-row px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors whitespace-nowrap hover:text-ink"
            >
              Status
            </a>
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
              className="border-t border-line bg-page px-6 pb-4 pt-2 md:hidden"
            >
              <nav aria-label="Mobile primary" className="flex flex-col gap-2">
                {routeMetaList.map((route) => (
                  <NavLink
                    key={route.id}
                    to={route.path}
                    end={route.path === '/'}
                    className={({ isActive }) =>
                      cn(
                        'rounded-compact border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.12em] transition-colors',
                        isActive
                          ? 'border-rowBorder bg-rowActive text-ink'
                          : 'border-line bg-row text-muted hover:text-ink',
                      )
                    }
                  >
                    {route.label}
                  </NavLink>
                ))}
                <a
                  href="https://status.chronyapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-compact border border-line bg-row px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  Status
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto max-w-6xl px-6 pb-16 pt-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-line bg-page/96">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-lg font-semibold">chrony</p>
            <p className="mt-2 max-w-md text-xs leading-6 text-muted">
              One shared pad, always ready. Built by Stage Devices.
            </p>
          </div>
          <div className="md:justify-self-end">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Support</p>
            <a className="mt-2 inline-block text-xs text-ink underline-offset-4 hover:underline" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
