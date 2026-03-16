import type React from 'react';
import { MeshGradient, PaperTexture } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ChronyShaderProps {
  className?: string;
  intensity?: 'hero' | 'soft' | 'obsidian' | 'mono';
}

export function ChronyShader({ className, intensity = 'hero' }: ChronyShaderProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const isHero = intensity === 'hero';
  const isObsidian = intensity === 'obsidian';
  const isMono = intensity === 'mono';
  const showAccent = isHero || isObsidian || isMono;
  const meshColors = isHero
    ? ['#ffffff', '#f6f6f6', '#d6d6d6', '#2d7891']
    : isObsidian
      ? ['#111217', '#1A1D24', '#2B3340', '#EAB85A']
      : isMono
        ? ['#ffffff', '#f4f4f4', '#d8d8d8', '#282828']
        : ['#ffffff', '#f6f6f6', '#ebeff4'];
  const accentColors = isObsidian
    ? ['#111217', '#EAB85A', '#F0B35A', '#1A1D24']
    : isMono
      ? ['#ffffff', '#8d8d8d', '#1c1c1c', '#ffffff']
      : ['#ffffff', '#2d7891', '#1f5fbf', '#ffffff'];

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]', className)}>
      <MeshGradient
        className="h-full w-full"
        colors={meshColors}
        distortion={isHero || isObsidian ? 1.15 : isMono ? 0.78 : 0.48}
        swirl={isHero || isObsidian ? 0.92 : isMono ? 0.55 : 0.22}
        grainMixer={0.2}
        grainOverlay={0.18}
        speed={reduceMotion ? 0 : isHero || isObsidian ? 0.26 : isMono ? 0.12 : 0.08}
      />
      {showAccent ? (
        <MeshGradient
          className={cn(
            'absolute inset-0',
            isObsidian ? 'mix-blend-overlay opacity-42' : isMono ? 'mix-blend-screen opacity-40' : 'mix-blend-screen opacity-80',
          )}
          colors={accentColors}
          distortion={isObsidian ? 0.5 : isMono ? 0.4 : 0.5}
          swirl={isObsidian ? 1 : isMono ? 0.45 : 1}
          grainMixer={0}
          grainOverlay={0}
          speed={reduceMotion ? 0 : isObsidian ? 0.18 : isMono ? 0.08 : 0.18}
        />
      ) : null}
      <PaperTexture
        className={cn('absolute inset-0 opacity-95', isObsidian ? 'mix-blend-soft-light' : 'mix-blend-multiply')}
        colorBack={isObsidian ? '#111217' : '#ffffff'}
        colorFront={isObsidian ? '#2B3340' : isMono ? '#e0e0e0' : '#e8eaef'}
        contrast={isObsidian ? 0.2 : isMono ? 0.2 : 0.22}
        roughness={isObsidian ? 0.3 : 0.24}
        fiber={0.2}
        crumples={isObsidian ? 0.32 : 0.24}
        folds={isHero ? 0.45 : isObsidian ? 0.3 : isMono ? 0.2 : 0.12}
        fade={0.06}
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b',
          isObsidian
            ? 'from-[#111217]/42 via-[#1A1D24]/58 to-[#111217]'
            : isMono
              ? 'from-white/36 via-slate-100/28 to-page'
              : 'from-page/25 via-page/35 to-page',
        )}
      />
    </div>
  );
}
