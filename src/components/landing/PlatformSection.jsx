import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/** 6-column grid: top row keeps ⅓ + ⅔; bottom row is ½ + ½ (3 tracks each). */
const FEATURES = [
  {
    title: 'Encuentra creadores',
    body: 'Llega a miles de creadores al instante.',
    col: '1 / 3',
    row: '1 / 2',
  },
  {
    title: 'Mide resultados',
    body: 'Vistas, interacción y conversiones en tiempo real.',
    col: '3 / 7',
    row: '1 / 2',
  },
  {
    title: 'Gestiona tu roster',
    body: 'Organiza tu equipo y gestiona campañas sin problemas.',
    col: '1 / 4',
    row: '2 / 3',
  },
  {
    title: 'Pagos automatizados',
    body: 'Gestiona pagos y facturas sin trabajo manual.',
    col: '4 / 7',
    row: '2 / 3',
  },
];

/** Applies grid line placement only at md+ so mobile stays a single-column flow */
function useMdUp() {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return matches;
}

function Tile({ feature, delay, applyGridPlacement }) {
  return (
    <motion.article
      aria-label={`${feature.title}. ${feature.body}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      style={
        applyGridPlacement
          ? {
              gridColumn: feature.col,
              gridRow: feature.row,
            }
          : undefined
      }
      className="flex min-h-[200px] flex-col overflow-visible bg-gradient-to-b from-ink via-[#FFFCE8]/80 to-spark/[0.18] text-left md:min-h-[240px] lg:min-h-[300px]"
    >
      {/* Title + body: separate sizes; shared row still truncates as one line */}
      <div className="min-w-0 shrink-0 overflow-hidden px-6 pb-0 pt-5">
        <p title={`${feature.title}. ${feature.body}`} className="min-w-0 truncate whitespace-nowrap font-display leading-snug">
          <strong className="font-bold text-canvas text-[164px] md:text-[14px] lg:text-[15px]">
            {feature.title}.
          </strong>{' '}
          <span className="font-normal text-canvas/55 text-[11px] md:text-[12px] lg:text-[13px]">
            {feature.body}
          </span>
        </p>
      </div>

      {/* Lower band — slightly richer spark toward bottom */}
      <div
        className="mt-4 min-h-[120px] flex-1 bg-gradient-to-b from-transparent via-spark/[0.0001] to-spark/[0.3] md:min-h-[140px]"
        aria-hidden
      />
    </motion.article>
  );
}

export default function PlatformSection() {
  const applyGridPlacement = useMdUp();

  return (
    <section
      className="relative z-0 bg-ink border-b border-canvas/10"
      aria-labelledby="platform-features-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col gap-8 md:gap-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2
              id="platform-features-heading"
              className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-canvas leading-[0.95]"
            >
              Una Plataforma para Todas Tus Campañas
            </h2>
          </div>

          {/* 6×2 grid — hairline gutters; bottom row 50/50 via 3+3 tracks */}
          <div className="grid grid-cols-1 gap-px bg-canvas/10 md:grid-cols-6 md:grid-rows-[auto_auto]">
            {FEATURES.map((f, i) => (
              <Tile key={f.title} feature={f} delay={i * 0.05} applyGridPlacement={applyGridPlacement} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
