import React from 'react';
import { motion } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';

const BLOCKS = [
  {
    id: 'creadores',
    label: '/ Talento',
    title: 'Para Creadores',
    body: 'Aplica gratis a campañas de marcas y cobra por tu contenido — sin importar cuántos seguidores tienes. ',
    cta: 'Ver Creadores',
    href: '/creadores',
    image: '/images/paracreadores.png',
    imageAlt: 'Creador grabando contenido para una marca con cámara y producto Anza',
  },
  {
    id: 'marcas',
    label: '/ Equipos',
    title: 'Para Marcas',
    body: 'En vez de destinar tu presupuesto a un único creador, activa a decenas de creadores hablando de tu producto al mismo tiempo. Más impacto, menos dinero.',
    cta: 'Ver Marcas',
    href: '/marcas',
    image: '/images/brands.png',
    imageAlt: 'Variedad de marcas y productos disponibles para campañas en Anza',
  },
  {
    id: 'agencias',
    label: '/ Escala',
    title: 'Para Agencias',
    body: 'Gestiona clientes, trackea campañas y paga creadores automáticamente — todo desde un solo lugar.',
    cta: 'Hablar con Equipo',
    href: '/demo',
    image: '/images/agencydash.png',
    imageAlt: 'Dashboard de agencia en Anza con métricas, plataformas y top contenido',
  },
];

function EditorialRow({ block, index }) {
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="group relative liquid-glass-neutral rounded-2xl p-2 md:p-3"
      >
        <div className="relative h-[260px] md:h-[320px] overflow-hidden rounded-xl bg-ink">
          <img
            src={block.image}
            alt={block.imageAlt || block.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
      </motion.div>

      <div className="liquid-glass rounded-2xl p-6 md:p-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/45 block mb-3">
          {block.label}
        </span>
        <h3 className="font-display font-black text-3xl md:text-5xl tracking-tighter text-canvas leading-[0.95]">
          {block.title}
        </h3>
        <p className="mt-5 font-display text-sm md:text-base text-canvas/65 leading-relaxed max-w-md">
          {block.body}
        </p>
        <a
          href={block.href}
          className="group relative mt-7 inline-flex items-center justify-center overflow-hidden px-9 py-3.5 font-display font-semibold text-white text-sm md:text-base tracking-wide ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)]"
          style={{ backgroundColor: '#6B2FFA' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5A22E0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6B2FFA')}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
          <span className="relative">{block.cta}</span>
        </a>
      </div>
    </motion.article>
  );
}

export default function EditorialAudienceSection() {
  return (
    <section
      id="audience"
      className="relative scroll-mt-24 md:scroll-mt-28 bg-ink py-16 md:py-24 overflow-hidden"
      aria-labelledby="audience-heading"
    >
      {/* Spark yellow aura — anchored above the section so it bleeds in softly without a hard line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%] z-0"
        style={{
          background:
            'radial-gradient(80% 110% at 50% -40%, rgba(232,255,0,0.18) 0%, rgba(232,255,0,0.06) 45%, rgba(232,255,0,0) 80%)',
        }}
      />
      {/* Iris purple bottom blend — fades from ink up to solid iris at the seam (matches Como funciona) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] md:h-[45%] z-0"
        style={{
          background:
            'linear-gradient(to top, #6B2FFA 0%, rgba(107,47,250,0.7) 12%, rgba(107,47,250,0.3) 35%, rgba(107,47,250,0) 75%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="h-px bg-canvas/10 mt-4 md:mt-6 mb-8 md:mb-10" />

        <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block text-center mb-4">
          / Aplicamos para todos
        </span>
        <div className="w-12 h-[2px] bg-spark mx-auto mb-8 md:mb-12 shadow-[0_0_10px_rgba(232,255,0,0.55)]" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <span className="sr-only">Aplicamos para todos</span>
          <h2
            id="audience-heading"
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-canvas leading-[0.95]"
          >
            Creadores, Marcas y Agencias
          </h2>
        </motion.div>

        <div className="space-y-10 md:space-y-12">
          {BLOCKS.map((block, index) => (
            <EditorialRow key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
