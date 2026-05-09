import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '1',
    label: 'Aplica a una oportunidad',
    type: 'image',
    src: 'aplicaciones.png',
    alt: 'Pantalla de oportunidades activas en Anza',
  },
  {
    n: '2',
    label: 'Sube un video',
    type: 'video',
    src: '/videos/comofunciona.mp4',
  },
  {
    n: '3',
    label: 'Recibe tu pago',
    type: 'image',
    src: 'cobra.png',
    alt: 'Notificación de pago recibido en Anza',
  },
];

function StepMedia({ step }) {
  if (step.type === 'image') {
    return (
      <img
        src={step.src}
        alt={step.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />
    );
  }

  if (step.type === 'video') {
    return (
      <video
        src={step.src}
        className="absolute inset-0 h-full w-full object-contain rounded-lg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }

  // placeholder — same height frame, intentionally empty
  return <div aria-hidden className="absolute inset-0 h-full w-full" />;
}

export default function ComoFuncionaSection() {
  return (
    <section
      id="como-funciona"
      className="relative scroll-mt-24 md:scroll-mt-28 py-14 md:py-20 lg:py-24"
      style={{ backgroundColor: '#6B2FFA' }}
      aria-labelledby="como-funciona-heading"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-2 md:pt-4">
        <div className="h-px bg-canvas/15 mt-4 md:mt-6 mb-8 md:mb-10" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/55 block mb-4">
          / Cómo funciona
        </span>
        <div className="w-12 h-[2px] bg-spark mb-8 md:mb-12 shadow-[0_0_10px_rgba(232,255,0,0.55)] origin-left" />

        <motion.h2
          id="como-funciona-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-canvas leading-[0.95]"
        >
          Cómo funciona
        </motion.h2>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-spark/70 font-display font-semibold text-base text-spark md:h-14 md:w-14 md:text-lg">
                {step.n}
              </div>
              <p className="mt-6 max-w-[260px] font-display font-medium text-base md:text-lg text-canvas leading-snug">
                {step.label}
              </p>

              {/* Media frame — images fill a larger 3:4 box; the video gets a tight 9:16 yellow margin */}
              <div
                className={
                  'mt-2 md:mt-4 w-full mx-auto aspect-[3/4] flex items-center justify-center ' +
                  (step.type === 'video' ? 'max-w-[420px]' : 'max-w-[420px]')
                }
              >
                {step.type === 'video' ? (
                  <div
                    className="h-full bg-spark p-1 rounded-xl"
                    style={{ aspectRatio: '9 / 16' }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <StepMedia step={step} />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <StepMedia step={step} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
