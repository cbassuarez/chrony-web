import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
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
    expect(await screen.findByRole('heading', { name: /download chrony/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open app store listing/i })).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/chrony-synced-notepad/id6756780213',
    );
  });

  it('renders privacy route with Stage Devices policy content', async () => {
    renderPath('/privacy');
    expect(await screen.findByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getAllByText(/stage devices/i).length).toBeGreaterThan(0);
  });

  it('renders terms route with legal heading', async () => {
    renderPath('/terms');
    expect(await screen.findByRole('heading', { name: /terms of use/i })).toBeInTheDocument();
  });

  it('renders support route with support email', async () => {
    renderPath('/support');
    expect(await screen.findByRole('heading', { name: /^support$/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /developer@stagedevices\.com/i }).length).toBeGreaterThan(0);
  });

  it('renders about route', async () => {
    renderPath('/about');
    expect(await screen.findByRole('heading', { name: /about chrony/i })).toBeInTheDocument();
  });

  it('renders status route with heartbeat guidance', async () => {
    renderPath('/status');
    expect(await screen.findByRole('heading', { name: /status and heartbeats/i })).toBeInTheDocument();
    expect(screen.getByText(/chrony-sync-api-health/i)).toBeInTheDocument();
  });
});
