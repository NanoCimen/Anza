import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Loader2,
  Users,
  BarChart2,
  DollarSign,
  Megaphone,
  ChevronLeft,
} from 'lucide-react';
import { SiFacebook, SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Footer from '../components/landing/Footer';
import { saveWaitlistLead } from '../lib/leads';
import { backgroundWaitlist } from '@/assets';

const ANZA_LOGO = '/logosintransparente.png';

const CONTENT = {
  marcas: {
    eyebrow: 'Acceso anticipado',
    heroTitle: ['Gestiona campañas', 'UGC a escala,'],
    strokeWord: 'sin fricción.',
    heroDescription:
      'Conecta con creadores de contenido, gestiona tus campañas y págales automáticamente — todo desde un solo lugar..',
    formEyebrow: 'Únete a la lista de espera',
    formTitle: ['Solicita acceso', 'anticipado'],
    formDescription: '',
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
    eyebrow: 'Acceso anticipado',
    heroTitle: ['Aplica a campañas', 'UGC reales,'],
    strokeWord: 'sin intermediarios.',
    heroDescription:
      'Únete a campañas de marcas activas, gestiona entregas en una sola plataforma y recibe pagos de forma rápida y segura.',
    formEyebrow: 'Únete a la lista de creadores',
    formTitle: ['Solicita acceso', 'como creador'],
    formDescription: '',
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
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [facebook, setFacebook] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [keepUpdated, setKeepUpdated] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [socialError, setSocialError] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const copy = CONTENT[audience] || CONTENT.marcas;
  const usesSimpleLayout = true;
  const infoPage =
    audience === 'creadores'
      ? { label: 'Información para Creadores', href: '/creadores' }
      : { label: 'Información para Marcas/Agencias', href: '/marcas' };

  const labelClass = usesSimpleLayout ? 'text-white/70' : 'text-canvas/45';
  const optionalClass = usesSimpleLayout ? 'text-white/45' : 'text-canvas/40';
  const inputBaseClass = usesSimpleLayout
    ? 'w-full rounded-2xl border border-white/10 bg-white/15 py-4 font-display text-sm text-white outline-none transition-colors placeholder:text-white/45 focus:border-white'
    : 'w-full rounded-2xl border border-canvas/15 bg-black/30 py-4 font-display text-sm text-canvas outline-none transition-colors placeholder:text-canvas/30 focus:border-spark';

  const goToSocialStep = () => {
    setEmailError('');
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('El correo es obligatorio.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Introduce un correo válido.');
      return;
    }
    setStep(2);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('El correo es obligatorio.');
      setStep(1);
      return;
    }
    const hasInstagram = Boolean(instagram.trim());
    const hasTiktok = Boolean(tiktok.trim());
    if (!hasInstagram && !hasTiktok) {
      setSocialError('Completa Instagram o TikTok (al menos uno).');
      return;
    }
    setSocialError('');
    setLoading(true);
    try {
      await saveWaitlistLead({
        audience,
        email: trimmedEmail,
        keepUpdated,
        fullName: fullName.trim(),
        instagram: instagram.trim(),
        tiktok: tiktok.trim(),
        facebook: facebook.trim(),
        whatsapp: whatsapp.trim(),
      });
      setDone(true);
    } catch (error) {
      console.error('Error saving waitlist lead:', error);
      const message = error instanceof Error ? error.message : '';
      if (message.toLowerCase().includes('instagram') || message.toLowerCase().includes('tiktok')) {
        setSocialError('Completa Instagram o TikTok (al menos uno).');
      } else {
        window.alert('No se pudo guardar tu registro. Intenta otra vez.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-ink bg-cover bg-center bg-no-repeat font-display"
      style={{ backgroundImage: `url(${backgroundWaitlist})` }}
    >
      <header className="relative z-20 flex w-full items-center justify-center pt-8 text-center md:pt-10">
        <Link to="/waitlist" aria-label="Lista de espera Anza" className="inline-flex">
          <img
            src={ANZA_LOGO}
            alt="Anza"
            width={112}
            height={112}
            draggable={false}
            className="h-20 w-20 shrink-0 select-none object-contain object-center drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] md:h-24 md:w-24"
          />
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 items-stretch">
        <div className={`relative mx-auto flex min-h-[calc(100vh-7rem)] w-full px-3 py-16 md:min-h-[calc(100vh-7.5rem)] md:py-20 ${usesSimpleLayout ? 'max-w-[430px] items-start justify-center' : 'max-w-[1240px] flex-col gap-12 md:flex-row md:items-center md:gap-14'}`}>
          {!usesSimpleLayout && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="md:w-[55%]"
            >
              <span className="mb-6 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas/45">
                {copy.eyebrow}
              </span>

              <h1 className="max-w-[640px] font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[36px] leading-[37px] tracking-[-0.2px] sm:text-[44px] sm:leading-[45px] lg:text-[54px] lg:leading-[55px]">
                {copy.heroTitle[0]}
                <br />
                {copy.heroTitle[1]}
                <br />
                <span className="text-spark">{copy.strokeWord}</span>
              </h1>

              <p className="mt-6 max-w-md font-display text-base leading-relaxed text-canvas/60">
                {copy.heroDescription}
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {copy.features.map((feature, i) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-colors hover:border-spark/35"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-iris">
                        <FeatureIcon size={16} className="text-white" />
                      </div>
                      <div>
                        <span className="block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas">{feature.title}</span>
                        <span className="mt-2 block font-display text-xs leading-relaxed text-canvas/55">{feature.desc}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col justify-center ${usesSimpleLayout ? 'w-full bg-transparent p-0 text-center' : 'rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_-50px_rgba(123,44,255,0.9)] backdrop-blur-xl md:w-[45%] md:p-8'}`}
          >
            {done ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-iris">
                  <span className="font-display text-xl font-black text-white">✓</span>
                </div>
                <h2 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[30px] leading-[31px] tracking-[-0.2px]">{copy.successTitle}</h2>
                <p className="mx-auto mt-3 max-w-xs font-display text-sm leading-relaxed text-canvas/55">
                  Te notificaremos en <strong className="text-canvas">{email}</strong> cuando tu acceso esté listo.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-iris px-8 py-4 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-white shadow-[0_0_34px_rgba(123,44,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-spark"
                  >
                    Volver al inicio <ArrowRight size={14} />
                  </Link>
                  <Link
                    to={infoPage.href}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-spark/50 hover:bg-white/15"
                  >
                    {infoPage.label} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={false}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span
                        className={`mb-3 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${usesSimpleLayout ? 'text-white/70' : 'text-canvas/45'}`}
                      >
                        {copy.formEyebrow}
                      </span>
                      <h2 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[30px] leading-[31px] tracking-[-0.2px] md:text-[36px] md:leading-[37px]">
                        {copy.formTitle[0]}
                        <br />
                        {copy.formTitle[1]}
                      </h2>
                      {copy.formDescription && (
                        <p className="mt-3 font-display text-sm leading-relaxed text-canvas/55">
                          {copy.formDescription}
                        </p>
                      )}

                      <div className="mt-8 flex w-full flex-col gap-4 text-left">
                        <div>
                          <label
                            htmlFor="waitlist-full-name"
                            className={`mb-2 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${labelClass}`}
                          >
                            Nombre completo{' '}
                            <span className={`font-display text-xs font-normal normal-case tracking-normal ${optionalClass}`}>
                              (opcional)
                            </span>
                          </label>
                          <input
                            id="waitlist-full-name"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Tu nombre"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            className={`${inputBaseClass} px-4`}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="waitlist-email"
                            className={`mb-2 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${labelClass}`}
                          >
                            Tu email *
                          </label>
                          <input
                            id="waitlist-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="tu@empresa.com"
                            value={email}
                            onChange={e => {
                              setEmail(e.target.value);
                              if (emailError) setEmailError('');
                            }}
                            className={`${inputBaseClass} px-4`}
                          />
                          {emailError ? (
                            <p className="mt-2 font-display text-xs text-red-300" role="alert">
                              {emailError}
                            </p>
                          ) : null}
                        </div>

                        {usesSimpleLayout && (
                          <label className="flex items-start justify-between gap-4 rounded-2xl py-1">
                            <span>
                              <span className="block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-white">
                                Mantente actualizado
                              </span>
                              <span className="mt-2 block font-display text-xs leading-relaxed text-white/70">
                                Recibe actualizaciones por correo sobre oportunidades, ofertas y recomendaciones de Anza.
                              </span>
                            </span>
                            <button
                              type="button"
                              aria-pressed={keepUpdated}
                              onClick={() => setKeepUpdated(v => !v)}
                              className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${keepUpdated ? 'bg-iris' : 'bg-white/25'}`}
                            >
                              <span
                                className={`absolute left-0 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${keepUpdated ? 'translate-x-6' : 'translate-x-1'}`}
                              />
                            </button>
                          </label>
                        )}

                        <button
                          type="button"
                          onClick={goToSocialStep}
                          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full py-5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none ${usesSimpleLayout ? 'bg-ink text-white hover:bg-iris focus:ring-4 focus:ring-iris/30' : 'bg-iris text-white shadow-[0_0_34px_rgba(123,44,255,0.45)] hover:bg-spark focus:ring-4 focus:ring-spark/30'}`}
                        >
                          Continuar <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setEmailError('');
                          setSocialError('');
                        }}
                        className="mb-6 flex items-center gap-1.5 font-nav text-xs font-medium uppercase leading-none tracking-[0.02em] text-white/70 transition-colors hover:text-white"
                      >
                        <ChevronLeft size={16} strokeWidth={2} aria-hidden />
                        Atrás
                      </button>

                      <h2 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[30px] leading-[31px] tracking-[-0.2px] md:text-[36px] md:leading-[37px]">
                        Redes sociales
                      </h2>
                      <p className="mt-3 font-display text-sm leading-relaxed text-white/70">
                        Instagram o TikTok — al menos uno es obligatorio.
                      </p>

                      <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-4 text-left">
                        <div>
                          <label
                            htmlFor="waitlist-ig"
                            className={`mb-2 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${labelClass}`}
                          >
                            Instagram
                          </label>
                          <div className="relative">
                            <span
                              className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-white"
                              aria-hidden
                            >
                              <SiInstagram size={18} className="text-white opacity-95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" />
                            </span>
                            <input
                              id="waitlist-ig"
                              name="instagram"
                              type="text"
                              inputMode="text"
                              placeholder="@tuusuario"
                              value={instagram}
                              onChange={e => {
                                setInstagram(e.target.value);
                                if (socialError) setSocialError('');
                              }}
                              className={`${inputBaseClass} pl-12 pr-4`}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="waitlist-tiktok"
                            className={`mb-2 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${labelClass}`}
                          >
                            TikTok
                          </label>
                          <div className="relative">
                            <span
                              className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-white"
                              aria-hidden
                            >
                              <SiTiktok size={18} className="text-white opacity-95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" />
                            </span>
                            <input
                              id="waitlist-tiktok"
                              name="tiktok"
                              type="text"
                              placeholder="@tuusuario"
                              value={tiktok}
                              onChange={e => {
                                setTiktok(e.target.value);
                                if (socialError) setSocialError('');
                              }}
                              className={`${inputBaseClass} pl-12 pr-4`}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="waitlist-fb"
                            className={`mb-2 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${labelClass}`}
                          >
                            Facebook{' '}
                            <span className={`font-display text-xs font-normal normal-case tracking-normal ${optionalClass}`}>
                              (opcional)
                            </span>
                          </label>
                          <div className="relative">
                            <span
                              className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-white"
                              aria-hidden
                            >
                              <SiFacebook size={18} className="text-white opacity-95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" />
                            </span>
                            <input
                              id="waitlist-fb"
                              name="facebook"
                              type="text"
                              placeholder="facebook.com/tuusuario"
                              value={facebook}
                              onChange={e => setFacebook(e.target.value)}
                              className={`${inputBaseClass} pl-12 pr-4`}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="waitlist-wa"
                            className={`mb-2 block font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${labelClass}`}
                          >
                            WhatsApp{' '}
                            <span className={`font-display text-xs font-normal normal-case tracking-normal ${optionalClass}`}>
                              (opcional)
                            </span>
                          </label>
                          <div className="relative">
                            <span
                              className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-white"
                              aria-hidden
                            >
                              <SiWhatsapp size={18} className="text-white opacity-95 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" />
                            </span>
                            <input
                              id="waitlist-wa"
                              name="whatsapp"
                              type="tel"
                              autoComplete="tel"
                              placeholder="+1 809 000 0000"
                              value={whatsapp}
                              onChange={e => setWhatsapp(e.target.value)}
                              className={`${inputBaseClass} pl-12 pr-4`}
                            />
                          </div>
                        </div>

                        {socialError ? (
                          <p className="font-display text-xs text-red-300" role="alert">
                            {socialError}
                          </p>
                        ) : null}

                        <button
                          type="submit"
                          disabled={loading}
                          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full py-5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 focus:outline-none ${usesSimpleLayout ? 'bg-ink text-white hover:bg-iris focus:ring-4 focus:ring-iris/30' : 'bg-iris text-white shadow-[0_0_34px_rgba(123,44,255,0.45)] hover:bg-spark focus:ring-4 focus:ring-spark/30'}`}
                        >
                          {loading ? (
                            <>
                              <Loader2 size={14} className="animate-spin" /> Procesando...
                            </>
                          ) : (
                            <>
                              Unirme a la lista <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`mt-6 border-t pt-6 ${usesSimpleLayout ? 'border-black/10' : 'border-canvas/10'}`}>
                  <p className={`font-display text-xs leading-relaxed ${usesSimpleLayout ? 'text-ink/70' : 'text-canvas/35'}`}>
                    Al registrarte aceptas nuestros{' '}
                    <a href="#" className="underline transition-colors hover:text-iris">
                      Términos
                    </a>{' '}
                    y{' '}
                    <a href="#" className="underline transition-colors hover:text-iris">
                      Política de Privacidad
                    </a>
                    .
                  </p>
                </div>

                <div className="mt-6">
                  <p className={`font-display text-xs ${usesSimpleLayout ? 'text-ink/70' : 'text-canvas/45'}`}>
                    {copy.demoPrompt}{' '}
                    <Link
                      to="/demo"
                      className={`font-semibold underline transition-colors ${usesSimpleLayout ? 'text-ink hover:text-iris' : 'text-canvas hover:text-spark'}`}
                    >
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
      {usesSimpleLayout && showCookieBanner && (
        <div className="fixed inset-x-3 bottom-4 z-30 mx-auto max-w-[980px] rounded-2xl bg-white/92 p-4 text-ink shadow-[0_18px_60px_-32px_rgba(0,0,0,0.45)] backdrop-blur-md md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em]">
              Usamos cookies
            </p>
            <p className="mt-2 max-w-[620px] font-display text-xs leading-relaxed text-ink/65">
              Utilizamos cookies para personalizar tu experiencia, analizar el tráfico y mejorar nuestros servicios.
            </p>
          </div>
          <div className="mt-4 flex shrink-0 flex-col gap-2 md:mt-0 md:w-48">
            <button
              type="button"
              onClick={() => setShowCookieBanner(false)}
              className="rounded-full bg-ink px-5 py-2.5 font-nav text-xs font-medium uppercase leading-none tracking-[0.02em] text-white transition-colors hover:bg-iris"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => setShowCookieBanner(false)}
              className="rounded-full border border-ink/30 px-5 py-2.5 font-nav text-xs font-medium uppercase leading-none tracking-[0.02em] text-ink transition-colors hover:border-iris hover:text-iris"
            >
              Solo esenciales
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
