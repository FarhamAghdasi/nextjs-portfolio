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
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/12">
            <div className={header.class}>
              <div className={header.bractClass}>
                <span>{header.title}</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-9/12 lg:ml-[6.25%]">
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