import React from 'react';
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

function PlatformChip({ label, Icon, isCustom, iconHover, labelHover, tone }) {
  const iconClass = cn(
    'h-8 w-8 shrink-0 transition-all duration-300 md:h-9 md:w-9',
    tone === 'dark' ? 'text-ink' : 'text-canvas/70',
    iconHover
  );

  const labelClass = cn(
    'inline-block font-display text-lg font-semibold tracking-tight transition-all duration-300 md:text-xl',
    tone === 'dark' ? 'text-ink' : 'text-canvas/80',
    labelHover
  );

  return (
    <div
      className="group flex shrink-0 cursor-default select-none items-center gap-4 px-1 py-2"
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

function MarqueeTrack({ tone }) {
  const sequence = Array.from({ length: MARQUEE_SEGMENT_COPIES }, () => PLATFORMS).flat();
  const marqueeStyle =
    /** @type {React.CSSProperties & { '--marquee-segments': string }} */ ({
      '--marquee-segments': `${MARQUEE_SEGMENT_COPIES}`,
    });

  return (
    <div
      className="flex w-max items-center gap-16 md:gap-28 lg:gap-32 animate-platform-marquee will-change-transform"
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
          tone={tone}
        />
      ))}
    </div>
  );
}

/**
 * Infinite horizontal ticker above the creators grid — matches landing typography & palette (canvas / ink / lavender).
 */
export default function PlatformMarquee({
  backgroundClass = 'bg-transparent',
  edgeFadeFrom = 'from-black',
  showEdgeFade = true,
  tone = 'light',
}) {
  return (
    <section
      className={`relative overflow-hidden ${backgroundClass}`}
      aria-label="Redes y plataformas"
    >
      <div className="relative z-10 pt-7 pb-4 md:pt-8 md:pb-5">
        {/* Edge fade so scroll feels editorial */}
        {showEdgeFade && (
          <>
            <div
              className={`pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r ${edgeFadeFrom} to-transparent md:w-24`}
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l ${edgeFadeFrom} to-transparent md:w-24`}
              aria-hidden
            />
          </>
        )}

        <div className="relative overflow-hidden">
          <MarqueeTrack tone={tone} />
        </div>
      </div>
    </section>
  );
}
