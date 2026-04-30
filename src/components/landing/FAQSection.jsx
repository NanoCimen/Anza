import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    q: '¿Cómo empiezo?',
    a: 'Crea tu cuenta, revisa creadores compatibles con tu marca y publica un brief. Los creadores interesados aplican desde la app y tú apruebas el equipo sin salir del panel.',
  },
  {
    q: '¿Anza tiene costo?',
    a: 'Hay planes adaptados al tamaño de tu equipo y volumen de campañas. Puedes empezar con opciones flexibles y escalar cuando lo necesites; los detalles los ves al registrar tu marca.',
  },
  {
    q: '¿Para quién está pensado Anza?',
    a: 'Marcas y equipos de marketing que quieren lanzar contenido con creadores de LATAM sin caos de chats dispersos, pagos manuales ni reporting incoherente.',
  },
  {
    q: '¿Qué creadores hay en Anza?',
    a: 'Perfiles verificados en vídeo, creativos UGC, influencers y especialistas por vertical. Filtras por plataforma, audiencia y disponibilidad antes de invitar a nadie.',
  },
  {
    q: 'UGC vs marketing de influencers — ¿cuál es la diferencia?',
    a: 'El UGC suele ser contenido pensado para tus anuncios o embudos; el influencer marketing prioriza alcance desde las cuentas del creador. En Anza gestionas ambos flujos en el mismo briefing y seguimiento.',
  },
  {
    q: '¿Qué puedo esperar y cómo se mide el éxito?',
    a: 'Acuerdas KPIs en el brief (entregas, tasas de conversión, vistas clave). El dashboard centraliza métricas por campaña para que compares rendimiento sin armar reportes a mano.',
  },
  {
    q: 'Self-serve vs servicio guiado — ¿qué cambia?',
    a: 'Self-serve es para equipos que ya tienen procesos claros y solo necesitan herramientas. El servicio guiado suma acompañamiento estratégico cuando quieres acelerar pilares como selección de creadores o QA creativo.',
  },
  {
    q: '¿Qué tan rápido puedo contratar creadores?',
    a: 'Depende de tu brief y filtros, pero las aplicaciones suelen llegar en horas o días. Alertas y plantillas de brief reducen idas y vueltas para cerrar equipo antes.',
  },
  {
    q: '¿Cómo se gestionan pagos y contratos?',
    a: 'Contratos y alcances quedan registrados en la plataforma; los pagos se pueden automatizar con esquemas por hito o recurrentes para que reduzcas trabajo operativo y errores.',
  },
  {
    q: '¿Cómo sigo el rendimiento de los creadores?',
    a: 'Centralizamos métricas y estados de posteo para que veas qué piezas están vivas, pendientes o necesitan iteración — sin saltar entre hojas y capturas.',
  },
  {
    q: '¿Cómo evito que un creador abandone la campaña?',
    a: 'Notificaciones, recordatorios de entrega y visibilidad del estado del proyecto mantienen el ritmo. Si falta una pieza, ves el bloqueo antes de que impacte la fecha.',
  },
  {
    q: '¿Anza comparado con contratar una agencia?',
    a: 'Las agencias aportan estrategia integral pero suelen ser más lentas y costosas. Anza te da velocidad, roster amplio y control directo con automatización que una agencia tradicional no suele entregar en tiempo real.',
  },
  {
    q: '¿Sirve para mi industria?',
    a: 'Trabajamos marcas de retail, apps, consumo, cultura y más. Si hay contenido en redes involucrado, puedes adaptar briefs y approvals al tono de tu sector.',
  },
  {
    q: 'Mi equipo es pequeño — ¿podemos gestionarlo?',
    a: 'Sí: está pensado para squads reducidos. Roles claros, briefs reutilizables y automatización de pagos liberan horas para que marketing no viva en el inbox.',
  },
  {
    q: '¿Qué incluye la prueba gratuita?',
    a: 'Acceso al flujo principal para explorar briefs, aplicaciones de creadores y el panel con límites según la promoción vigente al registrarte. Te guiamos para sacar valor desde el día uno.',
  },
];

export default function FAQSection() {
  return (
    <section id="faqs" className="relative scroll-mt-20 md:scroll-mt-24 bg-canvas border-t border-ink/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-10 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-8 md:gap-10 w-full"
        >
          <div className="w-full max-w-4xl mx-auto text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-4 md:mb-5">
              07 / FAQs
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-ink leading-[0.95]">
              ¿Tienes preguntas?
              <br />
              Tenemos respuestas
            </h2>
            <p className="mt-5 md:mt-6 mx-auto font-display text-base md:text-lg text-ink/60 leading-relaxed max-w-[520px]">
              Todo lo que necesitas saber sobre cómo Anza encaja en tu operación de contenido.
            </p>
          </div>

          <div className="w-full max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`item-${i}`}
                  className="border-ink/10 px-0"
                >
                  <AccordionTrigger className="py-5 md:py-6 text-left font-display text-base md:text-lg font-bold text-ink hover:no-underline [&[data-state=open]]:font-bold [&>svg]:text-ink/45 [&>svg]:h-5 [&>svg]:w-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="font-display text-base md:text-lg text-ink/60 leading-relaxed pb-2 pr-8">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 md:mt-12 flex flex-col items-center gap-3 text-center">
              <p className="font-display text-sm md:text-base font-bold text-ink/60 leading-snug">
                ¿Todavía tienes preguntas?
              </p>
              <a
                href="/demo"
                className="bg-spark text-ink font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-ink hover:text-canvas transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-spark"
              >
                Reserva una Demostración
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
