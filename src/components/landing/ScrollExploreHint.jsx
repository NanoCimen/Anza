import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function ScrollExploreHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <ArrowDown size={16} className="text-canvas/40" />
      </motion.div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/40">
        Desliza para explorar
      </span>
    </motion.div>
  );
}
