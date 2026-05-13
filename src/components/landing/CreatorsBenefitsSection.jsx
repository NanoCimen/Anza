import React from 'react';
import { motion } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';

const BACKGROUND_PC = new URL('../../../backgroundPC.png', import.meta.url).href;

export default function CreatorsBenefitsSection() {
  return (
    <section
      className="section-light relative min-h-screen py-24 md:py-32"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${BACKGROUND_PC})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      aria-labelledby="creators-benefits-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-black/25"
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-3 md:px-3">
        <div id="creators-article-top-line" className="scroll-mt-24" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[820px]"
        >
          <h2
            id="creators-benefits-heading"
            className="font-bold text-white text-center [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]"
          >
            CREADORES UGC
          </h2>

          <div className="mt-10 space-y-8">
            <p className="font-display text-[18px] leading-[1.8] text-canvas/70">
              Las marcas ya están buscando creadores como tú. No buscan a alguien famoso — buscan a
              alguien que sepa crear contenido que se sienta real y están dispuestas a pagar por eso.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-canvas/70">
              El contenido orgánico hace lo que los anuncios nunca pudieron. Una persona hablando de
              un producto desde su cuarto llega más lejos que una campaña producida en estudio. Las
              marcas lo saben y por eso cada vez más están apostando por creadores en lugar de
              producción tradicional.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-canvas/70">
              Anza está construyendo el primer marketplace de creadores para América Latina. Un lugar
              donde puedas aplicar a campañas de marcas reales sin necesitar miles de seguidores ni
              experiencia previa. Donde cobras directamente — más bonos cuando tu contenido llega
              lejos. Sin intermediarios.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-canvas/70">
              Todavía no hemos lanzado. Pero los primeros 100 creadores que se unan van a tener
              acceso prioritario a las mejores campañas cuando abramos.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-canvas/70">
              Si creas contenido y quieres que tu trabajo empiece a generar ingresos reales — este es
              tu momento de entrar antes que todos.
            </p>
          </div>

          <a
            href="/waitlist/creadores"
            className="group relative mt-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-iris px-9 py-3.5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-anza-deep hover:shadow-[0_14px_30px_-12px_rgba(123,44,255,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] focus:outline-none focus:ring-4 focus:ring-iris/40"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative">Aplica gratis</span>
          </a>
        </motion.div>
      </div>

      <ScrollExploreHint align="center" hideOnHash={undefined} />
    </section>
  );
}
