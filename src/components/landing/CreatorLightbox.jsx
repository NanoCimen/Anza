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
            <div className="md:w-[30%] bg-spark p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
                  Creator Profile
                </span>
                <h3 className="font-display font-black text-3xl md:text-4xl text-ink mt-2 tracking-tight">
                  {creator.name}
                </h3>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-ink/60" />
                    <span className="font-mono text-xs text-ink/80">{creator.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Palette size={14} className="text-ink/60" />
                    <span className="font-mono text-xs text-ink/80">{creator.medium}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-ink/60" />
                    <span className="font-mono text-xs text-ink/80">{creator.availability}</span>
                  </div>
                </div>

                <p className="mt-6 font-display text-sm text-ink/70 leading-relaxed">
                  {creator.bio}
                </p>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="mt-8 bg-ink text-canvas font-mono text-xs uppercase tracking-widest px-6 py-4 text-center hover:bg-ink/80 transition-colors"
              >
                Connect with {creator.name.split(' ')[0]}
              </a>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center bg-canvas/10 hover:bg-canvas/20 transition-colors focus:outline-none focus:ring-4 focus:ring-spark"
            >
              <X size={20} className="text-canvas md:text-ink" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
