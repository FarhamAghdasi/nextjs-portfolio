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
          <div className="w-full text-center">
            <div className="text">
              <h3 className={content.class}>
                <TextSplitter
                  key={pathname}
                  text={content.text}
                  animationType="fadeInUp"
                  duration={0.4}
                  stagger={0.008}
                  delay={0.1}
                  split="char"
                  startEvent="appLoaded"
                />
              </h3>
              <button
                type="button"
                onClick={() => window.open('/resume.pdf', '_blank')}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>See My Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}