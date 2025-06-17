'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import gsap from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;

    if (pathname === '/about') {
      gsap.set(containerRef.current, {
        paddingBottom: 120,
      });
    } else {
      gsap.set(containerRef.current, {
        paddingBottom: 0,
      });
    }

    if (
      pathname.startsWith('/templates') ||
      (pathname.startsWith('/portfolio/') && pathname !== '/portfolio')
    ) {
      gsap.set(containerRef.current, { opacity: 1, y: 0, clearProps: 'opacity,y' });
      return;
    }

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    return () => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(containerRef.current, { clearProps: 'all' });
          },
        });
      }
    };
  }, [pathname]);

  return (
    <div ref={containerRef} className="page-transition">
      {children}
    </div>
  );
}
