'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import skillsData from '@/data/skills.json';
import arrowTopRight from '@/assets/imgs/icons/arrow-top-right.svg';
import htmlIcon from '@/assets/imgs/skills/html.png';
import jsIcon from '@/assets/imgs/skills/js.png';
import bootstrapIcon from '@/assets/imgs/skills/bootstrap.png';
import reactIcon from '@/assets/imgs/skills/s4.png';
import seoIcon from '@/assets/imgs/skills/seo.png';
import tailwindIcon from '@/assets/imgs/skills/tailwindcss.png';
import nextjsIcon from '@/assets/imgs/skills/nextjs.png';
import fallbackImage from '@/assets/imgs/fallback.png';

import { Skill, NumberItem, ExperienceItem } from '../types';

interface ExperienceYear {
  year: string;
  items: ExperienceItem[];
}

gsap.registerPlugin(ScrollTrigger);

const skillImages: { [key: string]: StaticImageData } = {
  'HTML/CSS': htmlIcon,
  JavaScript: jsIcon,
  Bootstrap: bootstrapIcon,
  React: reactIcon,
  SEO: seoIcon,
  Tailwindcss: tailwindIcon,
  Nextjs: nextjsIcon,
};

const Skills: React.FC = () => {
  const { header, skills, numbers, marquee, marquee2, resumeHeader, experience } = skillsData;
  const sectionRef = useRef<HTMLElement>(null);
  const skillItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const resumeColsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      skillItemsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.3,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                markers: false,
              },
            }
          );
        }
      });

      numberItemsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.3,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                markers: false,
              },
            }
          );
        }
      });

      resumeColsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.3,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
                markers: false,
              },
            }
          );
        }
      });
    }, sectionRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
    };
  }, []);

  if (!header || !skills || !numbers || !marquee || !marquee2 || !resumeHeader || !experience) {
    return <div>Error In Getting Components</div>;
  }

  return (
    <section className="gray-box section-padding" ref={sectionRef}>
      <div className="skills">
        <div className="container pt-30 section-padding bord-thin-top">
          <div className="sec-head mb-80">
            <div className="d-flex align-items-center">
              <div>
                <span className="sub-head">{header.subHead}</span>
              </div>
              <div className="ml-auto">
                <div className="bract">
                  {'{'} <span>{header.clients}</span> {'}'}
                </div>
              </div>
            </div>
            <div className="row mt-30">
              <div className="col-lg-7 offset-lg-3">
                <div>
                  <h2 className="text-indent">
                    {header.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h2>
                  <Link href="/about" className="butn-under mt-15">
                    {header.viewSkills}{' '}
                    <span className="icon">
                      <Image src={arrowTopRight} alt="Arrow" width={20} height={20} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {skills.map((skill: Skill, index: number) => (
                <div
                  key={index}
                  className="col-lg col-md-4 col-6 skill-item"
                  ref={(el) => {
                    skillItemsRef.current[index] = el;
                  }}
                >
                  <div className={`item ${index < skills.length - 1 ? 'md-mb30' : ''}`}>
                    <div className="box">
                      <div className="img">
                        <Image
                          src={skillImages[skill.name] || fallbackImage}
                          alt={skill.name}
                          width={64}
                          height={64}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <h2>{skill.level}</h2>
                    </div>
                    <h6>{skill.name}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="numbers-sec pt-0">
            <div className="container">
              <div className="row">
                {numbers.map((num: NumberItem, idx: number) => (
                  <div
                    key={idx}
                    className="col-lg-3 col-md-6 number-item"
                    ref={(el) => {
                      numberItemsRef.current[idx] = el;
                    }}
                  >
                    <div className={`item ${idx === numbers.length - 1 ? '' : 'mb-60'}`}>
                      <h2>
                        <span>{num.count}</span>
                      </h2>
                      <p>
                        {num.link ? (
                          <a href={num.link} rel="noopener noreferrer" target="_blank">
                            {num.label}
                          </a>
                        ) : (
                          num.label
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="marquee section-padding">
          <div className="main-marq shadow-off ontop">
            <div className="slide-har st1 d-flex">
              {Array.from({ length: 2 }).map((_, boxIdx) => (
                <div key={boxIdx} className="box">
                  {marquee.map((item: string, i: number) => (
                    <div key={`${boxIdx}-${i}`} className="item">
                      <p>
                        <span>{item}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="marquee skills-padding">
          <div className="main-marq shadow-off ontop">
            <div className="slide-har st2 d-flex">
              {Array.from({ length: 2 }).map((_, boxIdx) => (
                <div key={boxIdx} className="box">
                  {marquee2.map((item: string, i: number) => (
                    <div key={`${boxIdx}-${i}`} className="item">
                      <p>
                        <span>{item}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="resume">
          <div className="container pt-30 bord-thin-top">
            <div className="sec-head mb-80">
              <div className="d-flex align-items-center">
                <div>
                  <span className="sub-head">{resumeHeader.subHead}</span>
                </div>
                <div className="ml-auto">
                  <div className="bract">
                    {'{'} <span>{resumeHeader.author}</span> {'}'}
                  </div>
                </div>
              </div>
              <div className="row mt-30">
                <div className="col-lg-12 text-center">
                  <h2 className="fz-60">{resumeHeader.title}</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {experience.map((yearExp: ExperienceYear, idx: number) => (
                <div
                  key={idx}
                  className="col-lg-3 col-md-6 resume-col"
                  ref={(el) => {
                    resumeColsRef.current[idx] = el;
                  }}
                >
                  <div className="clumn">
                    <span className="date">{yearExp.year}</span>
                    {yearExp.items.map((item: ExperienceItem, i: number) => (
                      <div key={i} className={`item ${i < yearExp.items.length - 1 ? 'mb-40' : ''}`}>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;