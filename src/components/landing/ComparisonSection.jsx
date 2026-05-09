import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollExploreHint from './ScrollExploreHint';

/** Premium Anza card — iris → spark glow on a dark base */
const HIGHLIGHT_BG_STYLE = {
  backgroundImage: `
    radial-gradient(80% 60% at 50% 0%, rgba(232, 255, 0, 0.18) 0%, rgba(107, 47, 250, 0.18) 50%, rgba(10, 10, 10, 0) 100%),
    linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)
  `,
};

const ROWS = [
  {
    feature: 'Creadores de contenido aplican a tus campañas',
    diy: 'DMs fríos, ~80% sin respuesta',
  },
  {
    feature: 'Chatea, entrevista, firma contratos y gestiona tus campañas con cada creador',
    diy: 'WhatsApp + DM de Instagram + Video calls',
  },
  {
    feature: 'Dashboard de rendimiento por creador en tiempo real',
    diy: 'Hojas de cálculo o revisiones manuales',
  },
  {
    feature: 'Pagos en un clic y bonos automatizados',
    diy: 'Transferencias bancarias, efectivo o bonos',
  },
  {
    feature: 'Los creadores publican desde sus cuentas',
    diy: 'Coordinas uno por uno',
  },
  {
    feature: 'Entrevistas automatizadas + notificaciones',
    diy: 'WhatsApp + correo + seguimiento manual',
  },
];

export default function ComparisonSection() {
  return (
    <section
      id="comparison"
      className="relative bg-ink"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 md:py-14 lg:py-16">
        <div className="h-px bg-canvas/10 mt-4 md:mt-6 mb-8 md:mb-10" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto mb-8 md:mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-4">
            / Comparativa
          </span>
          <div className="w-12 h-[2px] bg-spark mx-auto mb-6 md:mb-8 shadow-[0_0_10px_rgba(232,255,0,0.55)]" />
          <h2
            id="comparison-heading"
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-canvas leading-[0.95]"
          >
            El nuevo estándar para marketing con creadores
          </h2>
          <p className="mt-5 md:mt-6 font-display text-base md:text-lg text-canvas/75 leading-relaxed max-w-[500px] mx-auto">
            Por qué Anza es la opción más clara para vídeos que rinden de verdad.
          </p>
        </motion.div>

        {/* Mobile — legible cards */}
        <div className="md:hidden space-y-4">
          {ROWS.map((row) => (
            <div
              key={row.feature}
              className="rounded-2xl border border-canvas/[0.08] bg-ink/40 overflow-hidden divide-y divide-canvas/[0.06]"
            >
              <p className="font-display text-sm font-semibold text-canvas leading-snug px-4 py-3 bg-ink/70">
                {row.feature}
              </p>
              <div className="grid grid-cols-2 divide-x divide-canvas/[0.06]">
                <div
                  className="flex flex-col items-center justify-center gap-2 py-4 px-3 min-h-[4.5rem]"
                  style={HIGHLIGHT_BG_STYLE}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-spark">
                    Anza
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-spark shadow-sm">
                    <Check className="w-4 h-4 text-ink shrink-0" strokeWidth={2.5} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-col justify-center py-4 px-3 bg-ink/30">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 mb-1">
                    Por tu cuenta
                  </span>
                  <p className="text-xs text-canvas/60 leading-snug">{row.diy}</p>
                </div>
              </div>
            </div>
          ))}
          <a
            href="/waitlist"
            className="flex w-full justify-center rounded-full bg-spark px-8 py-4 font-mono text-xs uppercase tracking-widest text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(232, 255, 0,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
          >
            Empieza gratis
          </a>
        </div>

        {/* Desktop — three columns: labels | Anza card | DIY */}
        <div className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 items-start justify-center max-w-[1200px] mx-auto">
          <div className="shrink-0 w-[min(100%,22rem)] lg:w-[26rem]">
            {/* Matches combined header row height in columns 2–3 */}
            <div className="min-h-[3.75rem] border-b border-transparent" aria-hidden />
            {ROWS.map((row) => (
              <div
                key={row.feature}
                className="min-h-[4.25rem] flex items-center border-t border-canvas/[0.08] py-3"
              >
                <p className="font-display text-[13px] lg:text-sm text-canvas leading-snug pr-2">
                  {row.feature}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex-1 max-w-[280px] lg:max-w-xs rounded-[28px] lg:rounded-[32px] border border-spark/30 shadow-[0_20px_48px_-14px_rgba(232, 255, 0,0.35)] overflow-hidden flex flex-col min-w-0"
            style={HIGHLIGHT_BG_STYLE}
          >
            <div className="min-h-[3.75rem] flex items-center justify-center border-b border-canvas/10 px-3">
              <span className="font-display font-bold text-base lg:text-lg text-spark tracking-tight">
                Anza
              </span>
            </div>
            <div className="flex flex-col flex-1 divide-y divide-canvas/10">
              {ROWS.map((row) => (
                <div
                  key={row.feature}
                  className="flex flex-1 min-h-[4.25rem] items-center justify-center py-2.5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-spark shadow-sm">
                    <Check className="w-[18px] h-[18px] text-ink" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="sr-only">Incluido en Anza: {row.feature}</span>
                </div>
              ))}
            </div>
            <div className="p-4 lg:p-5 pt-3">
              <a
                href="/waitlist"
                className="flex w-full justify-center rounded-full bg-spark px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(232, 255, 0,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
              >
                Empieza gratis
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-[280px] lg:max-w-xs rounded-2xl border border-canvas/[0.08] bg-ink/40 overflow-hidden flex flex-col min-w-0">
            <div className="min-h-[3.75rem] flex items-center justify-center border-b border-canvas/[0.08] px-3 rounded-t-2xl">
              <span className="font-display font-bold text-base lg:text-lg text-canvas/75 tracking-tight">
                Por tu cuenta
              </span>
            </div>
            <div className="flex flex-col divide-y divide-canvas/[0.06] flex-1">
              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`flex flex-1 min-h-[4.25rem] items-center px-3 lg:px-4 py-3 ${
                    i % 2 === 0 ? 'bg-ink/30' : 'bg-ink/50'
                  }`}
                >
                  <p className="font-display text-[13px] lg:text-sm text-canvas/65 leading-snug">
                    {row.diy}
                  </p>
                </div>
              ))}
            </div>
            <div className="min-h-[76px]" aria-hidden />
          </div>
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
