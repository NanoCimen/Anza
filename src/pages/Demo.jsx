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

  return (
    <div className="min-h-screen bg-ink font-display flex flex-col">
      <Navbar showBackLink backHref="/" />

      <div className="flex-1 flex flex-col items-center justify-start pt-28 md:pt-32 pb-16 px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tighter text-canvas">
            Reserva una Llamada
          </h1>
          <p className="mt-3 font-display text-canvas/50 max-w-md mx-auto text-base md:text-lg leading-relaxed">
            En esta llamada de 30 min cubriremos tu situación y objetivos, veremos la
            plataforma y encontraremos el plan ideal para ti, totalmente gratis.
          </p>

        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-spark px-12 py-16 text-center max-w-md w-full"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/50 block mb-4">Confirmado</span>
            <h2 className="font-display font-black text-3xl tracking-tight text-canvas">¡Tu demo está reservada!</h2>
            <p className="mt-4 font-display text-canvas/60 text-sm leading-relaxed">
              Te hemos enviado un correo de confirmación a <strong>{form.email}</strong> con todos los detalles.
            </p>
            <Link to="/" className="mt-8 inline-block bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-canvas/80 transition-colors">
              Volver al inicio
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full max-w-3xl border border-canvas/10 bg-white liquid-glass"
          >
            {/* Progress */}
            <div className="border-b border-canvas/10 px-6 py-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-ink' : 'bg-ink/20'}`} />
                <span className={`font-mono text-[10px] uppercase tracking-widest ${step === 1 ? 'text-canvas' : 'text-canvas/40'}`}>
                  Completa el formulario
                </span>
              </div>
              <div className="flex-1 h-px bg-canvas/10" />
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-ink' : 'bg-ink/20'}`} />
                <span className={`font-mono text-[10px] uppercase tracking-widest ${step === 2 ? 'text-canvas' : 'text-canvas/40'}`}>
                  Elige tu horario
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Left panel */}
              <div className="md:w-[45%] p-6 md:p-8 border-b md:border-b-0 md:border-r border-canvas/10">
                <h3 className="font-display font-bold text-lg text-canvas">Demo de Anza</h3>
                <p className="mt-2 font-display text-sm text-canvas/50 leading-relaxed">
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
                        className="w-full border border-canvas/20 px-4 py-3 font-display text-sm text-canvas placeholder:text-canvas/30 outline-none focus:border-canvas transition-colors liquid-glass"
                      />
                    </div>
                    <div>
                      <input
                        required
                        placeholder="Nombre *"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full border border-canvas/20 px-4 py-3 font-display text-sm text-canvas placeholder:text-canvas/30 outline-none focus:border-canvas transition-colors liquid-glass"
                      />
                    </div>
                    <p className="font-display text-[11px] text-canvas/30 leading-relaxed">
                      Al ingresar tu información, consientes que tus datos sean guardados conforme a nuestros Términos y Política de Privacidad.
                    </p>
                    <button
                      type="submit"
                      className="w-full liquid-glass-strong bg-ink text-canvas font-mono text-xs uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-spark hover:text-ink transition-colors"
                    >
                      Continuar <ArrowRight size={14} />
                    </button>
                  </form>
                ) : (
                  <div className="mt-6 space-y-3">
                    <div className="p-3 bg-ink border border-canvas/10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">Email</span>
                      <p className="font-display text-sm text-canvas mt-0.5">{form.email}</p>
                    </div>
                    <div className="p-3 bg-ink border border-canvas/10">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">Nombre</span>
                      <p className="font-display text-sm text-canvas mt-0.5">{form.name}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 hover:text-canvas transition-colors"
                    >
                      ← Editar datos
                    </button>

                    {selectedDay && selectedTime && (
                      <button
                        onClick={handleConfirm}
                        className="w-full mt-4 bg-spark text-ink font-mono text-xs uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-canvas hover:text-ink transition-colors"
                      >
                        Confirmar reserva <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Right panel — Calendar */}
              <div className="md:w-[55%] p-6 md:p-8">
                {step === 1 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6 border border-canvas/10 max-w-xs">
                      <p className="font-display text-sm text-canvas/50">
                        Por favor completa el formulario antes de elegir tu horario.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display font-semibold text-sm text-canvas capitalize">
                        {format(currentMonth, 'MMMM yyyy', { locale: es })}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setCurrentMonth(m => subMonths(m, 1))}
                          className="p-1.5 hover:bg-canvas/5 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setCurrentMonth(m => addMonths(m, 1))}
                          className="p-1.5 hover:bg-canvas/5 transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {WEEK_DAYS.map(d => (
                        <div key={d} className="text-center font-mono text-[10px] uppercase tracking-widest text-canvas/30 py-1">
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
                              mx-auto w-8 h-8 flex items-center justify-center font-display text-sm transition-colors
                              ${isPast ? 'text-canvas/20 cursor-not-allowed' : 'hover:bg-spark cursor-pointer'}
                              ${isSelected ? 'bg-ink text-canvas' : ''}
                              ${isTodayDay && !isSelected ? 'border border-canvas' : ''}
                            `}
                          >
                            {format(day, 'd')}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time slots */}
                    {selectedDay && (
                      <div className="mt-4 border-t border-canvas/10 pt-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40 block mb-3">
                          Horarios disponibles — {format(selectedDay, 'd MMM', { locale: es })}
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {TIMES.map(t => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`
                                py-2 font-mono text-xs border transition-colors
                                ${selectedTime === t ? 'bg-ink text-canvas border-canvas' : 'border-canvas/20 text-canvas hover:border-canvas hover:bg-spark'}
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

            {/* Footer */}
            <div className="border-t border-canvas/10 px-6 py-3 text-center">
              <span className="font-mono text-[10px] text-canvas/30 uppercase tracking-widest">Powered by Anza</span>
            </div>
          </motion.div>
        )}

        {/* Bottom support */}
        <div className="mt-10 border border-canvas/10 px-6 py-4 flex flex-col sm:flex-row items-center gap-4 max-w-md w-full bg-white liquid-glass">
          <div className="flex -space-x-2">
            {['bg-spark', 'bg-ink', 'bg-ink/40'].map((c, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
            ))}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display font-semibold text-sm text-canvas">¿Necesitas ayuda con una cuenta existente?</p>
            <p className="font-display text-xs text-canvas/50">Personas reales, respuestas reales.</p>
          </div>
          <a href="#contact" className="liquid-glass-strong bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-spark hover:text-ink transition-colors whitespace-nowrap flex items-center gap-1">
            Contactar <ArrowRight size={12} />
          </a>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-canvas/30">Sin compromiso — solo una conversación rápida.</p>
      </div>
      <Footer />
    </div>
  );
}
