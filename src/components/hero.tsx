'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import content from '@/data/hero.json';

// ParticleCanvas Component
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile view
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle settings
    const particleCount = isMobile ? 20 : 100; // Reduce particles on mobile
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
};

const Hero = () => {
  const [startTyping, setStartTyping] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
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
      const rect = headerEl!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * maxRotation * -1;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      if (animation.current) animation.current.kill();

      animation.current = gsap.to(titleEl, {
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 800,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      });
    }

    function onMouseLeave() {
      if (animation.current) animation.current.kill();
      animation.current = gsap.to(titleEl, {
        duration: 1,
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
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <ParticleCanvas />
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