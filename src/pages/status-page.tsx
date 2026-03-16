import type React from 'react';

export function StatusPage(): React.JSX.Element {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl font-semibold text-ink md:text-5xl">Status</h1>
      <p className="max-w-3xl text-[15px] leading-8 text-muted">View live status at https://status.chronyapp.com.</p>
    </div>
  );
}
