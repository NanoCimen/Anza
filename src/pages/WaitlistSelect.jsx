import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { backgroundWaitlist } from '@/assets';

export default function WaitlistSelect() {
  return (
    <div
      className="flex min-h-screen flex-col bg-ink bg-center bg-no-repeat font-display"
      style={{
        backgroundImage: `url(${backgroundWaitlist})`,
        backgroundSize: '100% 100%',
      }}
    >
      <Navbar showBackLink backHref="/" />

      <main className="relative z-10 flex-1 pt-16">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[980px] flex-col items-center px-3 pb-16 pt-24 text-center md:px-3 md:pb-20 md:pt-28">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[980px] font-display text-4xl font-black leading-[0.85] tracking-tighter text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            Elige tu acceso
            <br />
            a Anza.
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } },
            }}
            className="mt-10 grid w-full grid-cols-1 gap-4 text-left md:grid-cols-2"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/waitlist/creadores"
                className="group block rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-spark/40 hover:shadow-[0_18px_48px_-28px_rgba(123,44,255,0.75)]"
              >
                <h2 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[28px] leading-[29px] tracking-[-0.2px]">Creadores UGC</h2>
                <p className="mt-3 font-display text-sm leading-relaxed text-canvas/60">
                  Aplica a campañas, entrega tu contenido y cobra desde el primer día.
                </p>
                <span className="mt-7 inline-flex items-center gap-2 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas transition-colors group-hover:text-spark">
                  Entrar <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.98 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/waitlist/marcas"
                className="group block rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-spark/40 hover:shadow-[0_18px_48px_-28px_rgba(123,44,255,0.75)]"
              >
                <h2 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[28px] leading-[29px] tracking-[-0.2px]">Marcas y Agencias</h2>
                <p className="mt-3 font-display text-sm leading-relaxed text-canvas/60">
                  Publica campañas, selecciona creadores y aprueba contenido en un solo lugar.
                </p>
                <span className="mt-7 inline-flex items-center gap-2 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas transition-colors group-hover:text-spark">
                  Entrar <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
