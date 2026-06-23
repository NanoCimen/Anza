import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

function TikTokGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const SOCIALS = [
  { name: 'Instagram', Icon: Instagram, href: '#' },
  { name: 'TikTok', Icon: TikTokGlyph, href: '#' },
];

const LEGAL_LINKS = [
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Términos del servicio', href: '/terminos' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-canvas text-ink">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 md:pt-20 flex flex-col items-center text-center">
        {/* Centered Anza logo */}
        <img
          src="/logosintransparente.png"
          alt="Anza"
          draggable={false}
          className="h-14 w-14 md:h-16 md:w-16 object-contain select-none"
        />

        {/* Social icons */}
        <div className="mt-8 flex items-center gap-3">
          {SOCIALS.map(({ name, Icon, href }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-ink text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:bg-iris hover:shadow-[0_8px_22px_-10px_rgba(123,44,255,0.55)]"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Legal links — underline animates in on hover */}
        <div className="mt-8 mb-24 md:mb-32 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LEGAL_LINKS.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="group relative font-display text-sm text-ink/75 transition-colors hover:text-ink"
            >
              {link.label}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Massive ANZA wordmark — natural spacing, edge-to-edge */}
      <div className="select-none" aria-label="Anza" role="img">
        <div
          className="flex w-full items-end justify-center font-display font-black leading-[0.85] text-ink whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 28vw, 28rem)', letterSpacing: '-0.06em' }}
        >
          {['A', 'N', 'Z', 'A'].map((letter, i) => (
            <span
              key={`anza-${i}`}
              className="inline-block cursor-default origin-[50%_100%] transition-all duration-500 ease-out hover:-translate-y-2 hover:text-iris"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar — sits beneath the wordmark */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-6 pb-6 md:pb-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-ink/45">
          © 2026 Anza | Anva LLC | Santo Domingo, República Dominicana
        </span>
        <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-ink/45">
          Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
