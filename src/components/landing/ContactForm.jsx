import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ScrollExploreHint from './ScrollExploreHint';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Completa nombre y correo electrónico.');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    toast.success('Datos enviados. Nos pondremos en contacto contigo.');
    setForm({ name: '', email: '', company: '' });
  };

  const inputClass =
    'w-full bg-transparent border-b border-canvas/20 focus:border-spark py-4 font-display text-base md:text-lg text-canvas placeholder:text-canvas/30 outline-none transition-colors';

  return (
    <section id="contact" className="bg-ink scroll-mt-24 md:scroll-mt-28 pb-24 md:pb-40 pt-10 md:pt-14 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="h-px bg-canvas/10 mt-4 md:mt-6 mb-10 md:mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-2">
              / Contacto
            </span>
            <div className="w-12 h-[2px] bg-spark mt-4 shadow-[0_0_10px_rgba(232,255,0,0.55)] origin-left" />
            <h2 className="font-display font-black text-3xl md:text-4xl tracking-tighter text-canvas mt-8">
              Construyamos
              <br />
              algo.
            </h2>
            <p className="font-display text-sm text-canvas/50 mt-4 leading-relaxed max-w-xs">
              Si quieres lanzar una campaña o eres creador y quieres ser descubierto — queremos conocerte.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="md:col-span-9 md:pl-8"
          >
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">
                    Nombre *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">
                    Correo *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@empresa.com"
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="pt-4">
                <label className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">
                  Empresa
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa (opcional)"
                  className={inputClass}
                  autoComplete="organization"
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-spark px-9 py-3.5 font-display text-sm md:text-base font-semibold tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(232,255,0,0.35)] disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
                >
                  {sending ? (
                    <span className="flex items-center gap-3">
                      <Loader2 size={14} className="animate-spin" />
                      Enviando…
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      Enviar
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
