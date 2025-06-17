'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Typewriter } from 'react-simple-typewriter';
import content from '@/data/hero.json';

const Hero = () => {
  const [startTyping, setStartTyping] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const animation = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const headerEl = headerRef.current;
    const titleEl = titleRef.current;
    if (!headerEl || !titleEl) return;

    const maxRotation = 15;

    function onMouseMove(e: MouseEvent) {
      const rect = headerEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxRotation * -1;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      if (animation.current) animation.current.kill();

      animation.current = gsap.to(titleEl, {
        duration: 0.3,
        ease: 'power3.out',
        transformPerspective: 600,
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      });
    }

    function onMouseLeave() {
      if (animation.current) animation.current.kill();

      animation.current = gsap.to(titleEl, {
        duration: 0.6,
        ease: 'power3.out',
        rotateX: 0,
        rotateY: 0,
      });
    }

    headerEl.addEventListener('mousemove', onMouseMove);
    headerEl.addEventListener('mouseleave', onMouseLeave);

    return () => {
      headerEl.removeEventListener('mousemove', onMouseMove);
      headerEl.removeEventListener('mouseleave', onMouseLeave);
      if (animation.current) animation.current.kill();
    };
  }, []);

  return (
    <header ref={headerRef} className="header-personal h-100" style={{ perspective: 600 }}>
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
                    loop={true}
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
              <p>{content.description}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
