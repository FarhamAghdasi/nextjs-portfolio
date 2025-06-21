'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import content from '@/data/hero.json';

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const depth = 400;
    const perspective = 600;
    const particleCount = 60;
    const maxParticles = 100;
    const particles: any[] = [];

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      radius: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * depth;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.vz = (Math.random() - 0.5) * 0.4;
        this.radius = 2 + Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.z < 0 || this.z > depth) this.vz *= -1;
        if (this.x < -width / 2 || this.x > width / 2) this.vx *= -1;
        if (this.y < -height / 2 || this.y > height / 2) this.vy *= -1;

        if (Math.random() < 0.001 && particles.length < maxParticles) {
          particles.push(new Particle());
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const scale = perspective / (perspective + this.z);
        const x2D = width / 2 + this.x * scale;
        const y2D = height / 2 + this.y * scale;
        const r = this.radius * scale;

        ctx.save();
        ctx.shadowColor = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur = 10 * scale;
        ctx.beginPath();
        ctx.arc(x2D, y2D, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.7 * scale})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const scale1 = perspective / (perspective + p1.z);
        const x1 = width / 2 + p1.x * scale1;
        const y1 = height / 2 + p1.y * scale1;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const scale2 = perspective / (perspective + p2.z);
          const x2 = width / 2 + p2.x * scale2;
          const y2 = height / 2 + p2.y * scale2;

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (120 - dist) / 120;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.update();

        const dx = (mouse.current.x - width / 2) - p.x;
        const dy = (mouse.current.y - height / 2) - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx / dist * 0.05;
          p.vy += dy / dist * 0.05;
        }

        p.draw(ctx);
      }

      drawConnections();
      requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', handleMouse);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: 'transparent',
        pointerEvents: 'none',
      }}
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
        rotateX,
        rotateY,
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
