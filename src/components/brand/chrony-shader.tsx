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
        colors={isHero ? ['#efe6d2', '#d7cdb7', '#9dbdbb', '#547c88'] : ['#f3ebda', '#ded3bd', '#b8c8c6']}
        distortion={isHero ? 0.65 : 0.3}
        swirl={isHero ? 0.42 : 0.16}
        grainMixer={0.12}
        grainOverlay={0.16}
        speed={reduceMotion ? 0 : isHero ? 0.12 : 0.04}
      />
      <PaperTexture
        className="absolute inset-0 mix-blend-multiply"
        colorBack="#f6efdf"
        colorFront={isHero ? '#d7cab0' : '#ddd4bf'}
        contrast={0.35}
        roughness={0.3}
        fiber={0.25}
        crumples={0.3}
        folds={isHero ? 0.5 : 0.2}
        fade={0.08}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-page/35 via-page/20 to-page" />
    </div>
  );
}
