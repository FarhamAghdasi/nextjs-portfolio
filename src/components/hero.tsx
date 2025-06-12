'use client';

import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import content from '@/data/hero.json';

const Hero = () => {
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="header-personal h-100">
      <div className="container ontop">
        <div className="caption text-center">
          <h1>
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
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                )}
              </h2>
              <div className="social-icons new">
                {content.socials.map((s, i) => (
                  <a key={i} className="fade-up" href={s.href} target="_blank" rel="noopener noreferrer">
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
