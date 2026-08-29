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
      <div>
        <div className="container mx-auto px-4 pt-[30px] section-padding bord-thin-top pb-[0px]">
          <div className="sec-head mb-[80px]">
            <div className="flex items-center">
              <div>
                <span className="sub-head">{header.subHead}</span>
              </div>
              <div className="ml-auto">
                <div className="bract">
                  {'{'} <span>{header.clients}</span> {'}'}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-[30px] mb-[30px]">
              <div className="w-full lg:w-7/12 lg:ml-[25%]">
                <div>
                  <h2 className="text-indent">
                    {header.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h2>
                  <Link href="/about" className="butn-under mt-[15px]">
                    {header.viewSkills}{' '}
                    <span className="icon">
                      <Image src={arrowTopRight} alt="Arrow" width={20} height={20} unoptimized />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              {skills.map((skill: Skill, index: number) => (
                <div
                  key={index}
                  className="w-1/2 md:w-1/3 lg:flex-1 skill-item"
                  ref={(el) => {
                    skillItemsRef.current[index] = el;
                  }}
                >
                  <div className={`item group text-center ${index < skills.length - 1 ? 'max-[992px]:mb-[30px]' : ''}`}>
                    <div className="box bg-[#EBEBEB] rounded-[150px] py-[60px] mb-[30px]">
                      <div className="img w-[90px] mx-auto mb-[10px] grayscale transition-all duration-400 group-hover:grayscale-0">
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
          <section className="pt-[0px]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {numbers.map((num: NumberItem, idx: number) => (
                  <div
                    key={idx}
                    className="number-item group"
                    ref={(el) => {
                      numberItemsRef.current[idx] = el;
                    }}
                  >
                    <div className={`item ${idx === numbers.length - 1 ? '' : 'mb-[60px]'}`}>
                      <h2 className="text-[100px] leading-none overflow-hidden border-b border-white/10">
                        <span className="relative -bottom-[25px] transition-all duration-400 group-hover:bottom-0">{num.count}</span>
                      </h2>
                      <p className="text-base mt-[5px]">
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
          <section className="progress-sec pt-[50px] pb-[50px]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {progressSkills.map((skill: Skill, index: number) => (
                  <div key={index} className="mb-[30px]">
                    <div className="progress-item">
                      <div className="flex justify-between mb-[10px]">
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
        <div className="section-padding pt-[0px]">
          <div className="main-marq shadow-off ontop">
            <div className="slide-har st1 flex">
              {Array.from({ length: 2 }).map((_, boxIdx) => (
                <div key={boxIdx} className="box">
                  {marquee.map((item: string, i: number) => (
                    <div key={`${boxIdx}-${i}`} className="item px-[80px]!">
                      <p className="text-[10vw] font-semibold text-black">
                        <span className={i % 2 === 1 ? 'text-transparent! [-webkit-text-stroke:1px_#000]' : ''}>{item}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="skills-padding pb-[0px]">
          <div className="main-marq shadow-off ontop">
            <div className="slide-har st2 flex">
              {Array.from({ length: 2 }).map((_, boxIdx) => (
                <div key={boxIdx} className="box">
                  {marquee2.map((item: string, i: number) => (
                    <div key={`${boxIdx}-${i}`} className="item px-[80px]!">
                      <p className="text-[10vw] font-semibold text-black">
                        <span className={i % 2 === 1 ? 'text-transparent! [-webkit-text-stroke:1px_#000]' : ''}>{item}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto px-4 pt-[30px] bord-thin-top">
            <div className="sec-head mb-[80px]">
              <div className="flex items-center">
                <div>
                  <span className="sub-head">{resumeHeader.subHead}</span>
                </div>
                <div className="ml-auto">
                  <div className="bract">
                    {'{'} <span>{resumeHeader.author}</span> {'}'}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-[30px]">
                <div className="w-full text-center">
                  <h2 className="text-[60px] max-md:text-[40px]!">{resumeHeader.title}</h2>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {experience.map((yearExp: ExperienceYear, idx: number) => (
                <div
                  key={idx}
                  className="resume-col"
                  ref={(el) => {
                    resumeColsRef.current[idx] = el;
                  }}
                >
                  <div className="clumn">
                    <span className="date text-sm opacity-80 mb-[10px]">{yearExp.year}</span>
                    {yearExp.items.map((item: ExperienceItem, i: number) => (
                      <div key={i} className={`item ${i < yearExp.items.length - 1 ? 'mb-[40px]' : ''}`}>
                        <h4 className="text-2xl">{item.title}</h4>
                        <p className="text-sm mt-[10px] opacity-80">{item.desc}</p>
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