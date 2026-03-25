import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { appStoreUrl, appleStandardEulaUrl, deriveProPricingValues, proPricingContent } from '@/content/site';
import { appRouteObjects } from '@/router';

function renderPath(path: string): void {
  const router = createMemoryRouter(appRouteObjects, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
}

describe('Chrony route coverage', () => {
  it('renders home route', async () => {
    renderPath('/');
    expect(await screen.findByRole('heading', { name: /one shared pad/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders download route with app store CTA', async () => {
    renderPath('/download');
    expect(await screen.findByRole('heading', { name: /download on the app store and mac app store/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open iphone and ipad listing/i })).toHaveAttribute('href', appStoreUrl);
  });

  it('renders privacy route with Stage Devices policy content', async () => {
    renderPath('/privacy');
    expect(await screen.findByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getAllByText(/stage devices/i).length).toBeGreaterThan(0);
  });

  it('renders terms route as an Apple EULA redirect page', async () => {
    renderPath('/terms');
    expect(await screen.findByRole('heading', { name: /redirecting to apple terms/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open the apple standard eula/i })).toHaveAttribute(
      'href',
      appleStandardEulaUrl,
    );
  });

  it('renders support route with support email', async () => {
    renderPath('/support');
    expect(await screen.findByRole('heading', { name: /^support$/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /developer@stagedevices\.com/i }).length).toBeGreaterThan(0);
  });

  it('renders about route', async () => {
    renderPath('/about');
    expect(await screen.findByRole('heading', { name: /about chrony/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /chrony journey/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /^download chrony$/i })[0]).toHaveAttribute('href', appStoreUrl);
  });

  it('renders pricing route with computed plan values and keeps pricing out of header nav', async () => {
    const derivedPricing = deriveProPricingValues(proPricingContent);
    renderPath('/pricing');

    expect(await screen.findByRole('heading', { name: /pricing for deeper writing and recovery workflows/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /what pro unlocks/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^monthly$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^annual$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open app store listing/i })).toHaveAttribute('href', appStoreUrl);
    expect(screen.getByText(/7 export formats/i)).toBeInTheDocument();
    expect(screen.getByText(/8 pro languages/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start 1 week free in app store/i })).toHaveAttribute('href', appStoreUrl);
    expect(screen.getByText('$1.99')).toBeInTheDocument();
    expect(screen.getByText('$17.99')).toBeInTheDocument();
    expect(screen.getByText('1 week free')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`save ${derivedPricing.annualSavingsPercent}%`, 'i'))).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^pricing$/i })).not.toBeInTheDocument();
  });

  it('renders status route with embedded status iframe', async () => {
    renderPath('/status');
    expect(await screen.findByRole('heading', { name: /production status and incident timeline/i })).toBeInTheDocument();
    expect(screen.getByTitle(/chrony service status/i)).toBeInTheDocument();
  });
});
