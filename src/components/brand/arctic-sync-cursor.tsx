import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type CursorMode = 'default' | 'interactive' | 'status' | 'text';

function resolveCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) {
    return 'default';
  }

  if (
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="textbox"], [data-native-cursor="text"], pre, code',
    )
  ) {
    return 'text';
  }

  if (target.closest('[data-cursor="status"], iframe[title="chrony service status"]')) {
    return 'status';
  }

  if (target.closest('a, button, summary, label, [role="button"], [role="tab"], [data-cursor="interactive"]')) {
    return 'interactive';
  }

  return 'default';
}

export function ArcticSyncCursor(): React.JSX.Element | null {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setEnabled(supportsFinePointer && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (!enabled) {
      root.classList.remove('chrony-cursor-enabled');
      body.classList.remove('chrony-cursor-enabled');
      delete root.dataset.chronyCursorMode;
      delete body.dataset.chronyCursorMode;
      root.style.cursor = '';
      body.style.cursor = '';
      return;
    }

    root.classList.add('chrony-cursor-enabled');
    body.classList.add('chrony-cursor-enabled');
    root.dataset.chronyCursorMode = mode;
    body.dataset.chronyCursorMode = mode;
    root.style.cursor = 'none';
    body.style.cursor = 'none';

    return () => {
      root.classList.remove('chrony-cursor-enabled');
      body.classList.remove('chrony-cursor-enabled');
      delete root.dataset.chronyCursorMode;
      delete body.dataset.chronyCursorMode;
      root.style.cursor = '';
      body.style.cursor = '';
    };
  }, [enabled, mode]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const updatePosition = (x: number, y: number): void => {
      const position = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) {
        ringRef.current.style.transform = position;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = position;
      }
    };

    const updateMode = (target: EventTarget | null): void => {
      setMode(resolveCursorMode(target));
    };

    const onPointerMove = (event: PointerEvent): void => {
      updatePosition(event.clientX, event.clientY);
      updateMode(event.target);
      setVisible(true);
    };

    const onPointerDown = (): void => {
      setPressed(true);
    };

    const onPointerUp = (): void => {
      setPressed(false);
    };

    const onPointerOver = (event: PointerEvent): void => {
      updateMode(event.target);
    };

    const onPointerLeave = (): void => {
      setVisible(false);
      setPressed(false);
    };

    const onWindowBlur = (): void => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerrawupdate', onPointerMove as EventListener, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointerover', onPointerOver);
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerrawupdate', onPointerMove as EventListener);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onWindowBlur);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  const hidden = !visible || mode === 'text';
  const hideDot = !visible || mode !== 'default';
  const showArrow = mode === 'interactive' || mode === 'status';
  const isStatus = mode === 'status';

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-mode={mode}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-compact border border-line/70',
          'bg-page/75 text-ink shadow-[0_10px_24px_-16px_hsl(var(--ink)/0.45)] backdrop-blur-md will-change-transform transition-[opacity,width,height,border-color,background-color] duration-110 ease-out',
          hidden ? 'opacity-0' : 'opacity-100',
          showArrow ? 'h-8 w-8' : 'h-6 w-6',
          isStatus ? 'chrony-cursor-status border-rowBorder/80 bg-page/82' : null,
          pressed ? 'scale-[0.9]' : 'scale-100',
        )}
      >
        {showArrow ? <ArrowUpRight className={cn('size-3', isStatus ? 'text-rowBorder' : 'text-ink')} strokeWidth={2.2} /> : null}
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[71] rounded-full bg-ink/85 will-change-transform transition-opacity duration-70',
          hideDot ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100',
          pressed ? 'scale-75' : 'scale-100',
        )}
      />
    </>
  );
}
