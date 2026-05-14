import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Menu, X } from 'lucide-react';

const ANZA_LOGO = '/logosintransparente.png';
const HERO_BG = '/fondoinflu.png';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-32, -64]);

  useEffect(() => {
    const t = setTimeout(() => setHasScrolled(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setHasUserScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemsVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 },
  };
  const navItemsTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
  const navInteractivityClass = hasScrolled ? 'pointer-events-auto' : 'pointer-events-none';

  const navLinkClass =
    'group relative font-nav text-sm font-medium leading-none tracking-[0.02em] uppercase text-white transition-all duration-300 hover:text-spark hover:[text-shadow:0_0_16px_rgba(207,174,255,0.8)] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-spark after:shadow-[0_0_10px_rgba(207,174,255,0.8)] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100';
  const navLinkMobileClass =
    'font-nav text-sm font-medium leading-none tracking-[0.02em] uppercase text-white transition-all duration-300 hover:text-spark hover:[text-shadow:0_0_16px_rgba(207,174,255,0.8)]';

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black">
      {/* Cropped media area, with the black CTA band below it. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[76vh] overflow-hidden" aria-hidden>
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            y: imageY,
            backgroundImage: `url(${HERO_BG})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 28%',
            backgroundSize: 'cover',
          }}
          className="absolute -inset-x-6 -inset-y-10 blur-[3px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-black/20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[76vh] items-center justify-center"
      >
        <h1 className="font-display text-7xl font-black leading-[0.85] tracking-tighter text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:text-8xl md:text-9xl lg:text-[140px]">
          Anza
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 z-20 bg-black pb-[1px]"
      >
        <div className="flex min-h-[24vh] w-full flex-col items-start justify-start gap-6 px-3 pt-5 pb-0 md:flex-row md:justify-between md:px-3 md:pt-5 md:pb-0">
          <h2 className="max-w-[980px] font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]">
            Gana dinero creando contenido para marcas y cobra desde el primer día, marketplace para creadores en América Latina.
          </h2>

          <div className="flex shrink-0 flex-col items-stretch gap-3 self-start sm:flex-row md:mt-1">
            <motion.a
              href="/waitlist"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={hasScrolled ? { y: -1 } : undefined}
              whileTap={hasScrolled ? { y: 0, scale: 0.985 } : undefined}
              style={{
                backgroundColor: '#7B2CFF',
                pointerEvents: hasScrolled ? 'auto' : 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5E1395')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7B2CFF')}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-3.5 font-display text-sm font-semibold tracking-wide text-white ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] md:text-base"
              aria-hidden={!hasScrolled}
              tabIndex={hasScrolled ? 0 : -1}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">Regístrate ahora</span>
            </motion.a>
            <motion.a
              href="#como-funciona"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: hasScrolled ? 1 : 0, y: hasScrolled ? 0 : 8 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={hasScrolled ? { y: -1 } : undefined}
              whileTap={hasScrolled ? { y: 0, scale: 0.985 } : undefined}
              style={{ pointerEvents: hasScrolled ? 'auto' : 'none' }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 px-9 py-3.5 font-display text-sm font-semibold tracking-wide text-white transition-all duration-300 ease-out hover:border-spark/70 hover:bg-spark/15 hover:text-spark hover:shadow-[0_10px_30px_rgba(207,174,255,0.2)] md:text-base"
              aria-hidden={!hasScrolled}
              tabIndex={hasScrolled ? 0 : -1}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative">Cómo funciona</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Top bar — floats over full-bleed background (no glass) */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-end px-3 md:h-20 md:px-3">
          <motion.button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menú"
            aria-expanded={open}
            variants={navItemsVariants}
            initial="hidden"
            animate={hasScrolled ? 'visible' : 'hidden'}
            transition={navItemsTransition}
            className={`rounded-full p-2 text-white transition-colors hover:bg-white/10 md:hidden ${navInteractivityClass}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Top CTA — centered above the lower button pair */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 md:block md:h-20">
          <div className="flex h-full items-center justify-end px-3 md:px-3">
          <motion.nav
            variants={navItemsVariants}
            initial="hidden"
            animate={hasScrolled ? 'visible' : 'hidden'}
            transition={{ ...navItemsTransition, delay: 0.05 }}
            className={`pointer-events-auto flex w-[414px] items-center justify-center ${navInteractivityClass}`}
          >
            <a
              href="/demo"
              className="rounded-full bg-iris px-9 py-3.5 font-display text-sm font-semibold tracking-wide text-canvas ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-anza-deep hover:text-canvas hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(123,44,255,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] md:text-base"
            >
              Reservar una demostración
            </a>
          </motion.nav>
          </div>
        </div>

        {/* Left logo — its own layer so it aligns exactly with the bottom headline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-20">
          <div className="h-full px-3 md:px-3">
            <motion.a
              href="/"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex h-full w-fit items-center text-white"
            >
              <img
                src={ANZA_LOGO}
                alt="Anza"
                width={112}
                height={112}
                className="h-16 w-16 shrink-0 select-none object-contain object-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:h-[4.5rem] sm:w-[4.5rem] md:h-28 md:w-28"
                draggable={false}
              />
            </motion.a>
          </div>
        </div>

        {/* Center nav — placed in its own full-width layer for true centering */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 items-center justify-center md:flex md:h-20">
          <motion.nav
            variants={navItemsVariants}
            initial="hidden"
            animate={hasScrolled ? 'visible' : 'hidden'}
            transition={{ ...navItemsTransition, delay: 0.05 }}
            className={`pointer-events-auto flex items-center gap-10 ${navInteractivityClass}`}
          >
            <a href="#faqs" className={navLinkClass}>
              FAQs
            </a>
            <a href="#about" className={navLinkClass}>
              Nosotros
            </a>
            <a href="/creadores" className={navLinkClass}>
              Para creadores
            </a>
            <a href="/marcas" className={navLinkClass}>
              Para marcas
            </a>
          </motion.nav>
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
                  className="rounded-full bg-iris px-6 py-3 text-center font-nav text-sm font-medium leading-none tracking-[0.02em] uppercase text-canvas ring-1 ring-white/20 transition-all duration-300 hover:bg-anza-deep hover:text-canvas hover:ring-white/25 hover:shadow-[0_10px_30px_rgba(123,44,255,0.45)]"
                >
                  Reservar una demostración
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasUserScrolled ? 0 : 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-white/50" />
        </motion.div>
        <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-white/45">
          Desliza para explorar
        </span>
      </motion.div>
    </section>
  );
}
