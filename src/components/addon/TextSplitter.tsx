'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextSplitterProps {
  text: string;
  animationType?: 'fadeInUp' | 'fadeInDown' | 'fadeIn';
  duration?: number;
  stagger?: number;
  delay?: number;
  split?: 'char' | 'word';
  className?: string;
  startEvent?: string;
  scrollTrigger?: boolean;
  triggerStart?: string;
  toggleActions?: string;
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
  scrollTrigger = false,
  triggerStart = 'top 85%',
  toggleActions = 'play none none none',
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (startEvent) {
      const animate = () => {
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
      };

      window.addEventListener(startEvent, animate);
      const fallback = setTimeout(animate, 6000);
      if ((window as Window & { __appLoaded?: boolean }).__appLoaded) {
        animate();
      }
      return () => {
        window.removeEventListener(startEvent, animate);
        clearTimeout(fallback);
      };
    }

    const ctx = gsap.context(() => {
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
        scrollTrigger: scrollTrigger
          ? {
              trigger: textRef.current,
              start: triggerStart,
              toggleActions,
            }
          : undefined,
      });
    }, textRef);

    return () => {
      ctx.revert();
    };
  }, [startEvent, scrollTrigger, animationType, duration, stagger, delay, triggerStart, toggleActions]);

  const parts = split === 'word' ? text.split(' ') : text.split('');

  return (
    <div className={className} ref={textRef}>
      {parts.map((part, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            willChange: 'opacity, transform',
            whiteSpace: part === ' ' || part === '\n' ? 'pre' : 'normal',
          }}
        >
          {split === 'word' ? part + ' ' : part === ' ' ? '\u00A0' : part}
        </span>
      ))}
    </div>
  );
};

export default TextSplitter;
