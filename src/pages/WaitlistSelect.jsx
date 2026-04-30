import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function WaitlistSelect() {
  return (
    <div className="min-h-screen bg-canvas font-display flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-ink/5" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-ink/5" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-ink/5" />
      </div>

      <Navbar showBackLink backHref="/" />

      <main className="relative z-10 flex-1 pt-16">
        <section className="max-w-[960px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-6">
            / Waitlist
          </span>

          <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter text-ink leading-[0.92] max-w-[760px]">
            Elige tu acceso
            <br />
            a <span className="text-transparent" style={{ WebkitTextStroke: '2px #0D0D0D' }}>Anza.</span>
          </h1>

          <p className="mt-6 font-display text-base md:text-lg text-ink/60 leading-relaxed max-w-[620px]">
            Separamos la lista de espera por perfil para personalizar mejor tu onboarding.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/waitlist/creadores"
              className="liquid-glass rounded-2xl border border-ink/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(13,13,13,0.12)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Para Creadores</span>
              <h2 className="mt-3 font-display font-black text-3xl tracking-tighter text-ink">Waitlist de Creadores</h2>
              <p className="mt-3 font-display text-sm text-ink/60 leading-relaxed">
                Campañas activas, entregas centralizadas y pagos en un solo flujo.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink">
                Entrar <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              to="/waitlist/marcas"
              className="liquid-glass-strong rounded-2xl border border-ink/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(232,255,0,0.25)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/55">Para Marcas / Empresas</span>
              <h2 className="mt-3 font-display font-black text-3xl tracking-tighter text-ink">Waitlist de Marcas</h2>
              <p className="mt-3 font-display text-sm text-ink/70 leading-relaxed">
                Reclutamiento de creadores, aprobación de contenido y medición de campañas.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink">
                Entrar <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
