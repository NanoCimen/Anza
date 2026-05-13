import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLS_SOURCE = import.meta.env.VITE_HOW_IT_WORKS_HLS_URL || '';

export default function HowItWorksSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !HLS_SOURCE) return undefined;

    if (HLS_SOURCE.endsWith('.m3u8') && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SOURCE);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    video.src = HLS_SOURCE;
    return undefined;
  }, []);

  return (
    <section className="relative bg-ink text-canvas overflow-hidden" aria-labelledby="how-it-works-heading">
      {HLS_SOURCE ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-ink/70" aria-hidden />
      )}

      <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-ink to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-ink to-transparent z-[1]" />

      <div className="relative z-10 min-h-[500px] max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <span className="liquid-glass rounded-full px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest text-canvas/80">
          How It Works
        </span>

        <h2
          id="how-it-works-heading"
          className="mt-7 font-display italic font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.9]"
        >
          You dream it. We ship it.
        </h2>

        <p className="mt-6 max-w-2xl font-display font-light text-sm md:text-base text-canvas/60 leading-relaxed">
          Share your vision. Our AI handles the rest - wireframes, design, code, launch.
          All in days, not quarters.
        </p>

        <a
          href="/waitlist"
          className="liquid-glass-strong mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-canvas/95 transition-transform duration-300 hover:-translate-y-0.5"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
