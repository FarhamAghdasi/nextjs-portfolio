'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextSplitterProps {
  text: string;
  animationType?: 'fadeInUp' | 'fadeInDown' | 'fadeIn';
  duration?: number;
  stagger?: number;
  delay?: number;
  split?: 'char' | 'word';
  className?: string;
  startEvent?: string;
}

const TextSplitter: React.FC<TextSplitterProps> = ({
  text,
  animationType = 'fadeInUp',
  duration = 0.3,
  stagger = 0.02,
  delay = 0.3,
  split = 'char',
  className = '',
  startEvent,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isAnimated = useRef(false);

  const runAnimation = useCallback(() => {
    if (isAnimated.current) return;
    const spans = textRef.current?.querySelectorAll('span');
    if (!spans || spans.length === 0) {
      console.warn('TextSplitter: No spans found for animation');
      return;
    }

    const fromVars: gsap.TweenVars = { opacity: 0 };
    switch (animationType) {
      case 'fadeInUp':
        fromVars.y = 20;
        break;
      case 'fadeInDown':
        fromVars.y = -20;
        break;
      case 'fadeIn':
      default:
        fromVars.y = 0;
        break;
    }

    gsap.set(spans, fromVars);

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: 'power2.out',
      onComplete: () => {
        isAnimated.current = true;
      },
    });
  }, [animationType, duration, stagger, delay]);

  useEffect(() => {
    if (startEvent) {
      const handler = () => runAnimation();
      window.addEventListener(startEvent, handler);
      const fallback = setTimeout(runAnimation, 6000);
      if ((window as Window & { __appLoaded?: boolean }).__appLoaded) {
        runAnimation();
      }
      return () => {
        window.removeEventListener(startEvent, handler);
        clearTimeout(fallback);
      };
    }
    runAnimation();
  }, [startEvent, runAnimation]);

  const parts = split === 'word' ? text.split(' ') : text.split('');

  return (
    <div className={className} ref={textRef}>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'opacity, transform',
            whiteSpace: part === ' ' ? 'pre' : 'normal',
          }}
        >
          {split === 'word' ? part + ' ' : part === ' ' ? '\u00A0' : part}
        </span>
      ))}
    </div>
  );
};

export default TextSplitter;