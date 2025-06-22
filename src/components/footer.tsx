'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import footerData from '@/data/footer.json';

const Footer: React.FC = () => {
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = fullHeight - (scrollTop + windowHeight);

      if (distanceFromBottom < 100 && !animationTriggered) {
        setAnimationTriggered(true);
        animateLetters();
      }
    };

    const animateLetters = () => {
      const spans = subtitleRef.current?.querySelectorAll('span');
      if (spans) {
        gsap.fromTo(
          spans,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationTriggered]);

  const handleHover = () => {
    const spans = subtitleRef.current?.querySelectorAll('span');
    if (spans) {
      gsap.fromTo(
        spans,
        { y: 0, opacity: 1 },
        {
          keyframes: [
            { y: -10, opacity: 0.5, duration: 0.15 },
            { y: 0, opacity: 1, duration: 0.3 },
          ],
          stagger: 0.03,
          ease: 'power1.out',
        }
      );
    }
  };

  const subtitleChars = footerData.subtitle.split('').map((char, index) => (
    <span
      key={index}
      style={{
        display: 'inline-block',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform, opacity',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <footer>
      <div className="container">
        <div className="top-content text-center">
          <h2>
            <Link href="/contact/" className="underline">
              {footerData.cta}
            </Link>
          </h2>
          <h6
            className="float_txt js-title"
            ref={subtitleRef}
            onMouseEnter={handleHover}
          >
            {subtitleChars}
          </h6>
        </div>

        <div className="main-content">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="text">
                <p
                  className="js-splittext-lines"
                  dangerouslySetInnerHTML={{ __html: footerData.description }}
                />
              </div>
            </div>

            <div className="col-lg-7">
              <a
                href={`tel:${footerData.phoneNumber.replace(/\s+/g, '')}`}
                className="contact-number fz-60"
              >
                {footerData.phoneNumber}
              </a>

              <ul className="fz-18 mt-30 rest">
                <li className="mb-15">
                  <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
                </li>
              </ul>

              <div className="social-icons">
                {footerData.socials.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
