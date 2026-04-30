import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';

const STATS = [
  { value: '+2,500', label: 'Creadores' },
  { value: '+4', label: 'Países' },
  { value: '$1.2M', label: 'Pagado a creadores' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const highlightHeight = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '130%']);

  return (
    <section id="about" ref={sectionRef} className="bg-canvas scroll-mt-24 md:scroll-mt-28 py-24 md:py-40 relative overflow-hidden">
      {/* Hairline separator */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div id="about-top-line" className="h-px bg-ink/10 mt-4 md:mt-6 mb-16 md:mb-24" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          {/* Column 1 — Sticky Label */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-2">
                / Nosotros
              </span>
              <div className="w-12 h-[2px] bg-spark mt-4 shadow-[0_0_10px_rgba(232,255,0,0.55)]" />

              {/* Stats */}
              <div className="mt-12 space-y-6">
                {STATS.map(s => (
                  <div key={s.label}>
                    <span className="inline-block font-display font-black text-2xl md:text-3xl text-ink [filter:blur(8px)] transition-transform duration-300 hover:scale-[1.05]">
                      {s.value}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#666660] block mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2-3 — Content */}
          <div className="md:col-span-9 md:pl-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-ink leading-[0.95]"
            >
              Creemos que cualquiera con una cámara tiene {' '}
              <span className="relative inline-block">
                <span className="relative z-10">el poder de mover</span>
                <motion.span
                  style={{ height: highlightHeight }}
                  className="absolute -bottom-1 left-0 right-0 bg-spark/65 z-0 shadow-[0_0_18px_rgba(232,255,0,0.45)]"
                />
              </span>{' '}
              una marca.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 md:mt-16 max-w-2xl"
            >
              <p className="font-display text-lg md:text-xl text-ink/60 leading-relaxed">
                Anza nació de una convicción simple: la próxima generación del marketing global se
                está construyendo en estudios de Santo Domingo, Medellín, Ciudad de México y São
                Paulo. Construimos el primer marketplace diseñado para este ecosistema —
                conectando creadores reales de LATAM con marcas que necesitan autenticidad.
              </p>

              <p className="font-display text-lg md:text-xl text-ink/60 leading-relaxed mt-8">
                Nuestra plataforma elimina la fricción entre encontrar un creador y lanzar una
                campaña. Sin agencias. Sin intermediarios. Cada creador en Anza es seleccionado,
                cada conexión es intencional, y cada campaña es una oportunidad real de crecimiento.
              </p>
            </motion.div>

            {/* Manifesto line */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 md:mt-24 border-t border-ink/10 pt-8"
            >
              <blockquote className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-ink tracking-tight leading-tight">
                "El proximo video viral de tu marca lo esta grabando alguien que todavia no
                conoces."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
