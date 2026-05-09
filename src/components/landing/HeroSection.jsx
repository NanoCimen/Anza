import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Menu, X } from 'lucide-react';

const ANZA_LOGO = '/logoconftransp.png';
const HERO_BG = '/fondoinflu.png';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.6]);

  useEffect(() => {
    const t = setTimeout(() => setHasScrolled(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const navItemsVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 },
  };
  const navItemsTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const navInteractivityClass = hasScrolled ? 'pointer-events-auto' : 'pointer-events-none';

  const navLinkClass =
    'font-mono text-xs uppercase tracking-widest text-white/75 hover:text-white transition-colors';
  const navLinkMobileClass =
    'font-mono text-sm uppercase tracking-widest text-white/80 hover:text-white';

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Full-bleed influencer grid background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 blur-[2px]"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '75%',
          }}
        />
        {/* Darkening stack — matches dense grid + readable white UI */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-black/30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/40"
        />
      </div>

      {/* Top bar — floats over full-bleed background (no glass) */}
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10">
          {/* Left nav — hidden until first scroll */}
          <motion.nav
            variants={navItemsVariants}
            initial="hidden"
            animate={hasScrolled ? 'visible' : 'hidden'}
            transition={navItemsTransition}
            className={`hidden items-center gap-8 md:flex ${navInteractivityClass}`}
          >
            <a href="#faqs" className={navLinkClass}>
              FAQs
            </a>
            <a href="#about" className={navLinkClass}>
              Nosotros
            </a>
          </motion.nav>

          {/* Center logo — visible from the start */}
          <motion.img
            src={ANZA_LOGO}
            alt="Anza"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 select-none object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] md:h-11 md:w-11"
            draggable={false}
          />

          {/* Right nav — hidden until first scroll */}
          <motion.nav
            variants={navItemsVariants}
            initial="hidden"
            animate={hasScrolled ? 'visible' : 'hidden'}
            transition={{ ...navItemsTransition, delay: 0.05 }}
            className={`hidden items-center gap-10 md:flex ${navInteractivityClass}`}
          >
            <a href="/creadores" className={navLinkClass}>
              Para creadores
            </a>
            <a href="/marcas" className={navLinkClass}>
              Para marcas
            </a>
            <a
              href="/demo"
              className="rounded-full bg-spark px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(232, 255, 0,0.35)]"
            >
              Reservar una Demostración
            </a>
          </motion.nav>

          <motion.button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            aria-expanded={open}
            variants={navItemsVariants}
            initial="hidden"
            animate={hasScrolled ? 'visible' : 'hidden'}
            transition={navItemsTransition}
            className={`p-2 text-white md:hidden ${navInteractivityClass}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-white/10 bg-black/90 md:hidden"
            >
              <div className="flex flex-col gap-5 px-6 py-6">
                <a href="#faqs" onClick={() => setOpen(false)} className={navLinkMobileClass}>
                  FAQs
                </a>
                <a href="#about" onClick={() => setOpen(false)} className={navLinkMobileClass}>
                  Nosotros
                </a>
                <a href="/creadores" onClick={() => setOpen(false)} className={navLinkMobileClass}>
                  Para creadores
                </a>
                <a href="/marcas" onClick={() => setOpen(false)} className={navLinkMobileClass}>
                  Para marcas
                </a>
                <a
                  href="/demo"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-spark px-6 py-3 text-center font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-white"
                >
                  Reservar una Demostración
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center px-6 pb-24 pt-16 md:px-10 md:pb-28 md:pt-20">
        <motion.div
          style={{ y: contentY, opacity: sectionOpacity }}
          className="flex flex-col items-center justify-center text-center -translate-y-6 md:-translate-y-10"
        >
          <h1 className="font-display font-black leading-[0.85] tracking-tighter text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px]">
            Anza
          </h1>

          <p className="font-display font-normal text-white/80 leading-relaxed mt-6 max-w-xl text-base sm:text-lg md:mt-8 md:text-xl">
           Gana dinero creando contenido para marcas y cobra desde el primer día.
          </p>

          <motion.a
            href="/waitlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={hasScrolled ? { y: -1 } : undefined}
            whileTap={hasScrolled ? { y: 0, scale: 0.985 } : undefined}
            style={{
              backgroundColor: '#6B2FFA',
              pointerEvents: hasScrolled ? 'auto' : 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5A22E0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6B2FFA')}
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-3.5 font-display font-semibold text-white text-sm md:text-base tracking-wide ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] md:mt-10"
            aria-hidden={!hasScrolled}
            tabIndex={hasScrolled ? 0 : -1}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative">Regístrate ahora</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-white/50" />
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
          Desliza para explorar
        </span>
      </motion.div>
    </section>
  );
}
