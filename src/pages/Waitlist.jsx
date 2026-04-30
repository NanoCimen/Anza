import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Users, BarChart2, DollarSign, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: Users, title: 'Recluta Creadores', desc: 'Accede a más de 500K creadores de contenido en Latam al instante.' },
  { icon: BarChart2, title: 'Seguimiento en Tiempo Real', desc: 'Monitorea vistas, engagement y conversiones de cada campaña.' },
  { icon: DollarSign, title: 'Pagos Automáticos', desc: 'Pagos sin fricción. Más de $10M ya pagados a creadores.' },
  { icon: Megaphone, title: 'Gestión de Campañas', desc: 'Administra tu roster y ejecuta campañas desde un solo lugar.' },
];

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-canvas font-display flex flex-col">
      {/* Hairline grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-ink/5" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-ink/5" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-ink/5" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-ink/10 px-6 md:px-16 h-16 flex items-center justify-between max-w-[1440px] mx-auto w-full">
        <Link to="/" className="font-display font-black text-2xl tracking-tighter text-ink">
          ANZA
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/demo" className="border border-ink/20 text-ink font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 hover:border-ink transition-colors">
            Reserva una Demostración
          </Link>
          <Link to="/" className="font-mono text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
            ← Volver
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-stretch">
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-16 flex flex-col md:flex-row gap-0 py-16 md:py-0 md:items-center">

          {/* Left — brand pitch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-[55%] md:pr-20 py-12"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-6">
              01 / Acceso anticipado
            </span>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-ink leading-[0.92]">
              Gestiona campañas
              <br />
              UGC a escala,
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #0D0D0D' }}>sin fricción.</span>
            </h1>

            <p className="mt-6 font-display text-base text-ink/50 leading-relaxed max-w-md">
              Más de 500,000 creadores y 1,000+ marcas ya confían en Anza para
              gestionar briefs, aprobaciones y pagos en un solo sistema operativo.
            </p>

            <div className="mt-10 space-y-4">
              {FEATURES.map((feature, i) => {
                    const FeatureIcon = feature.icon;
                    return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-4 p-4 border border-ink/10 hover:border-ink/20 transition-colors"
                    >
                      <div className="w-9 h-9 bg-spark flex items-center justify-center shrink-0">
                        <FeatureIcon size={16} className="text-ink" />
                      </div>
                      <div>
                        <span className="font-display font-semibold text-sm text-ink block">{feature.title}</span>
                        <span className="font-display text-xs text-ink/50 leading-relaxed">{feature.desc}</span>
                      </div>
                    </motion.div>
                    );
                  })}
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px bg-ink/10 self-stretch my-16" />

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-[45%] md:pl-16 flex flex-col justify-center"
          >
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-14 h-14 bg-spark mx-auto flex items-center justify-center mb-6">
                  <span className="font-display font-black text-xl text-ink">✓</span>
                </div>
                <h2 className="font-display font-black text-3xl tracking-tight text-ink">¡Ya estás en lista!</h2>
                <p className="mt-3 font-display text-sm text-ink/50 leading-relaxed max-w-xs mx-auto">
                  Te notificaremos en <strong className="text-ink">{email}</strong> cuando tu acceso esté listo.
                </p>
                <Link to="/" className="mt-8 inline-flex items-center gap-2 bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-spark hover:text-ink transition-colors">
                  Volver al inicio <ArrowRight size={14} />
                </Link>
              </motion.div>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-2">
                  Únete a la lista de espera
                </span>
                <h2 className="font-display font-black text-3xl md:text-4xl tracking-tighter text-ink leading-tight">
                  Solicita acceso
                  <br />anticipado
                </h2>
                <p className="mt-3 font-display text-sm text-ink/50 leading-relaxed">
                  Sé de los primeros en acceder a la plataforma. Cupos limitados.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-2">
                      Tu email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="tu@empresa.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-ink/20 focus:border-ink px-4 py-4 font-display text-sm text-ink placeholder:text-ink/30 outline-none transition-colors bg-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ink text-canvas font-mono text-xs uppercase tracking-widest py-5 flex items-center justify-center gap-2 hover:bg-spark hover:text-ink transition-colors disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-spark"
                  >
                    {loading ? (
                      <><Loader2 size={14} className="animate-spin" /> Procesando...</>
                    ) : (
                      <>Unirme a la lista <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-ink/10">
                  <p className="font-display text-xs text-ink/30 leading-relaxed">
                    Al registrarte aceptas nuestros{' '}
                    <a href="#" className="underline hover:text-ink transition-colors">Términos</a>{' '}
                    y{' '}
                    <a href="#" className="underline hover:text-ink transition-colors">Política de Privacidad</a>.
                  </p>
                </div>

                <div className="mt-6">
                  <p className="font-display text-xs text-ink/40">
                    ¿Prefieres ver la plataforma en acción?{' '}
                    <Link to="/demo" className="text-ink font-semibold underline hover:text-spark transition-colors">
                      Reserva una demo →
                    </Link>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-ink/10 px-6 md:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1440px] mx-auto w-full">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink/30">© 2026 Anza. Todos los derechos reservados.</span>
        <div className="flex gap-6">
          <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">Términos</a>
          <a href="#" className="font-mono text-[10px] uppercase tracking-widest text-ink/30 hover:text-ink transition-colors">Privacidad</a>
        </div>
      </div>
    </div>
  );
}
