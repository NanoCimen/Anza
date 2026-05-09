import React from 'react';
import { motion } from 'framer-motion';

export default function PlatformIntroSection() {
  return (
    <section
      id="platform"
      className="relative z-0 scroll-mt-20 md:scroll-mt-24 bg-ink"
      aria-labelledby="platform-heading"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-24 flex flex-col gap-8 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-4 md:mb-5">
            / Plataforma
          </span>
          <h2
            id="platform-heading"
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-canvas leading-[0.95]"
          >
            Cómo Anza funciona para marcas
          </h2>
        </motion.div>

        {/* Lottie strip — belongs with intro headline */}
        <div
          id="platform-animation"
          className="relative z-0 w-full overflow-hidden aspect-[1160/350] bg-ink ring-1 ring-inset ring-canvas/10"
        />
      </div>
    </section>
  );
}
