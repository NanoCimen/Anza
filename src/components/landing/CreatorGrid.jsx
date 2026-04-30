import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  LayoutGrid,
  Shirt,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import CreatorLightbox from './CreatorLightbox';
import ScrollExploreHint from './ScrollExploreHint';

const TABS = [
  'Todos',
  'Moda & Ropa',
  'Comida & Restaurantes',
  'Fitness & Deporte',
  'Belleza & Cuidado Personal',
  'Negocios & Marcas',
];

const GRID_SPANS = [
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

const withSpans = creators =>
  creators.map((creator, i) => ({
    ...creator,
    span: GRID_SPANS[i % GRID_SPANS.length],
  }));

const INDUSTRY_CREATORS = {
  'Moda & Ropa': withSpans([
    {
      id: 'fashion-1',
      name: 'Sofía Méndez',
      location: 'Santo Domingo, DO',
      medium: 'Moda Editorial',
      availability: 'Disponible esta semana',
      bio: 'Creadora de estilo urbano-editorial enfocada en campañas de ropa y lanzamientos de temporada.',
      image: '/images/creadores.ong.png',
    },
    {
      id: 'fashion-2',
      name: 'Camila Duarte',
      location: 'Santiago, DO',
      medium: 'Streetwear',
      availability: 'Disponible para colaboraciones',
      bio: 'Integra street style y narrativa visual para marcas de ropa en social media.',
      image: 'https://picsum.photos/seed/moda-editorial-2/1200/1600',
    },
    {
      id: 'fashion-3',
      name: 'Renata Gil',
      location: 'Punta Cana, DO',
      medium: 'Fashion Content',
      availability: 'Nuevos briefs abiertos',
      bio: 'Especialista en looks de temporada, styling y contenido short-form para moda.',
      image: 'https://picsum.photos/seed/moda-editorial-3/1200/1600',
    },
    {
      id: 'fashion-4',
      name: 'Valeria Santos',
      location: 'La Romana, DO',
      medium: 'Lookbook UGC',
      availability: 'Disponible por proyecto',
      bio: 'Produce lookbooks naturales para ecommerce y redes de marcas de ropa.',
      image: 'https://picsum.photos/seed/moda-editorial-4/1200/1600',
    },
    {
      id: 'fashion-5',
      name: 'María Piña',
      location: 'Santo Domingo, DO',
      medium: 'Moda Lifestyle',
      availability: 'Disponible',
      bio: 'Combina tomas de lifestyle y close-ups de producto para impulsar conversiones.',
      image: 'https://picsum.photos/seed/moda-editorial-5/1200/1600',
    },
    {
      id: 'fashion-6',
      name: 'Paula Herrera',
      location: 'Santiago, DO',
      medium: 'Editorial Vertical',
      availability: 'Agenda abierta',
      bio: 'Construye piezas verticales con estética editorial para campañas always-on.',
      image: 'https://picsum.photos/seed/moda-editorial-6/1200/1600',
    },
  ]),
  'Comida & Restaurantes': withSpans([
    {
      id: 'food-1',
      name: 'Chef Lía Rojas',
      location: 'Santo Domingo, DO',
      medium: 'Food Styling',
      availability: 'Disponible',
      bio: 'Crea contenido de platos y experiencias de mesa para restaurantes locales.',
      image: 'https://picsum.photos/seed/food-dr-1/1200/1600',
    },
    {
      id: 'food-2',
      name: 'Andrés Tavárez',
      location: 'Santiago, DO',
      medium: 'Contenido Gastronómico',
      availability: 'Disponible esta quincena',
      bio: 'Especialista en reel corto para menús, promociones y lanzamientos culinarios.',
      image: 'https://picsum.photos/seed/food-dr-2/1200/1600',
    },
    {
      id: 'food-3',
      name: 'Mariana de León',
      location: 'Punta Cana, DO',
      medium: 'Restaurantes',
      availability: 'Nuevos proyectos',
      bio: 'Documenta experiencias de restaurante, servicio y ambientación para marcas food.',
      image: 'https://picsum.photos/seed/food-dr-3/1200/1600',
    },
    {
      id: 'food-4',
      name: 'César Encarnación',
      location: 'La Vega, DO',
      medium: 'Plating Visual',
      availability: 'Disponible',
      bio: 'Tomas detalladas de emplatado y cocina en acción para contenido premium.',
      image: 'https://picsum.photos/seed/food-dr-4/1200/1600',
    },
    {
      id: 'food-5',
      name: 'Tania Rodríguez',
      location: 'Santo Domingo, DO',
      medium: 'UGC de Comida',
      availability: 'Disponible por brief',
      bio: 'Produce piezas UGC para delivery, promos y temporadas de restaurantes.',
      image: 'https://picsum.photos/seed/food-dr-5/1200/1600',
    },
    {
      id: 'food-6',
      name: 'Juan Pichardo',
      location: 'Puerto Plata, DO',
      medium: 'Food Lifestyle',
      availability: 'Agenda abierta',
      bio: 'Conecta platos, ambiente y cultura local en contenido de alto alcance.',
      image: 'https://picsum.photos/seed/food-dr-6/1200/1600',
    },
  ]),
  'Fitness & Deporte': withSpans([
    {
      id: 'fitness-1',
      name: 'Daniel Acosta',
      location: 'Santo Domingo, DO',
      medium: 'Entrenamiento Funcional',
      availability: 'Disponible',
      bio: 'Contenido dinámico de rutinas y técnicas para gimnasios y marcas deportivas.',
      image: 'https://picsum.photos/seed/fitness-1/1200/1600',
    },
    {
      id: 'fitness-2',
      name: 'Natalia Pérez',
      location: 'Santiago, DO',
      medium: 'Outdoor Fitness',
      availability: 'Nuevas campañas',
      bio: 'Piezas en exteriores con enfoque en rendimiento, movilidad y bienestar.',
      image: 'https://picsum.photos/seed/fitness-2/1200/1600',
    },
    {
      id: 'fitness-3',
      name: 'Evan Rosario',
      location: 'La Romana, DO',
      medium: 'Contenido Deportivo',
      availability: 'Disponible por proyecto',
      bio: 'Combina deportes de alto impacto con storytelling para redes de marca.',
      image: 'https://picsum.photos/seed/fitness-3/1200/1600',
    },
    {
      id: 'fitness-4',
      name: 'Karla Núñez',
      location: 'Santo Domingo, DO',
      medium: 'Gym UGC',
      availability: 'Disponible',
      bio: 'Especializada en contenido de gym lifestyle con estética limpia y moderna.',
      image: 'https://picsum.photos/seed/fitness-4/1200/1600',
    },
    {
      id: 'fitness-5',
      name: 'Luis Matos',
      location: 'San Cristóbal, DO',
      medium: 'Rendimiento Deportivo',
      availability: 'Agenda abierta',
      bio: 'Produce piezas sobre técnica, disciplina y hábitos para marcas activas.',
      image: 'https://picsum.photos/seed/fitness-5/1200/1600',
    },
    {
      id: 'fitness-6',
      name: 'Arianna Gómez',
      location: 'Punta Cana, DO',
      medium: 'Wellness & Movement',
      availability: 'Disponible',
      bio: 'Creadora para campañas de bienestar, recuperación y deporte cotidiano.',
      image: 'https://picsum.photos/seed/fitness-6/1200/1600',
    },
  ]),
  'Belleza & Cuidado Personal': withSpans([
    {
      id: 'beauty-1',
      name: 'Laura Ceballos',
      location: 'Santo Domingo, DO',
      medium: 'Skincare',
      availability: 'Disponible',
      bio: 'Rutinas de cuidado personal y close-ups de producto para marcas de belleza.',
      image: 'https://picsum.photos/seed/beauty-1/1200/1600',
    },
    {
      id: 'beauty-2',
      name: 'Mía Castillo',
      location: 'Santiago, DO',
      medium: 'Maquillaje',
      availability: 'Disponible esta semana',
      bio: 'Tutoriales y contenido de maquillaje orientado a conversión en social.',
      image: 'https://picsum.photos/seed/beauty-2/1200/1600',
    },
    {
      id: 'beauty-3',
      name: 'Ariana Félix',
      location: 'La Vega, DO',
      medium: 'Beauty UGC',
      availability: 'Nuevas campañas',
      bio: 'Piezas UGC de belleza con enfoque auténtico y demostración de resultados.',
      image: 'https://picsum.photos/seed/beauty-3/1200/1600',
    },
    {
      id: 'beauty-4',
      name: 'Pamela Tineo',
      location: 'Santo Domingo, DO',
      medium: 'Cuidado Personal',
      availability: 'Disponible',
      bio: 'Contenido estético para marcas de haircare, bodycare y self-care.',
      image: 'https://picsum.photos/seed/beauty-4/1200/1600',
    },
    {
      id: 'beauty-5',
      name: 'Gabriela Soto',
      location: 'Puerto Plata, DO',
      medium: 'Skincare Routine',
      availability: 'Disponible por brief',
      bio: 'Creadora enfocada en educación de producto y recomendaciones de uso.',
      image: 'https://picsum.photos/seed/beauty-5/1200/1600',
    },
    {
      id: 'beauty-6',
      name: 'Nina Almonte',
      location: 'Santiago, DO',
      medium: 'Beauty Lifestyle',
      availability: 'Agenda abierta',
      bio: 'Combina lifestyle y tutoriales para marcas de belleza y cuidado personal.',
      image: 'https://picsum.photos/seed/beauty-6/1200/1600',
    },
  ]),
  'Negocios & Marcas': withSpans([
    {
      id: 'business-1',
      name: 'José Núñez',
      location: 'Santo Domingo, DO',
      medium: 'Brand Lifestyle',
      availability: 'Disponible',
      bio: 'Crea contenido profesional para productos, equipos y marcas de negocio.',
      image: 'https://picsum.photos/seed/business-1/1200/1600',
    },
    {
      id: 'business-2',
      name: 'Patricia Mejía',
      location: 'Santiago, DO',
      medium: 'Storefront Content',
      availability: 'Disponible esta semana',
      bio: 'Visuales para tiendas físicas, experiencias de compra y branding local.',
      image: 'https://picsum.photos/seed/business-2/1200/1600',
    },
    {
      id: 'business-3',
      name: 'Miguel Lara',
      location: 'Santo Domingo, DO',
      medium: 'Producto & Marca',
      availability: 'Nuevas colaboraciones',
      bio: 'Fotografía y video orientados a campañas de producto y posicionamiento.',
      image: 'https://picsum.photos/seed/business-3/1200/1600',
    },
    {
      id: 'business-4',
      name: 'Elisa Romero',
      location: 'Punta Cana, DO',
      medium: 'Corporate UGC',
      availability: 'Disponible por proyecto',
      bio: 'Contenido para marcas B2C/B2B con enfoque en confianza y claridad visual.',
      image: 'https://picsum.photos/seed/business-4/1200/1600',
    },
    {
      id: 'business-5',
      name: 'Raúl Guerrero',
      location: 'La Romana, DO',
      medium: 'Retail Content',
      availability: 'Agenda abierta',
      bio: 'Muestra vitrinas, productos y experiencia de compra para marcas retail.',
      image: 'https://picsum.photos/seed/business-5/1200/1600',
    },
    {
      id: 'business-6',
      name: 'Fernanda Peña',
      location: 'Santo Domingo, DO',
      medium: 'Marca Profesional',
      availability: 'Disponible',
      bio: 'Construye activos visuales para lanzamientos, ecommerce y campañas always-on.',
      image: 'https://picsum.photos/seed/business-6/1200/1600',
    },
  ]),
};

const ALL_CREATORS = withSpans([
  INDUSTRY_CREATORS['Moda & Ropa'][0],
  INDUSTRY_CREATORS['Comida & Restaurantes'][1],
  INDUSTRY_CREATORS['Fitness & Deporte'][2],
  INDUSTRY_CREATORS['Belleza & Cuidado Personal'][3],
  INDUSTRY_CREATORS['Negocios & Marcas'][4],
  INDUSTRY_CREATORS['Moda & Ropa'][5],
]);

const TAB_ICONS = {
  Todos: LayoutGrid,
  'Moda & Ropa': Shirt,
  'Comida & Restaurantes': UtensilsCrossed,
  'Fitness & Deporte': Dumbbell,
  'Belleza & Cuidado Personal': Sparkles,
  'Negocios & Marcas': BriefcaseBusiness,
};

export default function CreatorGrid() {
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeTab = TABS[activeIndex];
  const prevTab = TABS[(activeIndex - 1 + TABS.length) % TABS.length];
  const nextTab = TABS[(activeIndex + 1) % TABS.length];
  const ActiveIcon = TAB_ICONS[activeTab] || LayoutGrid;
  const PrevIcon = TAB_ICONS[prevTab] || LayoutGrid;
  const NextIcon = TAB_ICONS[nextTab] || LayoutGrid;
  const visibleCreators = useMemo(() => {
    if (activeTab === 'Todos') return ALL_CREATORS;
    return INDUSTRY_CREATORS[activeTab] || [];
  }, [activeTab]);

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + TABS.length) % TABS.length);
    setSelected(null);
  };

  const goNext = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % TABS.length);
    setSelected(null);
  };

  return (
    <section id="creators" className="bg-canvas relative scroll-mt-24 md:scroll-mt-28 pt-14 md:pt-18 pb-14 md:pb-20">
      {/* Section label */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="h-px bg-ink/10 mt-4 md:mt-6 mb-8 md:mb-14" />
        <div className="flex items-baseline justify-between mb-10 md:mb-14">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40 block mb-3">
              / Los Creadores
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-ink">
              Descubre Talentos
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-ink/30">
            Haz clic en las imágenes para ver más información
          </span>
        </div>

        {/* Centered slideshow selector */}
        <div className="mb-8 md:mb-10 flex items-center justify-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/55 transition hover:text-ink"
            aria-label={`Ver ${prevTab}`}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <PrevIcon className="h-3.5 w-3.5" />
            {prevTab}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-canvas cursor-default"
            aria-current="true"
          >
            <ActiveIcon className="h-3.5 w-3.5" />
            {activeTab}
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/55 transition hover:text-ink"
            aria-label={`Ver ${nextTab}`}
          >
            {nextTab}
            <NextIcon className="h-3.5 w-3.5" />
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: direction * 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -56 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {visibleCreators.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ink/10">
                {visibleCreators.map((creator, i) => (
                  <motion.button
                    key={`${activeTab}-${creator.id}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    onClick={() => setSelected(creator)}
                    className={`${creator.span} relative group aspect-square overflow-hidden bg-canvas focus:outline-none focus:ring-4 focus:ring-spark focus:ring-inset cursor-pointer text-left`}
                  >
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-all duration-500 flex flex-col justify-end p-4 md:p-6">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-spark">
                          {creator.medium}
                        </span>
                        <h3 className="font-display font-bold text-lg md:text-2xl text-canvas mt-1">
                          {creator.name}
                        </h3>
                        <span className="font-mono text-[10px] text-canvas/60 mt-1 block">
                          {creator.location}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="min-h-[280px] md:min-h-[360px] flex items-center justify-center">
                <p className="font-display text-2xl md:text-3xl tracking-tight text-ink/45">
                  Próximamente
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <CreatorLightbox creator={selected} onClose={() => setSelected(null)} />
      <ScrollExploreHint />
    </section>
  );
}
