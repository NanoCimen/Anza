import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATS = [
  { value: '2,500+', label: 'Creators' },
  { value: '18', label: 'Countries' },
  { value: '$4.2M', label: 'Earned by creators' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const highlightHeight = useTransform(scrollYProgress, [0.3, 0.6], ['0%', '100%']);

  return (
    <section id="about" ref={sectionRef} className="bg-canvas py-24 md:py-40 relative overflow-hidden">
      {/* Hairline separator */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="h-px bg-ink/10 mb-16 md:mb-24" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          {/* Column 1 — Sticky Label */}
          <div className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-2">
                05 / Philosophy
              </span>
              <div className="w-8 h-px bg-spark mt-4" />

              {/* Stats */}
              <div className="mt-12 space-y-6">
                {STATS.map(s => (
                  <div key={s.label}>
                    <span className="font-display font-black text-2xl md:text-3xl text-ink">
                      {s.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2-3 — Content */}
          <div className="md:col-span-9 md:pl-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-ink leading-[0.95]"
            >
              We believe Latin America
              <br className="hidden md:block" />{' '}
              is the world's most{' '}
              <span className="relative inline-block">
                <span className="relative z-10">untapped creative</span>
                <motion.span
                  style={{ height: highlightHeight }}
                  className="absolute bottom-0 left-0 right-0 bg-spark/40 z-0"
                />
              </span>{' '}
              powerhouse.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 md:mt-16 max-w-2xl"
            >
              <p className="font-display text-lg md:text-xl text-ink/60 leading-relaxed">
                Anza was born from a simple conviction: the next generation of global
                culture is being shaped in studios across Ciudad de México, São Paulo,
                Bogotá, Buenos Aires, and Lima. We built the first marketplace designed
                entirely for this ecosystem — connecting extraordinary Latin American
                creators with brands that demand authenticity.
              </p>

              <p className="font-display text-lg md:text-xl text-ink/60 leading-relaxed mt-8">
                Our platform eliminates the friction between discovery and collaboration.
                No middlemen. No compromises. Every creator on Anza is vetted, every
                connection is intentional, and every project is treated as a cultural moment.
              </p>
            </motion.div>

            {/* Manifesto line */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 md:mt-24 border-t border-ink/10 pt-8"
            >
              <blockquote className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-ink tracking-tight leading-tight">
                "Every creator is a masterpiece.
                <br />
                Every connection, a monumental event."
              </blockquote>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30 mt-4 block">
                — The Anza Manifesto
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
