import type React from 'react';
import { MeshGradient, PaperTexture } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface ChronyShaderProps {
  className?: string;
  intensity?: 'hero' | 'soft';
}

export function ChronyShader({ className, intensity = 'hero' }: ChronyShaderProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const isHero = intensity === 'hero';

  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]', className)}>
      <MeshGradient
        className="h-full w-full"
        colors={isHero ? ['#ffffff', '#f6f6f6', '#d6d6d6', '#2d7891'] : ['#ffffff', '#f6f6f6', '#ebeff4']}
        distortion={isHero ? 1.15 : 0.48}
        swirl={isHero ? 0.92 : 0.22}
        grainMixer={0.2}
        grainOverlay={0.18}
        speed={reduceMotion ? 0 : isHero ? 0.26 : 0.08}
      />
      {isHero ? (
        <MeshGradient
          className="absolute inset-0 mix-blend-screen opacity-80"
          colors={['#ffffff', '#2d7891', '#1f5fbf', '#ffffff']}
          distortion={0.5}
          swirl={1}
          grainMixer={0}
          grainOverlay={0}
          speed={reduceMotion ? 0 : 0.18}
        />
      ) : null}
      <PaperTexture
        className="absolute inset-0 mix-blend-multiply opacity-95"
        colorBack="#ffffff"
        colorFront="#e8eaef"
        contrast={0.22}
        roughness={0.24}
        fiber={0.2}
        crumples={0.24}
        folds={isHero ? 0.45 : 0.12}
        fade={0.06}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-page/25 via-page/35 to-page" />
    </div>
  );
}
