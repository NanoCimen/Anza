import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * @param {{ tone?: string; align?: string; bottomOffset?: string; hideOnHash?: string }} props
 */
export default function ScrollExploreHint(props) {
  const { tone = 'light', align = 'left', bottomOffset = 'bottom-8', hideOnHash } = props;
  const [isActive, setIsActive] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHashHidden, setIsHashHidden] = useState(false);
  const textClass = tone === 'dark' ? 'text-ink/45' : 'text-canvas/40';
  const positionClass = align === 'center'
    ? 'left-1/2 -translate-x-1/2'
    : 'left-6 md:left-10';

  useEffect(() => {
    if (!hideOnHash) return undefined;

    const syncHashState = () => {
      setIsHashHidden(window.location.hash === hideOnHash);
    };

    syncHashState();
    window.addEventListener('hashchange', syncHashState);
    return () => window.removeEventListener('hashchange', syncHashState);
  }, [hideOnHash]);

  useEffect(() => {
    if (!isActive || hasScrolled) return undefined;

    const handleScrollIntent = () => {
      setHasScrolled(true);
    };

    const armTimer = window.setTimeout(() => {
      window.addEventListener('wheel', handleScrollIntent, { passive: true });
      window.addEventListener('touchmove', handleScrollIntent, { passive: true });
      window.addEventListener('keydown', handleScrollIntent);
    }, 800);

    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener('wheel', handleScrollIntent);
      window.removeEventListener('touchmove', handleScrollIntent);
      window.removeEventListener('keydown', handleScrollIntent);
    };
  }, [hasScrolled, isActive]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled || isHashHidden ? 0 : 1 }}
      onViewportEnter={() => {
        setHasScrolled(false);
        setIsActive(true);
      }}
      onViewportLeave={() => setIsActive(false)}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={`absolute ${bottomOffset} flex items-center gap-3 ${positionClass}`}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <ArrowDown size={16} className={textClass} />
      </motion.div>
      <span className={`font-nav text-sm font-medium uppercase leading-none tracking-[0.02em] ${textClass}`}>
        Desliza para explorar
      </span>
    </motion.div>
  );
}
