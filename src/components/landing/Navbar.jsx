import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar({ showBackLink = false, backHref = '/' }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Plataforma', href: '#audience' },
    { label: 'Soluciones', href: '#creators' },
    { label: 'Servicio', href: '#about' },
    { label: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-ink/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
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
