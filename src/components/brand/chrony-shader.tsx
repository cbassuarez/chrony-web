import type React from 'react';
import { MeshGradient, PaperTexture } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ChronyShaderProps {
  className?: string;
  intensity?: 'hero' | 'soft' | 'obsidian';
}

export function ChronyShader({ className, intensity = 'hero' }: ChronyShaderProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const isHero = intensity === 'hero';
  const isObsidian = intensity === 'obsidian';
  const showAccent = isHero || isObsidian;
  const meshColors = isHero
    ? ['#ffffff', '#f6f6f6', '#d6d6d6', '#2d7891']
    : isObsidian
      ? ['#f5f8fb', '#e8edf3', '#c8d2dd', '#273340']
      : ['#ffffff', '#f6f6f6', '#ebeff4'];
  const accentColors = isObsidian
    ? ['#f4f8ff', '#8ea4ba', '#32445a', '#eef3fb']
    : ['#ffffff', '#2d7891', '#1f5fbf', '#ffffff'];

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]', className)}>
      <MeshGradient
        className="h-full w-full"
        colors={meshColors}
        distortion={isHero ? 1.15 : isObsidian ? 1 : 0.48}
        swirl={isHero ? 0.92 : isObsidian ? 0.68 : 0.22}
        grainMixer={0.2}
        grainOverlay={0.18}
        speed={reduceMotion ? 0 : isHero ? 0.26 : isObsidian ? 0.2 : 0.08}
      />
      {showAccent ? (
        <MeshGradient
          className={cn('absolute inset-0 mix-blend-screen', isObsidian ? 'opacity-58' : 'opacity-80')}
          colors={accentColors}
          distortion={isObsidian ? 0.44 : 0.5}
          swirl={isObsidian ? 0.82 : 1}
          grainMixer={0}
          grainOverlay={0}
          speed={reduceMotion ? 0 : isObsidian ? 0.14 : 0.18}
        />
      ) : null}
      <PaperTexture
        className="absolute inset-0 mix-blend-multiply opacity-95"
        colorBack="#ffffff"
        colorFront={isObsidian ? '#d8e0ea' : '#e8eaef'}
        contrast={isObsidian ? 0.24 : 0.22}
        roughness={0.24}
        fiber={0.2}
        crumples={isObsidian ? 0.3 : 0.24}
        folds={isHero ? 0.45 : isObsidian ? 0.28 : 0.12}
        fade={0.06}
      />
      <div className={cn('absolute inset-0 bg-gradient-to-b', isObsidian ? 'from-page/16 via-page/28 to-page' : 'from-page/25 via-page/35 to-page')} />
    </div>
  );
}
