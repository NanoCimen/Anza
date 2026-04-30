import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HERO_IMAGE = '/creadores.ong.png';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.78]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-canvas overflow-hidden pt-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[calc(100vh-4rem)] flex flex-col md:flex-row items-stretch">
        {/* Left — Image (60%) */}
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
              alt="Latin American creator in dramatic editorial lighting"
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
            {/* Yellow accent strip */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-spark" />
          </motion.div>
        </motion.div>

        {/* Right — Content (40%) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: contentY, opacity: sectionOpacity }}
          className="md:w-[45%] flex flex-col justify-center md:pl-12 lg:pl-20 py-10 md:py-0"
        >
          <div className="mb-6">
            <span className="font-mono text-xs tracking-widest text-ink/40 uppercase">
              01 / Marketplace de Creadores · América Latina
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] leading-[0.85] tracking-tighter text-ink">
            TODOS
            <br />
            PUEDEN
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #0D0D0D' }}>
              CREAR
            </span>
          </h1>

          <p className="mt-12 font-display text-base md:text-lg text-ink/60 leading-relaxed max-w-md">
          El algoritmo ya no premia los seguidores, premia el contenido. Construye tu ejército de creadores, gestiona tus campañas y paga por resultados — desde un solo lugar.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/waitlist"
              className="bg-spark text-ink font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-ink hover:text-canvas transition-colors focus:outline-none focus:ring-4 focus:ring-spark"
            >
              Empieza Gratis
            </a>
            <a
              href="/demo"
              className="border border-ink/20 text-ink font-mono text-xs uppercase tracking-widest px-8 py-4 hover:border-ink transition-colors focus:outline-none focus:ring-4 focus:ring-spark"
            >
              Reserva una Demostración
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
          Desplaza para explorar
        </span>
      </motion.div>
    </section>
  );
}
