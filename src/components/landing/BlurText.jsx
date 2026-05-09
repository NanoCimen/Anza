import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text,
  by = 'word',
  className = '',
  delay = 0.2,
  stepDuration = 0.35,
  direction = 'bottom',
  enableHoverGlow = false,
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const tokens = useMemo(
    () => (by === 'letter' ? Array.from(text) : text.split(' ')),
    [by, text]
  );

  const initialY = direction === 'bottom' ? 50 : -50;

  return (
    <span ref={containerRef} className={className}>
      {tokens.map((token, index) => (
        <motion.span
          key={`${token}-${index}`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: initialY }}
          animate={
            isVisible
              ? {
                  filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                  opacity: [0, 0.5, 1],
                  y: [initialY, -5, 0],
                }
              : { filter: 'blur(10px)', opacity: 0, y: initialY }
          }
          transition={{
            duration: stepDuration * 3,
            times: [0, 0.5, 1],
            delay: index * delay,
            ease: 'easeOut',
          }}
          whileHover={
            enableHoverGlow && token !== ' '
              ? {
                  color: '#E8FF00',
                  textShadow:
                    '0 0 10px rgba(232, 255, 0,0.8), 0 0 18px rgba(232, 255, 0,0.55), 0 0 28px rgba(232, 255, 0,0.35)',
                }
              : undefined
          }
          className="inline-block will-change-transform"
        >
          {token === ' ' ? '\u00A0' : token}
          {by === 'word' && index < tokens.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
