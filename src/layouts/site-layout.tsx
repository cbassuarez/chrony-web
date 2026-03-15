import type React from 'react';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { routeMetaList, supportEmail } from '@/content/site';
import { cn } from '@/lib/cn';
import { enforceApexCanonicalHost } from '@/lib/seo';

export function SiteLayout(): React.JSX.Element {
  const location = useLocation();

  useEffect(() => {
    enforceApexCanonicalHost();
  }, []);

  return (
    <div className="min-h-screen bg-page text-ink">
      <header className="sticky top-0 z-40 border-b border-line/80 bg-page/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <NavLink to="/" className="font-serif text-2xl font-semibold tracking-tight text-ink">
            chrony
          </NavLink>
          <nav aria-label="Primary" className="flex w-full gap-2 overflow-x-auto pb-1 md:w-auto md:pb-0">
            {routeMetaList.map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                end={route.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors whitespace-nowrap',
                    isActive ? 'bg-ink text-page' : 'text-muted hover:bg-line/40 hover:text-ink',
                  )
                }
              >
                {route.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
          className="mx-auto max-w-6xl px-6 pb-16 pt-10"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="border-t border-line/80 bg-page/90">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="font-serif text-xl font-semibold">chrony</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              One shared pad, always ready. Built by Stage Devices.
            </p>
          </div>
          <div className="md:justify-self-end">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">Support</p>
            <a className="mt-2 inline-block text-sm text-ink underline-offset-4 hover:underline" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
