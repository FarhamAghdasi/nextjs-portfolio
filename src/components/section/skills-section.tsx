'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillsData from '@/data/skills.json';
import progressSkillsData from '@/data/progressSkills.json';
import servicesData from '@/data/service-section.json';
import { Skill, NumberItem, ExperienceItem, ServiceTitle } from '../types';
import { TextSplitter } from '@/components';

const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
const arrowLeft = '/assets/imgs/icons/chevron-left.svg';
const arrowRight = '/assets/imgs/icons/chevron-right.svg';
const fallbackImage = '/assets/imgs/fallback.png';

interface ParsedCount {
  prefix: string;
  value: number;
  suffix: string;
}

const parseCount = (count: string): ParsedCount | null => {
  const match = count.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    value: parseInt(match[2], 10),
    suffix: match[3],
  };
};

const MarqueeStrip = ({
  items,
  wrapperClass,
  slideClass,
}: {
  items: string[];
  wrapperClass: string;
  slideClass: string;
}) => (
  <div className={wrapperClass}>
    <div className="main-marq shadow-off ontop">
      <div className={`slide-har ${slideClass} flex`}>
        {Array.from({ length: 2 }).map((_, boxIdx) => (
          <div key={boxIdx} className="box">
            {items.map((item, i) => (
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
);

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
  'HTML/CSS': '/assets/imgs/skills/html.svg',
  JavaScript: '/assets/imgs/skills/js.svg',
  Bootstrap: '/assets/imgs/skills/bootstrap.svg',
  React: '/assets/imgs/skills/react.svg',
  SEO: '/assets/imgs/skills/seo.png',
  Tailwindcss: '/assets/imgs/skills/tailwindcss.svg',
  Nextjs: '/assets/imgs/skills/nextjs.svg',
  MySQL: '/assets/imgs/skills/mysql.svg',
  Laravel: '/assets/imgs/skills/laravel.svg',
  Photoshop: '/assets/imgs/skills/adobephotoshop.svg',
  Filmora: '/assets/imgs/skills/filmora.svg',
  Premier: '/assets/imgs/skills/adobepremierepro.svg',
  Docker: '/assets/imgs/skills/docker.svg',
  Aplinejs: '/assets/imgs/skills/alpinejs.svg',
  Git: '/assets/imgs/skills/git.svg',
  TypeScript: '/assets/imgs/skills/typescript.svg',
};

const Skills: React.FC = () => {
  const { header, skills, marquee, marquee2, resumeHeader, experience } = skillsData as SkillsData;
  const { progressSkills } = progressSkillsData as ProgressSkillsData;
  const serviceCategories = (servicesData as ServiceTitle[]).map((s) => s.title);
  const tabs = ['All', ...serviceCategories];
  const yearList = [...experience].sort((a, b) => Number(a.year) - Number(b.year));
  const sectionRef = useRef<HTMLElement>(null);
  const skillItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const countTweenRefs = useRef<gsap.core.Tween[]>([]);
  const expContentRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ active: boolean; startX: number; startScroll: number }>({
    active: false,
    startX: 0,
    startScroll: 0,
  });
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [numbers, setNumbers] = useState<NumberItem[]>([
    { count: '57', label: 'HTML Templates', link: 'https://www.rtl-theme.com/author/farhamaghdasi/' },
    { count: '500+', label: 'Hours With ☕' },
    { count: '+2', label: 'Website Created' },
    { count: '629', label: 'Total Sell' },
  ]);

  const [activeTab, setActiveTab] = useState<string>('All');
  const [activeYear, setActiveYear] = useState<string>(yearList[yearList.length - 1]?.year ?? '');

  const handleSkillTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 16;
    const rotateX = (0.5 - py) * 16;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const resetSkillTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  useEffect(() => {
    const CACHE_KEY = 'skills-numbers-cache';

    const fetchNumbers = async () => {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          setNumbers(JSON.parse(cached));
          return;
        }

        const response = await fetch('https://api.farhamaghdasi.ir/rtl-scraper', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'fa',
          },
        });
        if (!response.ok) throw new Error(`Failed to fetch numbers: ${response.status}`);
        const data = await response.json();
        const updatedNumbers: NumberItem[] = [
          {
            count: `${data.products_count}`,
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
            count: `${data.sales_count}+`,
            label: 'Total Sell',
          },
        ];
        setNumbers(updatedNumbers);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(updatedNumbers));
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  useEffect(() => {
    countRefs.current.forEach((el, i) => {
      if (!el) return;
      const parsed = parseCount(numbers[i]?.count ?? '');
      if (!parsed) return;

      countTweenRefs.current[i]?.scrollTrigger?.kill();
      countTweenRefs.current[i]?.kill();

      const proxy = { val: 0 };
      countTweenRefs.current[i] = gsap.to(proxy, {
        val: parsed.value,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${parsed.prefix}${Math.floor(proxy.val)}${parsed.suffix}`;
        },
      });
    });
  }, [numbers]);

  useEffect(() => {
    const visible = skillItemsRef.current.filter(
      (el): el is HTMLDivElement => !!el && !el.classList.contains('hidden')
    );
    if (!visible.length) return;
    gsap.fromTo(
      visible,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05 }
    );
  }, [activeTab]);

  useEffect(() => {
    if (timelineScrollRef.current) timelineScrollRef.current.scrollLeft = 0;
    if (!expContentRef.current) return;
    const items = expContentRef.current.querySelectorAll('.exp-item');
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05 }
    );
  }, [activeYear]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
        <div className="container mx-auto px-4 pt-[30px] bord-thin-top pb-[0px]">
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
                         <TextSplitter
                           text={line}
                           animationType="fadeInUp"
                           duration={0.4}
                           stagger={0.02}
                           delay={0.1}
                           split="char"
                           scrollTrigger
                           triggerStart="top 85%"
                         />
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
            <div className="flex flex-wrap justify-center mt-[30px] mb-[40px]">
              <div className="inline-flex flex-wrap justify-center rounded-full border border-black/30 overflow-hidden">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-[30px] py-[12px] text-[16px] font-semibold transition-all duration-300 border-r border-black/20 last:border-r-0 ${
                      activeTab === tab
                        ? 'bg-black text-white'
                        : 'text-black hover:bg-black/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-[30px]">
              {skills.map((skill: Skill, index: number) => {
                const isHidden = activeTab !== 'All' && skill.category !== activeTab;
                return (
                   <div
                     key={skill.name}
                     className={`skill-item ${isHidden ? 'hidden' : ''}`}
                     ref={(el) => {
                      skillItemsRef.current[index] = el;
                    }}
                  >
                      <div className="item group text-center">
                        <div
                          className="box w-fit bg-[#EBEBEB] rounded-[150px] px-[30px] h-[320px] flex flex-col items-center justify-center mb-[30px] transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover:shadow-2xl"
                          onMouseMove={handleSkillTilt}
                          onMouseLeave={resetSkillTilt}
                        >
                          <div className="img w-[90px] mx-auto mb-[40px] grayscale transition-all duration-400 group-hover:grayscale-0 group-hover:[transform:translateZ(40px)]">
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
                      <h6 className="truncate">{skill.name}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <section className="pt-[0px]">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {numbers.map((num: NumberItem, idx: number) => (
                  <div
                    key={idx}
                    className="number-item group"
                    ref={(el) => {
                      numberItemsRef.current[idx] = el;
                    }}
                  >
                    <div className={`item text-center ${idx === numbers.length - 1 ? '' : 'mb-[60px]'}`}>
                      <h2 className="text-[100px] max-md:text-[56px] leading-none overflow-hidden border-b border-white/10">
                        <span
                          ref={(el) => {
                            countRefs.current[idx] = el;
                          }}
                          className="relative -bottom-[25px] transition-all duration-400 group-hover:bottom-0"
                        >
                          {(() => {
                            const p = parseCount(num.count);
                            return p ? `${p.prefix}0${p.suffix}` : num.count;
                          })()}
                        </span>
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
            <div>
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
        <MarqueeStrip items={marquee} wrapperClass="section-padding pt-[0px]" slideClass="st1" />
        <MarqueeStrip items={marquee2} wrapperClass="skills-padding pb-[0px]" slideClass="st2" />
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
            <div className="mt-[30px]">
              <div className="flex items-center justify-center gap-[28px] mb-[30px]">
                <button
                  type="button"
                  onClick={() => {
                    const idx = yearList.findIndex((e) => e.year === activeYear);
                    if (idx > 0) setActiveYear(yearList[idx - 1].year);
                  }}
                  disabled={yearList.findIndex((e) => e.year === activeYear) <= 0}
                  aria-label="Previous year"
                  className="p-[6px] transition-opacity duration-300 hover:opacity-60 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Image src={arrowLeft} alt="Previous" width={38} height={38} unoptimized />
                </button>
                <span className="text-[64px] font-extrabold leading-none text-center min-w-[150px]">{activeYear}</span>
                <button
                  type="button"
                  onClick={() => {
                    const idx = yearList.findIndex((e) => e.year === activeYear);
                    if (idx < yearList.length - 1) setActiveYear(yearList[idx + 1].year);
                  }}
                  disabled={yearList.findIndex((e) => e.year === activeYear) >= yearList.length - 1}
                  aria-label="Next year"
                  className="p-[6px] transition-opacity duration-300 hover:opacity-60 disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <Image src={arrowRight} alt="Next" width={38} height={38} unoptimized />
                </button>
              </div>
              <div ref={expContentRef} className="-mx-[calc(50vw_-_50%)]">
                <div
                  ref={timelineScrollRef}
                  onPointerDown={(e) => {
                    const el = timelineScrollRef.current;
                    if (!el) return;
                    dragState.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
                    el.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={(e) => {
                    const el = timelineScrollRef.current;
                    if (!el || !dragState.current.active) return;
                    el.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
                  }}
                  onPointerUp={(e) => {
                    dragState.current.active = false;
                    timelineScrollRef.current?.releasePointerCapture(e.pointerId);
                  }}
                  onPointerLeave={() => {
                    dragState.current.active = false;
                  }}
                  className="no-scrollbar flex gap-[32px] overflow-x-auto px-[10px] pb-[40px] pt-[10px] cursor-grab active:cursor-grabbing select-none"
                >
                  {(() => {
                    const yearExp = experience.find((e) => e.year === activeYear);
                    if (!yearExp) return null;
                    return yearExp.items.map((item: ExperienceItem, i: number) => (
                      <div
                        key={i}
                        className="exp-item relative min-w-[340px] md:flex-1 border-t-2 border-black/20 pt-[34px] px-[18px]"
                      >
                        <span className="absolute top-[-7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-black"></span>
                        <h4 className="text-2xl">{item.title}</h4>
                        <p className="text-sm mt-[10px] opacity-80">{item.desc}</p>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;