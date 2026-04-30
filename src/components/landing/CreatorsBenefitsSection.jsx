import React from 'react';
import { motion } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';

export default function CreatorsBenefitsSection() {
  return (
    <section className="relative bg-canvas py-16 md:py-24" aria-labelledby="creators-benefits-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div id="creators-article-top-line" className="h-px bg-ink/10 mb-16 md:mb-24" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[780px] mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-4">
            / CREADORES UGC
          </span>

          <h2
            id="creators-benefits-heading"
            className="font-display font-black text-5xl md:text-7xl tracking-tighter text-ink leading-[0.92]"
          >
            Monetiza tu contenido sin ser famoso
          </h2>

          <div className="mt-10 space-y-8">
            <p className="font-display text-[18px] leading-[1.8] text-ink/70">
              Las marcas ya están buscando creadores como tú. No buscan a alguien famoso — buscan a
              alguien que sepa crear contenido que se sienta real y están dispuestas a pagar por eso.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-ink/70">
              El contenido orgánico hace lo que los anuncios nunca pudieron. Una persona hablando de
              un producto desde su cuarto llega más lejos que una campaña producida en estudio. Las
              marcas lo saben y por eso cada vez más están apostando por creadores en lugar de
              producción tradicional.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-ink/70">
              Anza está construyendo el primer marketplace de creadores para América Latina. Un lugar
              donde puedas aplicar a campañas de marcas reales sin necesitar miles de seguidores ni
              experiencia previa. Donde cobras directamente — más bonos cuando tu contenido llega
              lejos. Sin intermediarios.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-ink/70">
              Todavía no hemos lanzado. Pero los primeros 100 creadores que se unan van a tener
              acceso prioritario a las mejores campañas cuando abramos.
            </p>

            <p className="font-display text-[18px] leading-[1.8] text-ink/70">
              Si creas contenido y quieres que tu trabajo empiece a generar ingresos reales — este es
              tu momento de entrar antes que todos.
            </p>
          </div>

          <a
            href="/waitlist/creadores"
            className="liquid-glass-strong mt-10 inline-flex items-center rounded-full px-8 py-4 bg-ink border border-ink text-spark font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-spark hover:text-ink hover:shadow-[0_10px_30px_rgba(232,255,0,0.35)] focus:outline-none focus:ring-4 focus:ring-spark"
          >
            Aplica gratis
          </a>
        </motion.div>
      </div>

      <ScrollExploreHint />
    </section>
  );
}
