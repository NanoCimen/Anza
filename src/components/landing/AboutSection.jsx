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
  const headingRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.85', 'start 0.45'],
  });

  const highlightHeight = useTransform(scrollYProgress, [0, 1], ['0%', '110%']);

  // Parallax progress driven by the section itself
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const logoY = useTransform(sectionProgress, [0, 1], [40, -40]);
  const logoRotate = useTransform(sectionProgress, [0, 1], [-2, 2]);
  const sidebarY = useTransform(sectionProgress, [0, 1], [20, -20]);

  return (
    <section ref={sectionRef} className="bg-ink relative overflow-hidden pb-24 md:pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div id="about" className="scroll-mt-14 md:scroll-mt-16 pt-6 md:pt-8">
          <div id="about-top-line" className="h-px bg-canvas/10 mb-16 md:mb-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          {/* Column 1 — Sticky Label */}
          <div className="md:col-span-3">
            <motion.div
              style={{ y: sidebarY }}
              className="md:sticky md:top-24"
            >
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-2"
              >
                / Nosotros
              </motion.span>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-12 h-[2px] bg-spark mt-4 shadow-[0_0_10px_rgba(232, 255, 0,0.55)] origin-left"
              />

              {/* Stats — staggered reveal */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
                }}
                className="mt-12 space-y-6"
              >
                {STATS.map(s => (
                  <motion.div
                    key={s.label}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-block font-display font-black text-2xl md:text-3xl text-canvas [filter:blur(8px)] transition-transform duration-300 hover:scale-[1.05]">
                      {s.value}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#666660] block mt-1">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Anza mark — fades in then drifts with scroll */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 md:mt-16"
              >
                <motion.img
                  src="/anzaplogo.png"
                  alt="Anza"
                  style={{ y: logoY, rotate: logoRotate }}
                  className="h-16 w-16 md:h-20 md:w-20 object-contain select-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Column 2-3 — Content */}
          <div className="md:col-span-9 md:pl-8">
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-canvas leading-[0.95]"
            >
              Creemos que cualquiera con una cámara tiene {' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-ink">el poder de mover</span>
                <motion.span
                  style={{ height: highlightHeight }}
                  className="absolute -bottom-1 left-0 right-0 bg-spark z-0 shadow-[0_0_18px_rgba(232,255,0,0.55)]"
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
              <p className="font-display text-lg md:text-xl text-canvas/60 leading-relaxed">
              Anza es el marketplace donde creadores de América Latina conectan con marcas que necesitan contenido auténtico. Nació de una convicción simple — el mejor contenido no viene de estudios de producción. Viene de cualquier persona con un teléfono y algo real que decir. 
              
              </p>
              <p className="font-display text-lg md:text-xl text-canvas/60 leading-relaxed mt-8">
              Plataformas como Instagram, TikTok y YouTube ya no funcionan por seguidores - sino que por el For you page, la cual permite el consumo de contenido organico que es mas digerible para el usuario y no presentado como publicitario.
              </p>

              <p className="font-display text-lg md:text-xl text-canvas/60 leading-relaxed mt-8">
              Aquí las marcas encuentran creadores, lanzan campañas, trackean resultados y pagan automáticamente — sin agencias, sin intermediarios, sin fricción. Un solo lugar para todo el proceso.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
