import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Footer from '../components/landing/Footer';

const COMPANY = 'Anva LLC';
const CONTACT_EMAIL = 'hola@anza.com'; // TODO: confirm the real contact address
const LAST_UPDATED = '22 de junio de 2026';

const CONTENT = {
  terminos: {
    title: 'Términos del Servicio',
    sections: [
      {
        h: '1. Aceptación',
        p: `Al acceder a este sitio y registrarte en nuestra lista de espera, aceptas estos Términos del Servicio. Si no estás de acuerdo, por favor no utilices el sitio.`,
      },
      {
        h: '2. El servicio',
        p: `Anza es una plataforma que conecta marcas y creadores de contenido (UGC) para gestionar campañas, entregas y pagos. Actualmente operamos en fase de acceso anticipado mediante una lista de espera. El acceso a la plataforma no está garantizado y puede otorgarse de forma gradual.`,
      },
      {
        h: '3. Registro y datos',
        p: `Te comprometes a proporcionar información veraz y actualizada (correo electrónico y, al menos, un perfil de Instagram o TikTok). Eres responsable de la exactitud de los datos que envías.`,
      },
      {
        h: '4. Comunicaciones',
        p: `Si activas la opción de novedades, podremos enviarte correos sobre oportunidades, ofertas y el lanzamiento de la plataforma. Puedes darte de baja en cualquier momento desde el enlace incluido en cada correo.`,
      },
      {
        h: '5. Propiedad intelectual',
        p: `Todo el contenido del sitio (marca, textos, diseño y logotipos) pertenece a ${COMPANY} y no puede reproducirse sin autorización.`,
      },
      {
        h: '6. Limitación de responsabilidad',
        p: `El sitio se ofrece "tal cual". No garantizamos disponibilidad continua durante la fase de acceso anticipado ni resultados específicos derivados del uso de la plataforma.`,
      },
      {
        h: '7. Cambios',
        p: `Podemos actualizar estos términos. Publicaremos la versión vigente en esta página con su fecha de actualización.`,
      },
      {
        h: '8. Contacto',
        p: `Para cualquier consulta, escríbenos a ${CONTACT_EMAIL}.`,
      },
    ],
  },
  privacidad: {
    title: 'Política de Privacidad',
    sections: [
      {
        h: '1. Responsable',
        p: `${COMPANY} (Santo Domingo, República Dominicana) es responsable del tratamiento de los datos personales recogidos en este sitio.`,
      },
      {
        h: '2. Datos que recopilamos',
        p: `Recopilamos los datos que envías en el formulario de lista de espera: nombre (opcional), correo electrónico, perfiles de redes sociales (Instagram, TikTok, Facebook y WhatsApp) y tu preferencia de recibir novedades. También recopilamos datos técnicos básicos de navegación mediante cookies y herramientas de analítica.`,
      },
      {
        h: '3. Finalidad',
        p: `Usamos tus datos para gestionar tu inscripción en la lista de espera, comunicarte el lanzamiento, enviarte novedades (si lo autorizas) y mejorar el sitio. No vendemos tus datos a terceros.`,
      },
      {
        h: '4. Base legal',
        p: `Tratamos tus datos sobre la base de tu consentimiento, que puedes retirar en cualquier momento.`,
      },
      {
        h: '5. Conservación',
        p: `Conservamos tus datos mientras gestionamos la lista de espera y, si lo autorizaste, hasta que te des de baja de nuestras comunicaciones.`,
      },
      {
        h: '6. Encargados del tratamiento',
        p: `Utilizamos proveedores externos para el almacenamiento de datos y el envío de correos (por ejemplo, Supabase y Resend), que tratan los datos por cuenta nuestra bajo acuerdos de confidencialidad.`,
      },
      {
        h: '7. Tus derechos',
        p: `Puedes solicitar acceso, rectificación o eliminación de tus datos, así como retirar tu consentimiento, escribiendo a ${CONTACT_EMAIL}.`,
      },
      {
        h: '8. Cookies',
        p: `Usamos cookies esenciales para el funcionamiento del sitio y, con tu consentimiento, cookies de analítica. Puedes gestionar tu elección desde el banner de cookies.`,
      },
    ],
  },
};

export default function Legal({ doc = 'terminos' }) {
  const copy = CONTENT[doc] || CONTENT.terminos;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${copy.title} — Anza`;
  }, [copy.title]);

  return (
    <div className="flex min-h-screen flex-col bg-ink font-display text-white">
      <header className="relative z-20 mx-auto w-full max-w-[820px] px-6 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-nav text-xs font-medium uppercase leading-none tracking-[0.02em] text-white/70 transition-colors hover:text-white"
        >
          <ChevronLeft size={16} strokeWidth={2} aria-hidden />
          Volver al inicio
        </Link>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[820px] flex-1 px-6 py-12 md:py-16">
        <h1 className="font-bold [font-family:Grantska,Arial,sans-serif] text-[34px] leading-[36px] tracking-[-0.2px] md:text-[44px] md:leading-[46px]">
          {copy.title}
        </h1>
        <p className="mt-3 font-display text-sm text-white/45">
          Última actualización: {LAST_UPDATED}
        </p>

        <div className="mt-10 space-y-8">
          {copy.sections.map(section => (
            <section key={section.h}>
              <h2 className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-white">
                {section.h}
              </h2>
              <p className="mt-3 font-display text-sm leading-relaxed text-white/65">
                {section.p}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6 font-display text-sm">
          <Link to="/terminos" className="text-white/60 underline transition-colors hover:text-white">
            Términos del Servicio
          </Link>
          <Link to="/privacidad" className="text-white/60 underline transition-colors hover:text-white">
            Política de Privacidad
          </Link>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
