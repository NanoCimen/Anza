import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const ANZA_LOGO = '/logosintransparente.png';
const navTextClass = 'font-nav text-sm font-medium leading-none tracking-[0.02em]';
const navLinkClass =
  'group relative font-nav text-sm font-medium leading-none tracking-[0.02em] uppercase text-white transition-all duration-300 hover:text-spark hover:[text-shadow:0_0_16px_rgba(207,174,255,0.8)] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-spark after:shadow-[0_0_10px_rgba(207,174,255,0.8)] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100';

export default function Navbar({ showBackLink = false, backHref = '/' }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'FAQS', href: '/#faqs' },
    { label: 'NOSOTROS', href: '/#about' },
    { label: 'PARA CREADORES', href: '/creadores' },
    { label: 'PARA MARCAS', href: '/marcas' },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-transparent">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-end px-3 md:h-20 md:px-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 md:h-20">
          <div className="flex h-full items-center px-3 md:px-3">
            <a href="/" className="pointer-events-auto flex h-full w-fit items-center text-white">
              <img
                src={ANZA_LOGO}
                alt="Anza"
                width={112}
                height={112}
                draggable={false}
                className="h-16 w-16 shrink-0 select-none object-contain object-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] sm:h-[4.5rem] sm:w-[4.5rem] md:h-28 md:w-28"
              />
            </a>
          {showBackLink && (
            <a
              href={backHref}
              className={`${navLinkClass} pointer-events-auto ml-2 md:ml-0`}
            >
              ← Volver
            </a>
          )}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 items-center justify-center md:flex md:h-20">
          <div className="pointer-events-auto flex items-center gap-10">
            {links.map(l => (
              <a key={l.label} href={l.href} className={navLinkClass}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 md:block md:h-20">
          <div className="flex h-full items-center justify-end px-3 md:px-3">
            <a
              href="/demo"
              className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-iris px-9 py-3.5 font-display text-sm font-semibold tracking-wide text-canvas ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-anza-deep hover:text-canvas hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(123,44,255,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] md:text-base"
            >
              Reservar una demostración
            </a>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="rounded-full p-2 text-white transition-colors hover:bg-white/10 md:hidden"
        >
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
            className="overflow-hidden border-b border-white/10 bg-black/95 md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-nav text-sm font-medium leading-none tracking-[0.02em] uppercase text-white transition-all duration-300 hover:text-spark"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/demo"
                onClick={() => setOpen(false)}
                className={`${navTextClass} inline-flex items-center justify-center rounded-full bg-iris px-6 py-3 text-center uppercase text-canvas ring-1 ring-white/20 transition-all duration-300 hover:bg-anza-deep hover:text-canvas hover:ring-white/25 hover:shadow-[0_10px_30px_rgba(123,44,255,0.45)]`}
              >
                Reserva una demostración
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
