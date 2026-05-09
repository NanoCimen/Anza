import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowLeft, Play } from 'lucide-react';

const VIDEO_PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => i + 1);

export default function HeroCreatorsSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.78]);
  
  const handleGoToAbout = () => {
    const articleTopLine = document.getElementById('creators-article-top-line');
    if (articleTopLine) {
      const nav = document.querySelector('nav');
      const navHeight = nav?.getBoundingClientRect().height ?? 64;
      const visibleLineOffset = navHeight - 4;
      const y = articleTopLine.getBoundingClientRect().top + window.scrollY - visibleLineOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-ink overflow-hidden pt-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-stretch">
        {/* Left — 6 vertical creator cards in one horizontal row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY, opacity: sectionOpacity }}
          className="md:w-[55%] relative flex items-end py-10 md:py-20"
        >
          <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            <div className="grid h-full grid-cols-3 grid-rows-2 gap-1.5 md:gap-2">
              {VIDEO_PLACEHOLDERS.map((n, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  whileHover={{
                    scale: 1.045,
                    y: i % 2 === 0 ? -4 : -2,
                    rotate: i % 3 === 0 ? -0.8 : i % 3 === 1 ? 0.6 : -0.4,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden rounded-[2px] bg-ink/[0.07]"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-ink/30 to-ink/[0.08]"
                    whileHover={{
                      background:
                        i % 2 === 0
                          ? 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(10,10,10,0.18))'
                          : 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(232, 255, 0,0.18))',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="relative z-10 flex h-full w-full items-center justify-center"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-canvas/25 bg-ink/80 text-canvas/75">
                      <Play size={14} fill="currentColor" />
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-spark" />
          </div>
        </motion.div>

        {/* Right — Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: contentY, opacity: sectionOpacity }}
          className="md:w-[45%] flex flex-col justify-center md:pl-12 lg:pl-20 py-10 md:py-0"
        >
          <div className="mb-6">
            <span className="font-mono text-xs tracking-widest text-canvas/40 uppercase">
              / Marketplace de Creadores · América Latina
            </span>
          </div>

          <div className="relative inline-block">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[104px] leading-[0.8] tracking-tighter text-canvas">
              TU
              <br />
              PRÓXIMA
              <br />
              CAMPAÑA
              <br />
              <span className="whitespace-nowrap">
                TE{' '}
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #0A0A0A' }}>
                  ESPERA
                </span>
              </span>
            </h1>
            <button
              type="button"
              onClick={handleGoToAbout}
              className="absolute top-[3%] right-2 md:-right-6 lg:-right-10 bg-spark border-2 border-canvas rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ink shadow-[0_10px_28px_rgba(232, 255, 0,0.4)] transition-transform duration-700 hover:scale-[1.03] will-change-transform"
            >
              ¿Quieres monetizar sin ser famoso?            </button>
          </div>

          <p className="mt-12 font-display text-base md:text-lg text-canvas/60 leading-relaxed max-w-md">
            Aplica a campañas de marcas reales y cobra por tu contenido. Sin agencia. Sin
            intermediarios.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            <a
              href="/"
              className="liquid-glass border border-canvas/20 text-canvas bg-ink/50 font-mono text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-canvas hover:text-ink hover:shadow-[0_10px_30px_rgba(10,10,10,0.35)] focus:outline-none focus:ring-4 focus:ring-spark inline-flex items-center gap-2 rounded-full"
            >
              <ArrowLeft size={14} />
              VOLVER
            </a>
            <a
              href="/waitlist/creadores"
              className="liquid-glass-strong bg-ink border border-canvas text-spark font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-spark hover:text-ink hover:shadow-[0_10px_30px_rgba(232, 255, 0,0.35)] focus:outline-none focus:ring-4 focus:ring-spark rounded-full"
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
          <ArrowDown size={16} className="text-canvas/40" />
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">
          Desliza para explorar
        </span>
      </motion.div>
    </section>
  );
}
