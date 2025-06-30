'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import content from '@/data/hero.json';
import { ParticleCanvas } from '@/components';

const Hero = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const lastMouseMove = useRef<number>(Date.now());

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Start typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mouse movement animation for desktop only
  useEffect(() => {
    if (isMobile) return; // Skip animation on mobile

    const headerEl = headerRef.current;
    const titleEl = titleRef.current;
    if (!headerEl || !titleEl) return;

    const maxRotation = 15;
    const normalDuration = 0.6;
    const slowDuration = 2; // Slower duration after inactivity
    let inactivityTimeout: NodeJS.Timeout;

    function onMouseMove(e: MouseEvent) {
      lastMouseMove.current = Date.now();
      const rect = headerEl!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxRotation * -1;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      if (animation.current) animation.current.kill();

      animation.current = gsap.to(titleEl, {
        duration: normalDuration,
        ease: 'power2.out',
        transformPerspective: 800,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      });

      // Reset inactivity timeout
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        if (Date.now() - lastMouseMove.current >= 1000) {
          if (animation.current) animation.current.kill();
          animation.current = gsap.to(titleEl, {
            duration: slowDuration,
            ease: 'power2.out',
            rotateX: 0,
            rotateY: 0,
          });
        }
      }, 1000);
    }

    function onMouseLeave() {
      if (animation.current) animation.current.kill();
      animation.current = gsap.to(titleEl, {
        duration: slowDuration,
        ease: 'power2.out',
        rotateX: 0,
        rotateY: 0,
      });
    }

    headerEl.addEventListener('mousemove', onMouseMove);
    headerEl.addEventListener('mouseleave', onMouseLeave);

    return () => {
      headerEl.removeEventListener('mousemove', onMouseMove);
      headerEl.removeEventListener('mouseleave', onMouseLeave);
      clearTimeout(inactivityTimeout);
    };
  }, [isMobile]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {!isMobile && <ParticleCanvas />}
      <header ref={headerRef} className="header-personal" style={{ position: 'relative', zIndex: 1 }}>
        <div className="container ontop">
          <div className="caption text-center">
            <h1 ref={titleRef} style={{ transformStyle: 'preserve-3d' }}>
              {content.nameLine1} <br /> {content.nameLine2}
            </h1>
          </div>
          <div className="row justify-content-center text">
            <div className="col-lg-7 col-md-10">
              <div className="text-center">
                <h2>
                  {startTyping && (
                    <Typewriter
                      words={content.typewriterRoles}
                      loop
                      cursor
                      cursorStyle="|"
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1500}
                    />
                  )}
                </h2>
                <div className="social-icons new">
                  {content.socials.map((s, i) => (
                    <a
                      key={i}
                      className="fade-up"
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
                <p>
                  {content.description} <br />
                  <Link href="/resume.pdf" target="_blank" className="link">
                    See My Resume
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Hero;