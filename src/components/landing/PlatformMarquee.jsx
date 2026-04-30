import React from 'react';
import { motion } from 'framer-motion';
import {
  Youtube,
  Instagram,
  Facebook,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import ScrollExploreHint from './ScrollExploreHint';

/** Minimal TikTok mark — fills with currentColor on hover */
function TikTokGlyph({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/** How many full platform rows are tiled — keep wide enough that no viewport shows empty gap mid-loop. */
const MARQUEE_SEGMENT_COPIES = 8;

const PLATFORMS = [
  {
    key: 'youtube',
    label: 'YouTube',
    Icon: Youtube,
    iconHover: 'group-hover:text-[#FF0000]',
    labelHover:
      'group-hover:text-[#FF0000] group-hover:[text-shadow:0_0_24px_rgba(255,0,0,0.45)]',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    Icon: TikTokGlyph,
    isCustom: true,
    iconHover:
      'group-hover:text-[#FE2C55] group-hover:[filter:drop-shadow(0_0_10px_rgba(254,44,85,0.5))]',
    labelHover:
      'group-hover:text-[#25F4EE] group-hover:[text-shadow:0_0_20px_rgba(37,244,238,0.5)]',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    Icon: Instagram,
    iconHover:
      'group-hover:text-[#E4405F] group-hover:[filter:drop-shadow(0_0_12px_rgba(228,64,95,0.55))]',
    labelHover:
      'inline-block group-hover:bg-gradient-to-r group-hover:from-[#f09433] group-hover:via-[#e6683c] group-hover:to-[#bc1888] group-hover:bg-clip-text group-hover:text-transparent',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    Icon: Facebook,
    iconHover: 'group-hover:text-[#1877F2]',
    labelHover:
      'group-hover:text-[#1877F2] group-hover:[text-shadow:0_0_22px_rgba(24,119,242,0.55)]',
  },
];

function PlatformChip({ label, Icon, isCustom, iconHover, labelHover }) {
  const iconClass = cn(
    'h-5 w-5 shrink-0 text-canvas/60 transition-all duration-300',
    iconHover
  );

  const labelClass = cn(
    'inline-block font-display text-sm font-semibold tracking-tight text-canvas/70 transition-all duration-300 md:text-base',
    labelHover
  );

  return (
    <div
      className="group flex shrink-0 cursor-default select-none items-center gap-2.5 px-1 py-1"
      aria-hidden
    >
      {isCustom ? (
        <Icon className={iconClass} />
      ) : (
        <Icon className={iconClass} strokeWidth={1.5} aria-hidden />
      )}
      <span className={labelClass}>{label}</span>
    </div>
  );
}

function MarqueeTrack() {
  const sequence = Array.from({ length: MARQUEE_SEGMENT_COPIES }, () => PLATFORMS).flat();
  const marqueeStyle =
    /** @type {React.CSSProperties & { '--marquee-segments': string }} */ ({
      '--marquee-segments': `${MARQUEE_SEGMENT_COPIES}`,
    });

  return (
    <div
      className="flex w-max items-center gap-12 md:gap-20 lg:gap-24 animate-platform-marquee will-change-transform"
      style={marqueeStyle}
    >
      {sequence.map((p, i) => (
        <PlatformChip
          key={`${p.key}-${i}`}
          label={p.label}
          Icon={p.Icon}
          isCustom={p.isCustom}
          iconHover={p.iconHover}
          labelHover={p.labelHover}
        />
      ))}
    </div>
  );
}

/**
 * Infinite horizontal ticker above the creators grid — matches landing typography & palette (canvas / ink / spark).
 */
export default function PlatformMarquee() {
  const handleGoToPhilosophy = () => {
    const topLine = document.getElementById('about-top-line');
    if (topLine) {
      const navbarOffset = 64;
      const y = topLine.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return;
    }

    const section = document.getElementById('about');
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="relative bg-ink overflow-hidden"
      aria-label="Redes y plataformas"
    >
      {/* Spark accent — aligns with landing hairlines */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/45 block mb-4 md:mb-5">
            / Alcance
          </span>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-canvas leading-[0.95]">
            Creadores de todas las
            <br />
            <span className="whitespace-nowrap">plataformas</span>
          </h2>
          <button
            type="button"
            onClick={handleGoToPhilosophy}
            className="liquid-glass-strong mt-8 inline-flex items-center rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-canvas transition-transform duration-300 hover:-translate-y-0.5"
          >
            Como funciona
          </button>
        </motion.div>
      </div>

      <div className="relative pb-12 pt-2 md:pt-3">
        {/* Edge fade so scroll feels editorial */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 md:w-24 bg-gradient-to-r from-ink to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 md:w-24 bg-gradient-to-l from-ink to-transparent"
          aria-hidden
        />

        <div className="relative overflow-hidden">
          <MarqueeTrack />
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
