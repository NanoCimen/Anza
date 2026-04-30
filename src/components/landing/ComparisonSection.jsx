import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ScrollExploreHint from './ScrollExploreHint';

/** Brand spark yellow — soft wash into saturated accent (replaces blue reference) */
const HIGHLIGHT_BG_STYLE = {
  backgroundImage: `
    radial-gradient(71.9% 62.07% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.45) 100%),
    linear-gradient(180deg, #FFFFFB 0%, #FFFCE8 32%, #FFF6B3 58%, #E8FF00 100%)
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
      className="relative bg-canvas border-y border-ink/10"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-10 md:py-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto mb-8 md:mb-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-4 md:mb-5">
            / Comparativa
          </span>
          <h2
            id="comparison-heading"
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-ink leading-[0.95]"
          >
            El nuevo estándar para marketing con creadores
          </h2>
          <p className="mt-5 md:mt-6 font-display text-base md:text-lg text-ink/75 leading-relaxed max-w-[500px] mx-auto">
            Por qué Anza es la opción más clara para vídeos que rinden de verdad.
          </p>
        </motion.div>

        {/* Mobile — legible cards */}
        <div className="md:hidden space-y-4">
          {ROWS.map((row) => (
            <div
              key={row.feature}
              className="rounded-2xl border border-ink/[0.06] bg-white overflow-hidden divide-y divide-ink/[0.06]"
            >
              <p className="font-display text-sm font-semibold text-ink leading-snug px-4 py-3 bg-canvas/80">
                {row.feature}
              </p>
              <div className="grid grid-cols-2 divide-x divide-ink/[0.06]">
                <div
                  className="flex flex-col items-center justify-center gap-2 py-4 px-3 min-h-[4.5rem]"
                  style={HIGHLIGHT_BG_STYLE}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/55">
                    Anza
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-ink/10">
                    <Check className="w-4 h-4 text-ink shrink-0" strokeWidth={2.5} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-col justify-center py-4 px-3 bg-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-1">
                    Por tu cuenta
                  </span>
                  <p className="text-xs text-ink/70 leading-snug">{row.diy}</p>
                </div>
              </div>
            </div>
          ))}
          <a
            href="/waitlist"
            className="flex w-full justify-center rounded-full bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-ink/90 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
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
                className="min-h-[4.25rem] flex items-center border-t border-ink/[0.06] py-3"
              >
                <p className="font-display text-[13px] lg:text-sm text-ink leading-snug pr-2">
                  {row.feature}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex-1 max-w-[280px] lg:max-w-xs rounded-[28px] lg:rounded-[32px] border border-ink/[0.12] shadow-[0_20px_48px_-14px_rgba(232,255,0,0.45)] overflow-hidden flex flex-col min-w-0"
            style={HIGHLIGHT_BG_STYLE}
          >
            <div className="min-h-[3.75rem] flex items-center justify-center border-b border-ink/10 px-3">
              <span className="font-display font-bold text-base lg:text-lg text-ink tracking-tight">
                Anza
              </span>
            </div>
            <div className="flex flex-col flex-1 divide-y divide-ink/15">
              {ROWS.map((row) => (
                <div
                  key={row.feature}
                  className="flex flex-1 min-h-[4.25rem] items-center justify-center py-2.5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-ink/10">
                    <Check className="w-[18px] h-[18px] text-ink" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="sr-only">Incluido en Anza: {row.feature}</span>
                </div>
              ))}
            </div>
            <div className="p-4 lg:p-5 pt-3">
              <a
                href="/waitlist"
                className="flex w-full justify-center rounded-full bg-ink text-canvas font-mono text-[11px] uppercase tracking-widest px-6 py-3.5 hover:bg-ink/90 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
              >
                Empieza gratis
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-[280px] lg:max-w-xs rounded-2xl border border-ink/[0.06] bg-white overflow-hidden flex flex-col min-w-0 shadow-sm">
            <div className="min-h-[3.75rem] flex items-center justify-center border-b border-ink/[0.06] px-3 rounded-t-2xl bg-white">
              <span className="font-display font-bold text-base lg:text-lg text-ink/75 tracking-tight">
                Por tu cuenta
              </span>
            </div>
            <div className="flex flex-col divide-y divide-ink/[0.06] flex-1">
              {ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`flex flex-1 min-h-[4.25rem] items-center px-3 lg:px-4 py-3 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-ink/[0.03]'
                  }`}
                >
                  <p className="font-display text-[13px] lg:text-sm text-ink/70 leading-snug">
                    {row.diy}
                  </p>
                </div>
              ))}
            </div>
            <div className="min-h-[76px] bg-white" aria-hidden />
          </div>
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
