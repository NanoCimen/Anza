import React from 'react';

const LINKS = {
  Plataforma: ['Creadores', 'Marcas', 'Precios'],
  Empresa: ['Acerca de', 'Blog', 'Carreras'],
  Legal: ['Política de privacidad', 'Términos del servicio'],
  Redes: ['X / Twitter', 'Instagram', 'LinkedIn', 'TikTok'],
};
export default function Footer() {
  return (
    <footer className="bg-ink text-canvas relative overflow-hidden">
      {/* Giant wordmark */}
      <div className="relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-8">
          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32 relative z-10">
            {Object.entries(LINKS).map(([title, items]) => (
              <div key={title}>
                <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/30 block mb-4">
                  {title}
                </span>
                <ul className="space-y-3">
                  {items.map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-display text-sm text-canvas/60 hover:text-spark transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Massive wordmark — per-letter hover pop + spark */}
          <div className="relative z-0 select-none">
            <div
              className="flex flex-wrap items-end font-display font-black text-[120px] sm:text-[180px] md:text-[240px] lg:text-[320px] leading-none tracking-tighter -mb-8 md:-mb-16"
              aria-label="Anza"
            >
              {['A', 'N', 'Z', 'A'].map((letter, i) => (
                <span
                  key={`anza-${i}`}
                  className="inline-block cursor-default origin-[50%_100%] text-canvas/[0.04] transition-[transform,color,filter] duration-300 ease-out will-change-transform motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 hover:scale-110 hover:-translate-y-[6%] hover:text-spark hover:drop-shadow-[0_6px_36px_rgba(232,255,0,0.45)]"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-10 border-t border-canvas/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/30">
              © 2026 Anza. Todos los derechos reservados.
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/30">
              Marketplace latino de creadores
            </span>          </div>
        </div>
      </div>
    </footer>
  );
}
