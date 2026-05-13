import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { saveDemoReservation } from '../lib/leads';

const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

const WEEK_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export default function Demo() {
  const [step, setStep] = useState(1); // 1 = form, 2 = booking
  const [form, setForm] = useState({ email: '', name: '' });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const today = startOfDay(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const startOffset = getDay(startOfMonth(currentMonth));

  const handleContinue = (e) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setStep(2);
  };

  const handleConfirm = async () => {
    if (!selectedDay || !selectedTime) return;
    try {
      await saveDemoReservation({
        name: form.name,
        email: form.email,
        dayIso: selectedDay.toISOString(),
        time: selectedTime,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error saving demo reservation:', error);
      window.alert('No se pudo guardar tu reserva. Intenta otra vez.');
    }
  };

  const labelClass = 'font-nav text-sm font-medium uppercase leading-none tracking-[0.02em]';
  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-display text-sm text-canvas outline-none transition-colors placeholder:text-canvas/30 focus:border-spark/70 focus:bg-white/[0.07]';
  const primaryButtonClass =
    'group inline-flex items-center justify-center gap-2 rounded-full bg-iris px-8 py-4 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-anza-deep hover:shadow-[0_14px_30px_-12px_rgba(123,44,255,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] focus:outline-none focus-visible:ring-4 focus-visible:ring-iris/40';

  return (
    <div className="min-h-screen bg-ink font-display flex flex-col">
      <Navbar showBackLink backHref="/" />

      <div className="relative flex-1 overflow-hidden px-3 pb-32 pt-28 md:min-h-screen md:px-3 md:pb-40 md:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(900px,140vw)] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(123,44,255,0.34)_0%,rgba(123,44,255,0.12)_42%,transparent_72%)]"
        />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto mb-10 max-w-[820px] text-center"
        >
          <h1 className="mx-auto max-w-[760px] font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px] sm:text-[40px] sm:leading-[41px] lg:text-[46px] lg:leading-[47px]">
            Reserva una llamada
          </h1>
          <p className="mx-auto mt-4 max-w-[620px] font-display text-base leading-relaxed text-canvas/60 md:text-lg">
            En esta llamada de 30 min cubriremos tu situación y objetivos, veremos la
            plataforma y encontraremos el plan ideal para ti, totalmente gratis.
          </p>

        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 mx-auto w-full max-w-md rounded-[28px] bg-iris px-10 py-14 text-center shadow-[0_24px_60px_-28px_rgba(123,44,255,0.9)]"
          >
            <span className={`${labelClass} mb-4 block text-canvas/55`}>Confirmado</span>
            <h2 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[35px] tracking-[-0.2px]">¡Tu demo está reservada!</h2>
            <p className="mt-4 font-display text-canvas/70 text-sm leading-relaxed">
              Te hemos enviado un correo de confirmación a <strong>{form.email}</strong> con todos los detalles.
            </p>
            <Link to="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas transition-colors hover:bg-canvas/80">
              Volver al inicio
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            {/* Progress */}
            <div className="flex items-center gap-6 border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-spark' : 'bg-canvas/20'}`} />
                <span className={`${labelClass} ${step === 1 ? 'text-canvas' : 'text-canvas/40'}`}>
                  Completa el formulario
                </span>
              </div>
              <div className="h-px flex-1 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-spark' : 'bg-canvas/20'}`} />
                <span className={`${labelClass} ${step === 2 ? 'text-canvas' : 'text-canvas/40'}`}>
                  Elige tu horario
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left panel */}
              <div className="border-b border-white/10 p-6 md:w-[45%] md:border-b-0 md:border-r md:p-8">
                <h3 className="font-bold text-white [font-family:Grantska,Arial,sans-serif] text-[28px] leading-[29px] tracking-[-0.2px]">Evaluación con Anza</h3>
                <p className="mt-3 font-display text-sm leading-relaxed text-canvas/55">
                  En esta llamada de 30 min cubriremos tu situación y objetivos,
                  veremos la plataforma y encontraremos el plan ideal para ti.
                </p>

                {step === 1 ? (
                  <form onSubmit={handleContinue} className="mt-6 space-y-4">
                    <div>
                      <input
                        required
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <input
                        required
                        placeholder="Nombre *"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <p className="font-display text-[11px] leading-relaxed text-canvas/35">
                      Al ingresar tu información, eres consciente que tus datos sean guardados conforme a nuestros Términos y Política de Privacidad.
                    </p>
                    <button
                      type="submit"
                      className={`${primaryButtonClass} w-full`}
                    >
                      Continuar <ArrowRight size={14} />
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <span className={`${labelClass} text-canvas/40`}>Email</span>
                      <p className="font-display text-sm text-canvas mt-0.5">{form.email}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <span className={`${labelClass} text-canvas/40`}>Nombre</span>
                      <p className="font-display text-sm text-canvas mt-0.5">{form.name}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex rounded-full px-3 py-1.5 font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas/45 transition-colors hover:bg-canvas/5 hover:text-canvas"
                    >
                      ← Editar datos
                    </button>

                    {selectedDay && selectedTime && (
                      <button
                        onClick={handleConfirm}
                        className={`${primaryButtonClass} mt-4 w-full`}
                      >
                        Confirmar reserva <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Right panel — Calendar */}
              <div className="p-6 md:w-[55%] md:p-8">
                {step === 1 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="max-w-xs rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                      <p className="font-display text-sm text-canvas/55">
                        Por favor completa el formulario antes de elegir tu horario.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`${labelClass} text-canvas capitalize`}>
                        {format(currentMonth, 'MMMM yyyy', { locale: es })}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setCurrentMonth(m => subMonths(m, 1))}
                          className="rounded-full p-1.5 text-canvas transition-colors hover:bg-white/10"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setCurrentMonth(m => addMonths(m, 1))}
                          className="rounded-full p-1.5 text-canvas transition-colors hover:bg-white/10"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {WEEK_DAYS.map(d => (
                        <div key={d} className={`${labelClass} py-1 text-center text-canvas/35`}>
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-y-1">
                      {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {daysInMonth.map(day => {
                        const isPast = isBefore(day, today);
                        const isSelected = selectedDay && isSameDay(day, selectedDay);
                        const isTodayDay = isToday(day);
                        return (
                          <button
                            key={day.toISOString()}
                            disabled={isPast}
                            onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                            className={`
                              mx-auto flex h-8 w-8 items-center justify-center rounded-full font-display text-sm transition-colors
                              ${isPast ? 'text-canvas/20 cursor-not-allowed' : 'hover:bg-spark hover:text-ink cursor-pointer text-canvas'}
                              ${isSelected ? 'bg-iris text-canvas' : ''}
                              ${isTodayDay && !isSelected ? 'border border-canvas/50' : ''}
                            `}
                          >
                            {format(day, 'd')}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time slots */}
                    {selectedDay && (
                      <div className="mt-4 border-t border-white/10 pt-4">
                        <span className={`${labelClass} mb-3 block text-canvas/45`}>
                          Horarios disponibles — {format(selectedDay, 'd MMM', { locale: es })}
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {TIMES.map(t => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`
                                rounded-full border px-4 py-2 font-nav text-sm font-medium leading-none tracking-[0.02em] transition-colors
                                ${selectedTime === t ? 'bg-iris text-canvas border-iris' : 'border-white/15 text-canvas hover:border-spark hover:bg-spark hover:text-ink'}
                              `}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
