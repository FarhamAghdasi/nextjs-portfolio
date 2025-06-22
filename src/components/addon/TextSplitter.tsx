'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextSplitterProps {
  text: string;
  animationType?: 'fadeInUp' | 'fadeInDown' | 'fadeIn';
  duration?: number;
  stagger?: number;
  delay?: number;
  split?: 'char' | 'word';
  className?: string;
}

const TextSplitter: React.FC<TextSplitterProps> = ({
  text,
  animationType = 'fadeInUp',
  duration = 0.5,
  stagger = 0.04,
  delay = 0,
  split = 'char',
  className = '',
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spans = textRef.current?.querySelectorAll('span');
    if (!spans || spans.length === 0) return;

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
    });
  }, [text, animationType, duration, stagger, delay]);

  const parts =
    split === 'word' ? text.split(' ') : text.split('');

  return (
    <div className={className} ref={textRef}>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'opacity, transform',
            whiteSpace: 'pre',
          }}
        >
          {split === 'word' ? part + ' ' : part === ' ' ? '\u00A0' : part}
        </span>
      ))}
    </div>
  );
};

export default TextSplitter;
