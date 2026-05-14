import React from 'react';
import { motion } from 'framer-motion';
import { aplicaciones1, aplicaciones2, backgroundComoFunciona } from '@/assets';

const STEPS = [
  {
    n: '1',
    label: 'Aplica a una oportunidad',
    type: 'image-pair',
    images: [
      {
        src: aplicaciones1,
        alt: 'Oportunidades activas para creadores en Anza',
      },
      {
        src: aplicaciones2,
        alt: 'Más oportunidades activas para creadores en Anza',
      },
    ],
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
  if (step.type === 'image-pair') {
    return (
      <div className="grid h-full w-full grid-cols-2 items-center gap-3">
        {step.images.map(image => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full rounded-xl object-contain"
            draggable={false}
          />
        ))}
      </div>
    );
  }

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
      className="section-light relative scroll-mt-16 md:scroll-mt-20 pb-14 pt-8 md:pb-20 md:pt-10 lg:pb-24 lg:pt-12"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${backgroundComoFunciona})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      aria-labelledby="como-funciona-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-ink via-ink/80 to-transparent md:h-52"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[42%] md:h-[34%]"
        style={{
          background:
            'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.88) 18%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0) 78%)',
        }}
      />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10">
        <motion.h2
          id="como-funciona-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[980px] text-center font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]"
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
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-spark/70 font-display font-black text-base text-spark md:h-14 md:w-14 md:text-lg">
                {step.n}
              </div>
              <p className="mt-6 max-w-[260px] font-display text-base md:text-lg text-canvas leading-snug">
                {step.label}
              </p>

              {/* Media frame — images fill a larger 3:4 box; the video stays in a tight 9:16 frame. */}
              <div className="mt-4 flex h-[420px] w-full items-center justify-center md:h-[500px]">
                {step.type === 'image-pair' ? (
                  <div className="h-full w-full max-w-[520px]">
                    <StepMedia step={step} />
                  </div>
                ) : step.type === 'video' ? (
                  <div
                    className="h-full rounded-xl"
                    style={{ aspectRatio: '9 / 16' }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <StepMedia step={step} />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full w-full max-w-[420px] overflow-hidden rounded-lg">
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
