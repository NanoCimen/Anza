import React from 'react';
import { motion } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';

const BACKGROUND_PM = new URL('../../../backgroundPM.png', import.meta.url).href;

export default function MarcasBenefitsSection() {
  return (
    <section
      className="section-light relative min-h-screen py-24 md:py-32"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${BACKGROUND_PM})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      aria-labelledby="marcas-benefits-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-black/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-b from-transparent via-black/70 to-black md:h-72"
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-3 md:px-3">
        <div id="marcas-article-top-line" className="h-0" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[820px]"
        >
          <h2
            id="marcas-benefits-heading"
            className="font-bold text-center text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]"
          >
            ASÍ FUNCIONA EL UGC PARA MARCAS
          </h2>

          <div className="mt-10 space-y-8">
            <p className="font-display text-[18px] leading-[1.8] text-canvas/70 text-justify">
              Si tu marca todavía está pagando por influencers con miles de seguidores hay algo que
              necesitas saber. El algoritmo de TikTok e Instagram ya no funciona por followers —
              funciona por contenido. Un video que conecta llega lejos sin importar quién lo grabó.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-canvas/70 text-justify">
              Ahí es donde entra el UGC. Un creador UGC graba videos de tu producto desde su casa
              con su teléfono sin producción. Se siente real porque lo es. No hay guión rígido ni
              set de filmación ni presupuesto de producción — solo alguien hablando de algo de
              forma natural y eso es exactamente lo que la gente quiere ver.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="platform-feature-card liquid-glass flex flex-col gap-4 rounded-2xl p-8 min-w-0"
            >
              <h3 className="font-display font-black text-2xl tracking-tighter text-canvas leading-tight">
                Creadores por plataformas
              </h3>
              <div className="mt-4 h-[130px] md:h-[155px] bg-ink/70 border border-canvas/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full border border-canvas/20 bg-ink/90" />
                </div>
                <div className="absolute top-6 left-8 h-7 w-7 rounded-full border border-canvas/20 bg-ink/90" />
                <div className="absolute top-6 right-8 h-7 w-7 rounded-full border border-canvas/20 bg-ink/90" />
                <div className="absolute bottom-7 left-12 h-6 w-6 rounded-full border border-canvas/20 bg-ink/90" />
                <div className="absolute bottom-6 right-10 h-6 w-6 rounded-full border border-canvas/20 bg-ink/90" />
              </div>
              <p className="mt-4 font-display text-sm leading-relaxed text-canvas/60 text-justify">
                Personas que ya crean en estas plataformas ya saben lo que se guarda y se comparte, y pueden convertir tu
                marca en parte de su contenido regular.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="platform-feature-card liquid-glass flex flex-col gap-4 rounded-2xl p-8 min-h-[250px] md:min-h-[280px] min-w-0"
            >
              <h3 className="font-display font-black text-2xl tracking-tighter text-canvas leading-tight">
                Alto volumen de contenido
              </h3>
              <div className="mt-2 h-[130px] md:h-[155px] bg-ink/70 border border-canvas/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink/[0.04]" />
              </div>
              <p className="mt-2 font-display text-sm leading-relaxed text-canvas/60 text-justify">
                Produce gran cantidad de videos sin saturarte de producción. Mientras más videos
                significa más feedback más rápido y una mejor comprensión de lo que genera
                visualizaciones y conversiones.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="platform-feature-card liquid-glass flex flex-col gap-4 rounded-2xl p-8 min-h-[250px] md:min-h-[280px] min-w-0"
            >
              <h3 className="font-display font-black text-2xl tracking-tighter text-canvas leading-tight">
                Contenido que se siente real
              </h3>
              <div className="mt-2 h-[130px] md:h-[155px] bg-ink/70 border border-canvas/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink/[0.04]" />
              </div>
              <p className="mt-2 font-display text-sm leading-relaxed text-canvas/60 text-justify">
                Cuando tu contenido generado por el usuario se parece al resto de la página principal (FYP), y no a un anuncio
                reutilizado, atrae más atención y credibilidad porque coincide con lo que la gente
                espera cuando navega por estas plataformas.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <ScrollExploreHint align="center" hideOnHash={undefined} />
    </section>
  );
}
