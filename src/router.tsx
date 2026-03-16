import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { SiteLayout } from '@/layouts/site-layout';

const HomePage = lazy(() => import('@/pages/home-page').then((mod) => ({ default: mod.HomePage })));
const DownloadPage = lazy(() => import('@/pages/download-page').then((mod) => ({ default: mod.DownloadPage })));
const PrivacyPage = lazy(() => import('@/pages/privacy-page').then((mod) => ({ default: mod.PrivacyPage })));
const TermsPage = lazy(() => import('@/pages/terms-page').then((mod) => ({ default: mod.TermsPage })));
const SupportPage = lazy(() => import('@/pages/support-page').then((mod) => ({ default: mod.SupportPage })));
const AboutPage = lazy(() => import('@/pages/about-page').then((mod) => ({ default: mod.AboutPage })));
const StatusPage = lazy(() => import('@/pages/status-page').then((mod) => ({ default: mod.StatusPage })));
const PricingPage = lazy(() => import('@/pages/pricing-page').then((mod) => ({ default: mod.PricingPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found-page').then((mod) => ({ default: mod.NotFoundPage })));

function withSuspense(node: ReactNode): ReactNode {
  return (
    <Suspense
      fallback={
        <div className="rounded-standard border border-line bg-panel p-6 text-sm text-muted" role="status" aria-live="polite">
          Loading...
        </div>
      }
    >
      {node}
    </Suspense>
  );
}

export const appRouteObjects: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'download', element: withSuspense(<DownloadPage />) },
      { path: 'privacy', element: withSuspense(<PrivacyPage />) },
      { path: 'terms', element: withSuspense(<TermsPage />) },
      { path: 'support', element: withSuspense(<SupportPage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'status', element: withSuspense(<StatusPage />) },
      { path: 'pricing', element: withSuspense(<PricingPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
];

export const appRouter = createBrowserRouter(appRouteObjects);
