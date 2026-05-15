import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollExploreHint from './ScrollExploreHint';
import { meshPm } from '@/assets';

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
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen overflow-hidden pt-16"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${meshPm})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-[1440px] min-w-0 flex-col items-stretch px-3 md:flex-row md:px-3">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: imageY, opacity: sectionOpacity }}
          className="relative flex min-w-0 items-center py-6 md:w-[55%] md:py-10"
        >
          <motion.div
            whileHover={{ scale: 1.025, rotate: -0.35 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative h-[58vh] w-full overflow-hidden md:h-[70vh]"
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
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-ink/25 to-transparent"
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
          className="flex min-w-0 flex-col justify-center py-10 md:w-[45%] md:py-0 md:pl-12 lg:pl-20"
        >
          <div className="relative inline-block max-w-full min-w-0">
            <h1 className="font-display text-4xl font-black leading-[0.85] tracking-tighter text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              USA
              <br />
              CREADORES
              <br />
              UGC
            </h1>
            <button
              type="button"
              onClick={handleGoToArticle}
              className="absolute right-2 top-[3%] rounded-full border-2 border-canvas bg-spark px-4 py-2 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-ink shadow-[0_10px_28px_rgba(207,174,255,0.4)] transition-transform duration-700 will-change-transform hover:scale-[1.03] md:-right-6 lg:-right-10"
            >
              ¿Qué son creadores UGC?
            </button>
          </div>

          <p className="mt-12 max-w-md font-display text-base leading-relaxed text-white md:text-lg">
            En vez de destinar tu presupuesto a un único creador, activa a decenas de creadores hablando de
            tu producto al mismo tiempo. Más impacto, menos dinero.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            <a
              href="/waitlist/marcas"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-iris px-9 py-3.5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-anza-deep hover:shadow-[0_14px_30px_-12px_rgba(123,44,255,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] focus:outline-none focus:ring-4 focus:ring-iris/40"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">EMPIEZA GRATIS</span>
            </a>
          </div>
        </motion.div>
      </div>

      <ScrollExploreHint align="center" hideOnHash={undefined} />
    </section>
  );
}
