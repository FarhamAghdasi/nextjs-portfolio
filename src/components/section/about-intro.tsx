'use client';

import React from 'react';
import aboutData from '@/data/about-section.json';
import { AboutContent } from '@/components/types';
import { usePathname } from 'next/navigation';
import { TextSplitter } from '@/components';

export default function AboutIntro() {
  const { sectionClass, header, content } = aboutData as AboutContent;
  const pathname = usePathname();

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className={header.class}>
              <div className={header.bractClass}>
                <span>{header.title}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="text">
              <h3 className={content.class}>
                <TextSplitter
                  key={pathname}
                  text={content.text}
                  animationType="fadeInUp"
                  duration={1}
                  stagger={0.02}
                  delay={0.3}
                  split="char"
                />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}