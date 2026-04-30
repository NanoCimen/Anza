import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft } from 'lucide-react';

const HERO_IMAGE = '/images/creadores.ong.png';

export default function HeroBrandsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.78]);

  const handleGoToArticle = () => {
    const articleTopLine = document.getElementById('marcas-article-top-line');
    if (articleTopLine) {
      const nav = document.querySelector('nav');
      const navHeight = nav?.getBoundingClientRect().height ?? 64;
      const visibleLineOffset = navHeight - 4;
      const y = articleTopLine.getBoundingClientRect().top + window.scrollY - visibleLineOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-canvas overflow-hidden pt-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY, opacity: sectionOpacity }}
          className="md:w-[55%] relative flex items-end py-10 md:py-20"
        >
          <motion.div
            whileHover={{ scale: 1.025, rotate: -0.35 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
          >
            <motion.img
              src={HERO_IMAGE}
              alt="Equipo de marca preparando una campana"
              className="w-full h-full object-cover object-center"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-canvas/25 to-transparent"
              initial={{ x: '-160%' }}
              whileHover={{ x: '420%' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-spark" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: contentY, opacity: sectionOpacity }}
          className="md:w-[45%] flex flex-col justify-center md:pl-12 lg:pl-20 py-10 md:py-0"
        >
          <div className="mb-6">
            <span className="font-mono text-xs tracking-widest text-ink/40 uppercase">
              / Plataforma para Marcas y Agencias
            </span>
          </div>

          <div className="relative inline-block">
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-[0.85] tracking-tighter text-ink">
            USA
            <br />
            CREADORES
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #0D0D0D' }}>
              UGC
            </span>
            </h1>
            <button
              type="button"
              onClick={handleGoToArticle}
              className="absolute top-[3%] right-2 md:-right-6 lg:-right-10 bg-spark border-2 border-ink rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ink shadow-[0_10px_28px_rgba(232,255,0,0.4)] transition-transform duration-700 hover:scale-[1.03] will-change-transform"
            >
              ¿Que son Creadores UGC?
            </button>
          </div>

          <p className="mt-12 font-display text-base md:text-lg text-ink/60 leading-relaxed max-w-md">
          Lanza campañas con creadores en menos tiempo, centraliza aprobaciones y paga por
          resultados desde un solo flujo.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            <a
              href="/"
              className="liquid-glass border border-ink/20 text-ink bg-canvas/50 font-mono text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-ink hover:text-canvas hover:shadow-[0_10px_30px_rgba(13,13,13,0.35)] focus:outline-none focus:ring-4 focus:ring-spark inline-flex items-center gap-2 rounded-full"
            >
              <ArrowLeft size={14} />
              VOLVER
            </a>
            <a
              href="/waitlist/marcas"
              className="liquid-glass-strong bg-ink border border-ink text-spark font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-spark hover:text-ink hover:shadow-[0_10px_30px_rgba(232,255,0,0.35)] focus:outline-none focus:ring-4 focus:ring-spark rounded-full"
            >
              EMPIEZA GRATIS
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-ink/40" />
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
          Desliza para explorar
        </span>
      </motion.div>
    </section>
  );
}
