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
  const trailRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const trailPositionRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const modeRef = useRef<CursorMode>('default');

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

    const syncMode = (nextMode: CursorMode): void => {
      if (modeRef.current === nextMode) {
        return;
      }
      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const updatePosition = (x: number, y: number): void => {
      const position = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) {
        ringRef.current.style.transform = position;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = position;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = position;
      }
    };

    const tick = (timestamp: number): void => {
      const last = lastFrameRef.current ?? timestamp;
      const frameScale = Math.min(3, Math.max(0.7, (timestamp - last) / 16.67));
      const ringFollow = 1 - Math.pow(1 - 0.7, frameScale);
      const trailFollow = 1 - Math.pow(1 - 0.42, frameScale);

      lastFrameRef.current = timestamp;

      const ring = ringPositionRef.current;
      const trail = trailPositionRef.current;
      const target = targetRef.current;

      ring.x += (target.x - ring.x) * ringFollow;
      ring.y += (target.y - ring.y) * ringFollow;

      trail.x += (ring.x - trail.x) * trailFollow;
      trail.y += (ring.y - trail.y) * trailFollow;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent): void => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;

      if (!isVisibleRef.current) {
        ringPositionRef.current = { ...targetRef.current };
        trailPositionRef.current = { ...targetRef.current };
        updatePosition(event.clientX, event.clientY);
        isVisibleRef.current = true;
        setVisible(true);
      }
    };

    const onPointerDown = (event: PointerEvent): void => {
      setPressed(true);
      syncMode(resolveCursorMode(event.target));
    };

    const onPointerUp = (): void => {
      setPressed(false);
    };

    const onPointerOver = (event: PointerEvent): void => {
      syncMode(resolveCursorMode(event.target));
    };

    const onPointerLeave = (): void => {
      isVisibleRef.current = false;
      setVisible(false);
      setPressed(false);
      syncMode('default');
    };

    const onWindowBlur = (): void => {
      isVisibleRef.current = false;
      setVisible(false);
      setPressed(false);
      syncMode('default');
    };

    rafRef.current = window.requestAnimationFrame(tick);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerrawupdate', onPointerMove as EventListener, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointerover', onPointerOver);
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastFrameRef.current = null;
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
  const hideTrail = !visible || mode !== 'default';
  const showArrow = mode === 'interactive' || mode === 'status';
  const isStatus = mode === 'status';

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[69] rounded-full bg-rowBorder/28 blur-[0.7px] transition-opacity duration-90',
          hideTrail ? 'h-0 w-0 opacity-0' : 'h-3.5 w-3.5 opacity-100',
          pressed ? 'scale-75' : 'scale-100',
        )}
      />
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
