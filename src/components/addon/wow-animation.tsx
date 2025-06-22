'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationProps {
  children: React.ReactNode;
  animationType?: 'fadeInUp' | 'fadeIn' | 'zoomIn' | 'slideLeft' | 'slideRight';
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animationType = 'fadeInUp',
  duration = 1,
  delay = 0,
  ease = 'power3.out',
  start = 'top 80%',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) {
      const fromProps: gsap.TweenVars = { opacity: 0 };
      const toProps: gsap.TweenVars = { opacity: 1, duration, ease, delay };

      switch (animationType) {
        case 'fadeInUp':
          fromProps.y = 50;
          toProps.y = 0;
          break;
        case 'fadeIn':
          break;
        case 'zoomIn':
          fromProps.scale = 0.8;
          toProps.scale = 1;
          break;
        case 'slideLeft':
          fromProps.x = 50;
          toProps.x = 0;
          break;
        case 'slideRight':
          fromProps.x = -50;
          toProps.x = 0;
          break;
        default:
          fromProps.y = 50;
          toProps.y = 0;
      }

      const animation = gsap.fromTo(
        ref.current,
        fromProps,
        {
          ...toProps,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      );

      ScrollTrigger.refresh();

      return () => {
        animation.kill();
      };
    }
  }, [animationType, duration, delay, ease, start, pathname]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
