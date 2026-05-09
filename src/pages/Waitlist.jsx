import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2, Users, BarChart2, DollarSign, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { saveWaitlistLead } from '../lib/leads';

const CONTENT = {
  marcas: {
    eyebrow: '/ Acceso anticipado',
    heroTitle: ['Gestiona campañas', 'UGC a escala,'],
    strokeWord: 'sin fricción.',
    heroDescription:
      'Conecta con creadores de contenido, gestiona tus campañas y págales automáticamente — todo desde un solo lugar..',
    formEyebrow: 'Únete a la lista de espera',
    formTitle: ['Solicita acceso', 'anticipado'],
    formDescription: 'Sé de los primeros en acceder a la plataforma. Cupos limitados.',
    successTitle: '¡Ya estás en lista!',
    demoPrompt: '¿Prefieres ver la plataforma en acción?',
    features: [
      { icon: Users, title: 'Recluta Creadores', desc: 'Encuentra creadores de contenido en LATAM que encajan con tu marca y tu nicho.' },
      { icon: BarChart2, title: 'Seguimiento en Tiempo Real', desc: 'Monitorea vistas, engagement y conversiones de cada campaña.' },
      { icon: DollarSign, title: 'Pagos Automáticos', desc: 'La plataforma establece un contrato y paga por tu contenido, sin transferencias manuales ni hojas de cálculo.' },
      { icon: Megaphone, title: 'Gestión de Campañas', desc: 'Administra tu roster y ejecuta campañas desde un solo lugar.' },
    ],
  },
  creadores: {
    eyebrow: '/ Acceso anticipado',
    heroTitle: ['Aplica a campañas', 'UGC reales,'],
    strokeWord: 'sin intermediarios.',
    heroDescription:
      'Únete a campañas de marcas activas, gestiona entregas en una sola plataforma y recibe pagos de forma rápida y segura.',
    formEyebrow: 'Únete a la lista de creadores',
    formTitle: ['Solicita acceso', 'como creador'],
    formDescription: 'Cupos limitados para creadores en esta etapa de lanzamiento.',
    successTitle: '¡Ya estás en lista de creadores!',
    demoPrompt: '¿Quieres ver cómo funciona la plataforma?',
    features: [
      { icon: Megaphone, title: 'Campañas Activas', desc: 'Aplica a campañas de marcas gratuitamente y cobra por tu contenido.' },
      { icon: BarChart2, title: 'Tracking de Rendimiento', desc: 'Visualiza tus resultados en tiempo real.' },
      { icon: DollarSign, title: 'Pagos y contratos', desc: 'Recibe pagos claros y sin fricción por tu contenido.' },
      { icon: Users, title: 'Perfil Profesional', desc: 'Construye historial para cerrar más campañas.' },
    ],
  },
};

export default function Waitlist({ audience = 'marcas' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const copy = CONTENT[audience] || CONTENT.marcas;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await saveWaitlistLead({ audience, email });
      setDone(true);
    } catch (error) {
      console.error('Error saving waitlist lead:', error);
      window.alert('No se pudo guardar tu registro. Intenta otra vez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink font-display flex flex-col">
      {/* Hairline grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-canvas/5" />
        <div className="absolute left-2/3 top-0 bottom-0 w-px bg-canvas/5" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-canvas/5" />
      </div>

      <Navbar />

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-stretch pt-16">
        <div className="relative max-w-[1440px] mx-auto w-full px-6 md:px-10 flex flex-col md:flex-row gap-0 py-12 md:py-0 md:items-center">
          <div className="absolute top-20 right-2 md:top-20 md:right-6 lg:right-10 z-40">
            <Link
              to="/"
              className="liquid-glass border border-canvas/20 text-canvas bg-ink/50 font-mono text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-canvas hover:text-ink hover:shadow-[0_10px_30px_rgba(10,10,10,0.35)] focus:outline-none focus:ring-4 focus:ring-spark inline-flex items-center gap-2 rounded-full"
            >
              <ArrowLeft size={14} />
              VOLVER
            </Link>
          </div>

          {/* Left — brand pitch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-[55%] md:pr-20 py-12"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-6">
              {copy.eyebrow}
            </span>

            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter text-canvas leading-[0.92]">
              {copy.heroTitle[0]}
              <br />
              {copy.heroTitle[1]}
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #0A0A0A' }}>{copy.strokeWord}</span>
            </h1>

            <p className="mt-6 font-display text-base text-canvas/50 leading-relaxed max-w-md">
              {copy.heroDescription}
            </p>

            <div className="mt-10 space-y-4">
              {copy.features.map((feature, i) => {
                    const FeatureIcon = feature.icon;
                    return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                      className="liquid-glass flex items-start gap-4 p-4 border border-canvas/10 hover:border-canvas/20 transition-colors rounded-xl"
                    >
                      <div className="w-9 h-9 bg-spark flex items-center justify-center shrink-0">
                        <FeatureIcon size={16} className="text-canvas" />
                      </div>
                      <div>
                        <span className="font-display font-semibold text-sm text-canvas block">{feature.title}</span>
                        <span className="font-display text-xs text-canvas/50 leading-relaxed">{feature.desc}</span>
                      </div>
                    </motion.div>
                    );
                  })}
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px bg-canvas/10 self-stretch my-16" />

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
                  <span className="font-display font-black text-xl text-canvas">✓</span>
                </div>
                <h2 className="font-display font-black text-3xl tracking-tight text-canvas">{copy.successTitle}</h2>
                <p className="mt-3 font-display text-sm text-canvas/50 leading-relaxed max-w-xs mx-auto">
                  Te notificaremos en <strong className="text-canvas">{email}</strong> cuando tu acceso esté listo.
                </p>
                <Link to="/" className="mt-8 inline-flex items-center gap-2 bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-spark hover:text-ink transition-colors">
                  Volver al inicio <ArrowRight size={14} />
                </Link>
              </motion.div>
            ) : (
              <>
                <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-2">
                  {copy.formEyebrow}
                </span>
                <h2 className="font-display font-black text-3xl md:text-4xl tracking-tighter text-canvas leading-tight">
                  {copy.formTitle[0]}
                  <br />{copy.formTitle[1]}
                </h2>
                <p className="mt-3 font-display text-sm text-canvas/50 leading-relaxed">
                  {copy.formDescription}
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-2">
                      Tu email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="tu@empresa.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full border border-canvas/20 focus:border-canvas px-4 py-4 font-display text-sm text-canvas placeholder:text-canvas/30 outline-none transition-colors bg-transparent liquid-glass"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full liquid-glass-strong bg-ink text-canvas font-mono text-xs uppercase tracking-widest py-5 flex items-center justify-center gap-2 hover:bg-spark hover:text-ink transition-colors disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-spark"
                  >
                    {loading ? (
                      <><Loader2 size={14} className="animate-spin" /> Procesando...</>
                    ) : (
                      <>Unirme a la lista <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-canvas/10">
                  <p className="font-display text-xs text-canvas/30 leading-relaxed">
                    Al registrarte aceptas nuestros{' '}
                    <a href="#" className="underline hover:text-canvas transition-colors">Términos</a>{' '}
                    y{' '}
                    <a href="#" className="underline hover:text-canvas transition-colors">Política de Privacidad</a>.
                  </p>
                </div>

                <div className="mt-6">
                  <p className="font-display text-xs text-canvas/40">
                    {copy.demoPrompt}{' '}
                    <Link to="/demo" className="text-canvas font-semibold underline hover:text-spark transition-colors">
                      Reserva una llamada →
                    </Link>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
