import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Palette, CheckCircle } from 'lucide-react';

export default function CreatorLightbox({ creator, onClose }) {
  if (!creator) return null;

  return (
    <AnimatePresence>
      {creator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Image — 70% */}
            <div className="md:w-[70%] bg-ink">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-full h-[40vh] md:h-[80vh] object-cover"
              />
            </div>

            {/* Info Panel — 30% */}
            <div className="md:w-[30%] bg-iris p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas/50">
                  Perfil de creador
                </span>
                <h3 className="font-display font-black text-3xl md:text-4xl text-canvas mt-2 tracking-tight">
                  {creator.name}
                </h3>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-canvas/60" />
                    <span className="font-display text-xs text-canvas/80">{creator.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Palette size={14} className="text-canvas/60" />
                    <span className="font-display text-xs text-canvas/80">{creator.medium}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-canvas/60" />
                    <span className="font-display text-xs text-canvas/80">{creator.availability}</span>
                  </div>
                </div>

                <p className="mt-6 font-display text-sm text-canvas/70 leading-relaxed">
                  {creator.bio}
                </p>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] text-canvas transition-colors hover:bg-canvas/80"
              >
                Conectar con {creator.name.split(' ')[0]}
              </a>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 flex h-10 w-10 items-center justify-center rounded-full bg-ink/10 hover:bg-canvas/20 transition-colors focus:outline-none focus:ring-4 focus:ring-spark"
            >
              <X size={20} className="text-canvas md:text-canvas" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
