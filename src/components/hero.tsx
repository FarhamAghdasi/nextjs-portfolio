'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import content from '@/data/hero.json';
import { ParticleCanvas } from '@/components';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [startTyping, setStartTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (!children) return;
      gsap.fromTo(children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const heroEl = heroRef.current;
    const titleEl = titleRef.current;
    if (!heroEl || !titleEl) return;

    const maxRotation = 12;
    let animation: gsap.core.Tween | null = null;

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxRotation * -1;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      if (animation) animation.kill();
      animation = gsap.to(titleEl, {
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 800,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      });
    };

    const onMouseLeave = () => {
      if (animation) animation.kill();
      animation = gsap.to(titleEl, {
        duration: 1.2,
        ease: 'power2.out',
        rotateX: 0,
        rotateY: 0,
      });
    };

    heroEl.addEventListener('mousemove', onMouseMove);
    heroEl.addEventListener('mouseleave', onMouseLeave);

    return () => {
      heroEl.removeEventListener('mousemove', onMouseMove);
      heroEl.removeEventListener('mouseleave', onMouseLeave);
      if (animation) animation.kill();
    };
  }, [isMobile]);

  return (
    <div ref={heroRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <style>{`
          .stroke {
            position: absolute;
            top: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            -webkit-text-stroke: 1px rgba(255,255,255,.4);
            color: transparent;
          }
        `}</style>
        <ParticleCanvas particleCount={isMobile ? 25 : 60} speed={isMobile ? 0.4 : 1} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-4 pt-32 pb-24 text-center md:pt-40 md:pb-32 lg:pt-48 lg:pb-36">
        <h1
          ref={titleRef}
          className="relative text-[10vw] font-semibold uppercase leading-[0.95] tracking-tight md:text-[8.5vw] lg:text-[7.5vw]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="stroke whitespace-pre">FARHAM{'\n'}AGHDASI</span>
          <span className="relative text-white" style={{ whiteSpace: 'pre' }}>
            FARHAM{'\n'}AGHDASI
          </span>
        </h1>

        <h2 className="mt-5 text-[3.2vw] font-light leading-[1.5] text-white md:text-[2.4vw]">
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

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
          I&apos;m a full-stack developer passionate about creating fast, secure, and scalable web applications.
          I turn ideas into impactful digital experiences using modern technologies.
        </p>

        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-[0_0_35px_-6px_rgba(255,255,255,0.7)] transition-all duration-300 hover:bg-gray-200 hover:shadow-[0_0_45px_-6px_rgba(255,255,255,0.9)]"
          >
            <span>See My Work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Download CV</span>
          </Link>
        </div>

        <div className="mx-auto mt-8 flex items-center justify-center gap-3">
          {content.socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.icon.replace('fa-brands fa-', '')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-white/35 hover:text-white hover:shadow-[0_0_20px_-6px_rgba(255,255,255,0.4)]"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
