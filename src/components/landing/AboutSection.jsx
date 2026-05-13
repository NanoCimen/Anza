import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '+2,500', label: 'Creadores' },
  { value: '+4', label: 'Países' },
  { value: '$1.2M', label: 'Pagado a creadores' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="section-light bg-ink relative overflow-x-clip overflow-y-visible pb-8 md:pb-10">
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 md:px-3">
        <div id="about" className="scroll-mt-0 pt-6 md:pt-8 mb-16 md:mb-24" />

        <div className="mx-auto max-w-[980px] text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-[980px] font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]"
            >
              Creemos que cualquiera con una cámara tiene {' '}
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block bg-[#B84DFF] px-1.5 md:px-2 text-white shadow-[0_0_24px_rgba(184,77,255,0.7)]"
              >
                el poder de mover
              </motion.span>{' '}
              una marca.
            </motion.h2>

            <div className="mx-auto mt-6 max-w-[760px] text-left md:mt-8">
              <p className="font-display text-lg md:text-xl text-canvas/60 leading-relaxed text-justify">
              Anza es el primer marketplace donde creadores de América Latina conectan con marcas que necesitan contenido auténtico. Nació de una convicción simple — el mejor contenido no viene de estudios de producción. Viene de cualquier persona con un teléfono y algo real que decir. 
              
              </p>
              <p className="font-display text-lg md:text-xl text-canvas/60 leading-relaxed text-justify mt-8">
              Plataformas como Instagram, TikTok y YouTube ya no funcionan por seguidores - sino que por el For you page, la cual permite el consumo de contenido organico que es mas digerible para el usuario y no presentado como publicitario.
              </p>

              <p className="font-display text-lg md:text-xl text-canvas/60 leading-relaxed text-justify mt-8">
              Aquí las marcas encuentran creadores, lanzan campañas, trackean resultados y pagan automáticamente — sin agencias, sin intermediarios, sin fricción. Un solo lugar para todo el proceso.
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
                }}
                className="mt-12 grid grid-cols-1 gap-6 text-center sm:grid-cols-3"
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
                    <span className="font-nav text-sm font-medium leading-none tracking-[0.02em] uppercase text-[#666660] block mt-2">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/creadores"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-3.5 font-display text-sm font-semibold tracking-wide text-white ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] md:text-base"
                  style={{ backgroundColor: '#7B2CFF' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E1395')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7B2CFF')}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">Conviértete en creador</span>
                </a>
                <a
                  href="/marcas"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-9 py-3.5 font-display text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-spark/70 hover:bg-spark/15 hover:text-spark hover:shadow-[0_10px_30px_rgba(207,174,255,0.2)] md:text-base"
                >
                  Conviértete en marca
                </a>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
