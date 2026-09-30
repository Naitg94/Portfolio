import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  hoverScramble?: boolean;
}

const GLYPHS = '01#*$%&?<>_~+!{}/[]';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  hoverScramble = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });
  const animatingRef = useRef(false);

  const startScramble = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    let iteration = 0;
    const totalFrames = text.length * 3;
    const intervalTime = 30;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        animatingRef.current = false;
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (isInView) {
      startScramble();
    }
  }, [isInView, startScramble]);

  const handleMouseEnter = () => {
    if (hoverScramble) {
      startScramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none ${className}`}
    >
      {displayText}
    </span>
  );
};
