import type React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { appIconAsset, productSnapshots } from '@/content/media';
import { cn } from '@/lib/cn';

interface ProductFamilySceneProps {
  className?: string;
  theme?: 'warm' | 'obsidian';
}

export function ProductFamilyScene({ className, theme = 'warm' }: ProductFamilySceneProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const snapshots =
    theme === 'obsidian'
      ? {
          mac: productSnapshots.macObsidian,
          ipad: productSnapshots.ipadAurora,
          iphone: productSnapshots.iphoneGraphite,
        }
      : {
          mac: productSnapshots.macWarm,
          ipad: productSnapshots.ipadWarm,
          iphone: productSnapshots.iphoneWarm,
        };

  return (
    <div className={cn('relative mx-auto h-[300px] w-full max-w-[860px] md:h-[380px] lg:h-[420px] [perspective:2000px]', className)}>
      {theme === 'obsidian' ? null : (
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-page/90 via-page/60 to-page/90 blur-2xl" />
      )}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.34, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute left-[20%] top-[7%] w-[79%]"
        style={{ transform: 'rotateY(-17deg) rotateX(8deg)' }}
      >
        <img
          src={snapshots.mac.src}
          alt={snapshots.mac.alt}
          className="w-full rounded-standard shadow-[0_44px_84px_-52px_hsl(var(--ink)/0.72)]"
          loading="eager"
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.38, delay: 0.06, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute left-[1%] top-[18%] w-[56%]"
        style={{ transform: 'rotateY(19deg) rotateX(8deg)' }}
      >
        <img
          src={snapshots.ipad.src}
          alt={snapshots.ipad.alt}
          className="w-full rounded-standard shadow-[0_42px_80px_-56px_hsl(var(--ink)/0.72)]"
          loading="eager"
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.42, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute right-[3%] top-[22%] w-[26%]"
        style={{ transform: 'rotateY(-20deg) rotateX(9deg)' }}
      >
        <img
          src={snapshots.iphone.src}
          alt={snapshots.iphone.alt}
          className="w-full rounded-standard shadow-[0_38px_72px_-48px_hsl(var(--ink)/0.82)]"
          loading="eager"
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.92 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.42, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute bottom-[3%] left-[8%] w-[18%] max-w-[124px] min-w-[68px]"
      >
        <img
          src={appIconAsset.src}
          alt={appIconAsset.alt}
          className="w-full rounded-[20%] shadow-[0_30px_56px_-36px_hsl(var(--ink)/0.88)]"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
