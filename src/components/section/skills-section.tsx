'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillsData from '@/data/skills.json';
import progressSkillsData from '@/data/progressSkills.json';
import { Skill, NumberItem, ExperienceItem } from '../types';

const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
const fallbackImage = '/assets/imgs/fallback.png';

interface ExperienceYear {
  year: string;
  items: ExperienceItem[];
}

interface SkillsData {
  header: {
    subHead: string;
    clients: string;
    title: string;
    viewSkills: string;
  };
  skills: Skill[];
  marquee: string[];
  marquee2: string[];
  resumeHeader: {
    subHead: string;
    author: string;
    title: string;
  };
  experience: ExperienceYear[];
}

interface ProgressSkillsData {
  progressSkills: Skill[];
}

gsap.registerPlugin(ScrollTrigger);

const skillImages: { [key: string]: string } = {
  'HTML/CSS': '/assets/imgs/skills/html.png',
  JavaScript: '/assets/imgs/skills/js.png',
  Bootstrap: '/assets/imgs/skills/bootstrap.png',
  React: '/assets/imgs/skills/s4.png',
  SEO: '/assets/imgs/skills/seo.png',
  Tailwindcss: '/assets/imgs/skills/tailwindcss.png',
  Nextjs: '/assets/imgs/skills/nextjs.png',
  'Node.js (Express, Prisma)': '/assets/imgs/skills/nodejs.png',
  PHP: '/assets/imgs/skills/php.png',
  MySQL: '/assets/imgs/skills/mysql.png',
  Git: '/assets/imgs/skills/git.png',
};

const Skills: React.FC = () => {
  const { header, skills, marquee, marquee2, resumeHeader, experience } = skillsData as SkillsData;
  const { progressSkills } = progressSkillsData as ProgressSkillsData;
  const sectionRef = useRef<HTMLElement>(null);
  const skillItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const resumeColsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [numbers, setNumbers] = useState<NumberItem[]>([
    { count: '57', label: 'HTML Templates', link: 'https://www.rtl-theme.com/author/farhamaghdasi/' },
    { count: '500+', label: 'Hours With ☕' },
    { count: '+2', label: 'Website Created' },
    { count: '629', label: 'Total Sell' },
  ]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetch('https://api.farhamaghdasi.ir/rtl-scraper', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'fa',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch numbers');
        const data = await response.json();
        if (data.success) {
          const updatedNumbers: NumberItem[] = [
            {
              count: `${data.raw_data.products_count}`,
              label: 'HTML Templates',
              link: 'https://www.rtl-theme.com/author/farhamaghdasi/',
            },
            {
              count: '500+',
              label: 'Hours With ☕',
            },
            {
              count: '+2',
              label: 'Website Created',
            },
            {
              count: `${data.raw_data.sales_count}+`,
              label: 'Total Sell',
            },
          ];
          setNumbers(updatedNumbers);
        } else {
          console.error('API error:', data.message);
        }
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Skill items animation
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

      // Number items animation
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

      // Resume columns animation
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

      // Progress bars animation
      progressBarsRef.current.forEach((el, index) => {
        if (el) {
          const level = progressSkills[index]?.level || '0%';
          gsap.fromTo(
            el,
            { width: 0 },
            {
              width: level,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
                markers: false,
              },
              onComplete: () => {
                gsap.to(el, {
                  backgroundPosition: '200% 0',
                  duration: 2,
                  repeat: -1,
                  ease: 'linear',
                });
              },
            }
          );
        }
      });
    }, sectionRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
    };
  }, [progressSkills]);

  if (!header || !skills || !numbers || !marquee || !marquee2 || !resumeHeader || !experience || !progressSkills) {
    return <div>Error In Getting Components</div>;
  }

  return (
    <section className="gray-box section-padding" ref={sectionRef}>
      <div className="skills">
        <div className="container pt-30 section-padding bord-thin-top pb-0">
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
            <div className="row mt-30 mb-30">
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
                      <Image src={arrowTopRight} alt="Arrow" width={20} height={20} unoptimized />
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
                          unoptimized
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
          <section className="progress-sec pt-50 pb-50">
            <div className="container">
              <div className="row">
                {progressSkills.map((skill: Skill, index: number) => (
                  <div key={index} className="col-lg-6 col-md-6 col-sm-12 mb-30">
                    <div className="progress-item">
                      <div className="d-flex justify-content-between mb-10">
                        <h6 className="progress-label">{skill.name}</h6>
                        <span className="progress-value">{skill.level}</span>
                      </div>
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar"
                          ref={(el) => {
                            progressBarsRef.current[index] = el;
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="marquee section-padding pt-0">
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
        <div className="marquee skills-padding pb-0">
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