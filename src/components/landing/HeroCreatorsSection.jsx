import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import ScrollExploreHint from './ScrollExploreHint';

const BACKGROUND_PC = new URL('../../../backgroundPC.png', import.meta.url).href;
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
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-16"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${BACKGROUND_PC})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-[1440px] flex-col items-stretch px-3 md:flex-row md:px-3">
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
                          : 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(207, 174, 255,0.18))',
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
          <div className="relative inline-block">
            <h1
              className="font-display font-black text-4xl leading-[0.8] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[104px]"
              style={{
                textShadow:
                  '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 5px 18px rgba(0,0,0,0.35)',
              }}
            >
              TU
              <br />
              PRÓXIMA
              <br />
              CAMPAÑA
              <br />
              <span className="whitespace-nowrap">
                TE{' '}
                <span className="text-white">
                  ESPERA
                </span>
              </span>
            </h1>
            <button
              type="button"
              onClick={handleGoToAbout}
              className="absolute right-2 top-[3%] rounded-full border-2 border-canvas bg-spark px-4 py-2 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-ink shadow-[0_10px_28px_rgba(207,174,255,0.4)] transition-transform duration-700 will-change-transform hover:scale-[1.03] md:-right-6 lg:-right-10"
            >
              ¿Monetizar con muy pocos seguidores?            </button>
          </div>

          <p className="mt-12 max-w-md font-display text-base leading-relaxed text-white/100 md:text-lg">
            Aplica a campañas de marcas reales y cobra por tu contenido. Sin agencia, sin
            intermediarios y totalmente gratis.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            <a
              href="/waitlist/creadores"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-iris px-9 py-3.5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-anza-deep hover:shadow-[0_14px_30px_-12px_rgba(123,44,255,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] focus:outline-none focus:ring-4 focus:ring-iris/40"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">
              EMPIEZA GRATIS
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      <ScrollExploreHint align="center" hideOnHash={undefined} />
    </section>
  );
}
