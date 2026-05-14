import React from 'react';
import { motion } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';
import { background2 } from '@/assets';

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
          className="group relative mt-7 inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-3.5 font-display font-semibold text-white text-sm md:text-base tracking-wide ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)]"
          style={{ backgroundColor: '#7B2CFF' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E1395')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7B2CFF')}
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
      className="section-light relative scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 overflow-x-clip overflow-y-visible"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${background2})`,
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
      }}
      aria-labelledby="audience-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 bg-gradient-to-b from-black via-black/80 to-transparent md:h-72"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <h2
            id="audience-heading"
            className="mx-auto max-w-[980px] font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]"
          >
            Estamos impulsando la próxima era del éxito independiente para todos los creadores.
          </h2>
        </motion.div>

        <div className="space-y-10 md:space-y-12">
          {BLOCKS.map((block, index) => (
            <EditorialRow key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>
      <ScrollExploreHint hideOnHash={undefined} />
    </section>
  );
}
