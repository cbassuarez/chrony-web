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
  const modeRef = useRef<CursorMode>('default');
  const positionRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number | null>(null);

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
    modeRef.current = mode;

    if (!enabled) {
      root.classList.remove('chrony-cursor-enabled');
      delete root.dataset.chronyCursorMode;
      return;
    }

    root.classList.add('chrony-cursor-enabled');
    root.dataset.chronyCursorMode = mode;

    return () => {
      root.classList.remove('chrony-cursor-enabled');
      delete root.dataset.chronyCursorMode;
    };
  }, [enabled, mode]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const updateMode = (target: EventTarget | null): void => {
      setMode(resolveCursorMode(target));
    };

    const onPointerMove = (event: PointerEvent): void => {
      positionRef.current.tx = event.clientX;
      positionRef.current.ty = event.clientY;
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

    const animate = (): void => {
      const current = positionRef.current;
      const easing = modeRef.current === 'interactive' || modeRef.current === 'status' ? 0.24 : 0.2;

      current.x += (current.tx - current.x) * easing;
      current.y += (current.ty - current.y) * easing;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointerover', onPointerOver);
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('pointermove', onPointerMove);
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
          'bg-page/75 text-ink shadow-[0_10px_24px_-16px_hsl(var(--ink)/0.45)] backdrop-blur-md transition-[opacity,width,height,border-color,background-color,transform] duration-150 ease-out',
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
          'pointer-events-none fixed left-0 top-0 z-[71] rounded-full bg-ink/85 transition-[opacity,transform] duration-100',
          hidden ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100',
          pressed ? 'scale-75' : 'scale-100',
        )}
      />
    </>
  );
}
