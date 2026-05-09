import React from 'react';
import { motion } from 'framer-motion';
import {
  Youtube,
  Instagram,
  Facebook,
} from 'lucide-react';

import { cn } from '@/lib/utils';

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
    const target =
      document.getElementById('como-funciona') || document.getElementById('about');
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-label="Redes y plataformas"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/45 block mb-4">
            / Alcance
          </span>
          <div className="w-12 h-[2px] bg-spark mx-auto mb-6 md:mb-8 shadow-[0_0_10px_rgba(232,255,0,0.55)]" />
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-canvas leading-[0.95]">
            Creadores de todas las
            <br />
            <span className="whitespace-nowrap">plataformas</span>
          </h2>
          <motion.button
            type="button"
            onClick={handleGoToPhilosophy}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0, scale: 0.985 }}
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden px-6 py-2.5 font-display font-semibold text-white text-xs md:text-sm tracking-wide ring-1 ring-white/10 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)]"
            style={{ backgroundColor: '#6B2FFA' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5A22E0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6B2FFA')}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative">Como funciona</span>
          </motion.button>
        </motion.div>
      </div>

      <div className="relative z-10 pb-12 pt-2 md:pt-3">
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

      {/* Spark yellow bottom aura — anchored below the section to mirror the next section's top aura */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] z-[2]"
        style={{
          background:
            'radial-gradient(80% 110% at 50% 140%, rgba(232,255,0,0.18) 0%, rgba(232,255,0,0.06) 45%, rgba(232,255,0,0) 80%)',
        }}
        aria-hidden
      />
    </section>
  );
}
