import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { background2 } from '@/assets';

/** Premium Anza card — lavender + glow wash on deep purple */
const HIGHLIGHT_BG_STYLE = {
  backgroundImage: `
    radial-gradient(80% 60% at 50% 0%, rgba(207, 174, 255, 0.22) 0%, rgba(123, 44, 255, 0.2) 50%, rgba(75, 17, 119, 0) 100%),
    linear-gradient(180deg, #3d1560 0%, #1a0a2e 100%)
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
      className="section-light relative bg-ink overflow-x-clip overflow-y-visible"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${background2})`,
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
      }}
      aria-labelledby="comparison-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 bg-gradient-to-b from-black via-black/80 to-transparent md:h-72"
      />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 py-10 md:py-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl mx-auto mb-8 md:mb-10"
        >
          <h2
            id="comparison-heading"
            className="mx-auto max-w-[980px] font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]"
          >
            Estamos impulsando el nuevo estándar para marketing con creadores
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
                  <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-spark">
                    Anza
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-spark shadow-sm">
                    <Check className="w-4 h-4 text-ink shrink-0" strokeWidth={2.5} aria-hidden />
                  </span>
                </div>
                <div className="flex flex-col justify-center py-4 px-3 bg-ink/30">
                  <span className="mb-1 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas/40">
                    Por tu cuenta
                  </span>
                  <p className="text-xs text-canvas/60 leading-snug">{row.diy}</p>
                </div>
              </div>
            </div>
          ))}
          <a
            href="/waitlist"
            className="flex w-full justify-center rounded-full bg-spark px-8 py-4 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(207,174,255,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
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
            className="flex-1 max-w-[280px] lg:max-w-xs rounded-[28px] lg:rounded-[32px] border border-spark/30 shadow-[0_20px_48px_-14px_rgba(207, 174, 255,0.35)] overflow-hidden flex flex-col min-w-0"
            style={HIGHLIGHT_BG_STYLE}
          >
            <div className="min-h-[3.75rem] flex items-center justify-center border-b border-canvas/10 px-3">
              <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-spark">
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
                className="flex w-full justify-center rounded-full bg-spark px-6 py-3.5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(207,174,255,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
              >
                Empieza gratis
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-[280px] lg:max-w-xs rounded-2xl border border-canvas/[0.08] bg-ink/40 overflow-hidden flex flex-col min-w-0">
            <div className="min-h-[3.75rem] flex items-center justify-center border-b border-canvas/[0.08] px-3 rounded-t-2xl">
              <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas/75">
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
    </section>
  );
}
