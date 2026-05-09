import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ScrollExploreHint from './ScrollExploreHint';

const FAQS = [
  {
    q: '¿Cómo empiezo?',
    a: 'Crea tu cuenta, completa tu perfil de creador o marca y empieza a aplicar a campañas o publicar briefs. Aprobamos los perfiles rápido para que estés activo en cuestión de días, no semanas.',
  },
  {
    q: '¿Qué creadores hay en Anza?',
    a: 'Perfiles verificados en vídeo, creativos UGC, influencers y especialistas por vertical en LATAM. Filtras por plataforma, audiencia, idioma y disponibilidad antes de invitar a nadie.',
  },
  {
    q: '¿Qué puedo esperar y cómo se mide el éxito?',
    a: 'Acuerdas KPIs en el brief (entregas, tasas de conversión, vistas clave). El dashboard centraliza métricas por campaña para que compares rendimiento sin armar reportes a mano.',
  },
  {
    q: '¿Cómo se gestionan pagos y contratos?',
    a: 'Contratos y alcances quedan registrados en la plataforma; los pagos se pueden automatizar con esquemas por hito o recurrentes para reducir trabajo operativo y errores.',
  },
  {
    q: '¿Cuánto dinero puedo hacer como creador?',
    a: 'Tus ingresos dependen del brief, el alcance que aporte tu contenido y los bonos asociados. En Anza fijas tu tarifa, recibes ofertas claras de marcas y cobras desde el primer día — sin esperas ni tarifas ocultas.',
  },
  {
    q: '¿Anza comparado con contratar una agencia?',
    a: 'Las agencias aportan estrategia integral pero suelen ser más lentas y costosas. Anza te da velocidad, roster amplio y control directo con automatización que una agencia tradicional no entrega en tiempo real.',
  },
];

export default function FAQSection() {
  return (
    <section
      className="relative overflow-hidden bg-spark"
      aria-labelledby="faq-heading"
    >
      <div
        id="faqs"
        className="scroll-mt-14 md:scroll-mt-16 max-w-[1440px] mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-16 md:pb-24"
      >
        <div className="h-px bg-ink/15 mt-4 md:mt-6 mb-10 md:mb-14" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start"
        >
          {/* Left column — oversized FAQ title */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="md:sticky md:top-24">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/55 block mb-4">
                / Preguntas frecuentes
              </span>
              <div className="w-12 h-[2px] bg-iris mb-6 md:mb-8 shadow-[0_0_10px_rgba(107,47,250,0.55)] origin-left" />
              <h2
                id="faq-heading"
                className="font-display font-black tracking-tighter text-ink leading-[0.85] text-7xl sm:text-8xl md:text-[120px] lg:text-[160px]"
              >
                FAQ
              </h2>
            </div>
          </div>

          {/* Right column — collapsed questions with circular arrows */}
          <div className="md:col-span-7 lg:col-span-7 md:pt-6 lg:pt-10">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-b-0 px-0"
                >
                  <AccordionTrigger
                    className="group flex items-center justify-start gap-4 py-4 md:py-5 text-left hover:no-underline [&>svg:last-of-type]:hidden"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/[0.08] ring-1 ring-ink/15 transition-colors group-hover:bg-ink/[0.16] group-data-[state=open]:bg-ink/[0.16]">
                      <ChevronDown
                        size={14}
                        className="text-ink transition-transform duration-300 group-data-[state=open]:rotate-180"
                      />
                    </span>
                    <span className="font-display text-base md:text-lg font-semibold text-ink leading-snug">
                      {item.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-display text-sm md:text-base text-ink/75 leading-relaxed pb-2 pl-11 pr-4 md:pr-8">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 md:mt-12 flex flex-col items-start gap-3 pl-11">
              <p className="font-display text-sm md:text-base font-bold text-ink/80 leading-snug">
                ¿Todavía tienes preguntas?
              </p>
              <a
                href="/demo"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-mono text-xs uppercase tracking-widest text-white ring-1 ring-white/10 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,box-shadow] duration-300 ease-out hover:ring-white/15 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.22)] focus:outline-none focus-visible:ring-4 focus-visible:ring-iris/40"
                style={{ backgroundColor: '#6B2FFA' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#5A22E0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#6B2FFA';
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span className="relative">Reserva una Demostración</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <ScrollExploreHint />
    </section>
  );
}
