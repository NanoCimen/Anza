import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Palette, RotateCcw, X } from 'lucide-react';

export default function Navbar({ showBackLink = false, backHref = '/' }) {
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [palette, setPalette] = useState({
    ink: '#0d0d0d',
    canvas: '#f5f5f0',
    spark: '#e8ff00',
  });

  useEffect(() => {
    const savedPalette = window.localStorage.getItem('anza_palette');
    if (!savedPalette) return;

    try {
      const parsed = JSON.parse(savedPalette);
      setPalette({
        ink: parsed.ink || '#0d0d0d',
        canvas: parsed.canvas || '#f5f5f0',
        spark: parsed.spark || '#e8ff00',
      });
    } catch (error) {
      console.error('Invalid saved palette:', error);
    }
  }, []);

  const applyPaletteToDocument = useCallback((p) => {
    const hexToRgb = (hex) => {
      const clean = hex.replace('#', '');
      if (clean.length !== 6 || Number.isNaN(Number.parseInt(clean, 16))) return null;
      const intValue = Number.parseInt(clean, 16);
      const r = (intValue >> 16) & 255;
      const g = (intValue >> 8) & 255;
      const b = intValue & 255;
      return `${r} ${g} ${b}`;
    };

    const root = document.documentElement;
    ['ink', 'canvas', 'spark'].forEach((key) => {
      const triple = hexToRgb(p[key]);
      if (triple) root.style.setProperty(`--${key}`, triple);
    });
    window.localStorage.setItem('anza_palette', JSON.stringify(p));
  }, []);

  useEffect(() => {
    applyPaletteToDocument(palette);
  }, [palette, applyPaletteToDocument]);

  const handlePaletteChange = (key, value) => {
    setPalette(prev => {
      const next = { ...prev, [key]: value };
      applyPaletteToDocument(next);
      return next;
    });
  };

  const resetPalette = () => {
    const defaults = { ink: '#0d0d0d', canvas: '#f5f5f0', spark: '#e8ff00' };
    applyPaletteToDocument(defaults);
    setPalette(defaults);
  };

  /** Native color inputs fire `input` continuously while dragging; keep in sync immediately. */
  const colorInputHandlers = key => ({
    value: palette[key],
    onInput: e => handlePaletteChange(key, e.currentTarget.value),
    onChange: e => handlePaletteChange(key, e.currentTarget.value),
  });

  const links = [
    { label: 'Plataforma', href: '#audience' },
    { label: 'Soluciones', href: '#creators' },
    { label: 'Servicio', href: '#about' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass overflow-visible border-b border-ink/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setPaletteOpen(prev => !prev)}
              aria-label="Abrir paleta de color"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-canvas/70 p-2 text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              <Palette size={14} />
            </button>
            {paletteOpen && (
              <div className="absolute top-full left-0 z-[1] mt-2 w-56 rounded-xl border border-ink/20 bg-canvas p-4 shadow-[0_12px_28px_rgba(13,13,13,0.18)]">
                <div className="space-y-3">
                  <label className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/70">Ink</span>
                    <input
                      type="color"
                      {...colorInputHandlers('ink')}
                      className="h-7 w-10 cursor-pointer border border-ink/20 bg-transparent p-0"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/70">Canvas</span>
                    <input
                      type="color"
                      {...colorInputHandlers('canvas')}
                      className="h-7 w-10 cursor-pointer border border-ink/20 bg-transparent p-0"
                    />
                  </label>
                  <label className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink/70">Spark</span>
                    <input
                      type="color"
                      {...colorInputHandlers('spark')}
                      className="h-7 w-10 cursor-pointer border border-ink/20 bg-transparent p-0"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={resetPalette}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-canvas"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>
            )}
          </div>
          <a href="#" className="font-display font-black text-2xl tracking-tighter text-ink">
            ANZA
          </a>
          {showBackLink && (
            <a
              href={backHref}
              className="font-mono text-[11px] uppercase tracking-widest text-ink/60 hover:text-ink transition-colors"
            >
              ← Volver
            </a>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/demo"
            className="liquid-glass-strong bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-6 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-spark hover:text-ink hover:shadow-[0_10px_30px_rgba(232,255,0,0.35)]"
          >
            Reserva una Demostración
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-ink">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-canvas border-b border-ink/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm uppercase tracking-widest text-ink/60 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/demo"
                onClick={() => setOpen(false)}
                className="bg-ink text-canvas font-mono text-sm uppercase tracking-widest px-6 py-3 text-center hover:bg-spark hover:text-ink transition-colors"
              >
                Reserva una Demostración
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
