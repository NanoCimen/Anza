import React from 'react';
import { motion } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';

const BLOCKS = [
  {
    id: 'creadores',
    label: '/ Talento',
    title: 'Rapido para Creadores',
    body: 'Aplica a campañas de marcas y cobra por tu contenido. Sin agencia. Sin intermediarios.',
    cta: 'Ver Creadores',
    href: '/creadores',
    tint: 'from-spark/60 via-canvas/40 to-canvas',
  },
  {
    id: 'marcas',
    label: '/ Equipos',
    title: 'Rapido para Marcas',
    body: 'Encuentra perfiles alineados, coordina feedback y mide rendimiento creativo en tiempo real.',
    cta: 'Ver Marcas',
    href: '/marcas',
    tint: 'from-[#f6d7e8]/80 via-canvas/45 to-canvas',
  },
  {
    id: 'agencias',
    label: '/ Escala',
    title: 'Rapido para Agencias',
    body: 'Opera multiples clientes con workflows estandarizados, aprobaciones rapidas y control total.',
    cta: 'Hablar con Equipo',
    href: '/demo',
    tint: 'from-[#cfd4ff]/80 via-canvas/45 to-canvas',
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
        <div className="relative h-[260px] md:h-[320px] overflow-hidden rounded-xl bg-canvas">
          <img
            src="/creadores.ong.png"
            alt={block.title}
            className="h-full w-full object-cover opacity-85 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </div>
      </motion.div>

      <div className="liquid-glass rounded-2xl p-6 md:p-8">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/45 block mb-3">
          {block.label}
        </span>
        <h3 className="font-display font-black text-3xl md:text-5xl tracking-tighter text-ink leading-[0.95]">
          {block.title}
        </h3>
        <p className="mt-5 font-display text-sm md:text-base text-ink/65 leading-relaxed max-w-md">
          {block.body}
        </p>
        <a
          href={block.href}
          className="liquid-glass mt-7 inline-flex items-center border border-ink/20 bg-spark/70 px-8 py-4 font-mono text-xs uppercase tracking-widest text-ink transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-ink hover:text-canvas hover:shadow-[0_10px_30px_rgba(13,13,13,0.35)] focus:outline-none focus:ring-4 focus:ring-spark rounded-full"
        >
          {block.cta}
        </a>
      </div>
    </motion.article>
  );
}

export default function EditorialAudienceSection() {
  return (
    <section id="audience" className="relative scroll-mt-24 md:scroll-mt-28 bg-canvas py-16 md:py-24" aria-labelledby="audience-heading">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="h-px bg-ink/10 mt-4 md:mt-6 mb-10 md:mb-14" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-4">
            Aplicamos para todos
          </span>
          <h2
            id="audience-heading"
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-ink leading-[0.95]"
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
