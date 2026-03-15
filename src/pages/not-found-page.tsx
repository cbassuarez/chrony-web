import type React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button-styles';

export function NotFoundPage(): React.JSX.Element {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="font-serif text-5xl text-ink">404</h1>
      <p className="text-muted">That page could not be found.</p>
      <Link className={buttonVariants()} to="/">
        Return home
      </Link>
    </div>
  );
}
