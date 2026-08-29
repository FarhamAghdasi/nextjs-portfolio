'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portfoliosData from '@/data/api/portfolio.json';
import templatesData from '@/data/api/template.json';
import { PortfolioItem, TemplateItem } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Work: React.FC = () => {
  const portfolios: PortfolioItem[] = portfoliosData.portfolio || [];
  const htmlTemplates: TemplateItem[] = templatesData.templates || [];
  const portfolioRefs = useRef<(HTMLDivElement | null)[]>([]);
  const templateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portfolios = portfolioRefs.current;
    const templates = templateRefs.current;

    const setupAnimations = () => {
      if (portfolios.length > 0) {
        portfolios.forEach((el, index) => {
          if (el) {
            gsap.fromTo(
              el,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: index * 0.4,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });
      }

      if (templates.length > 0) {
        templates.forEach((el, index) => {
          if (el) {
            gsap.fromTo(
              el,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: index * 0.4,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        });
      }
    };

    setupAnimations();

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && section?.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(portfolios);
      gsap.killTweensOf(templates);
    };
  }, []);

  return (
    <section className="ontop bord-thin-top-light pb-[50px]" ref={sectionRef}>
      <div className="container mx-auto px-4 pt-[30px] bord-thin-top-light">
        <div className="sec-head mb-[80px] lg:w-7/12 lg:ml-[25%]">
          <h2>My Projects <br />and Website Templates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 md:gap-x-4 lg:gap-x-5 gap-y-3 md:gap-y-4 lg:gap-y-5">
          {/* Portfolio Section */}
          {portfolios.length > 0 ? (
            portfolios.slice(0, 2).map((portfolio, index) => (
              <div
                className="col-span-1"
                key={portfolio.url}
                ref={(el) => {
                  portfolioRefs.current[index] = el;
                }}
              >
                <div className="item max-[992px]:mb-[50px]">
                  <div className="img fit-img rounded-[15px] overflow-hidden max-md:h-[280px]">
                    <Image
                      src={portfolio.thumbnail ? `/assets/imgs/uploads/${portfolio.thumbnail}` : '/default-image.jpg'}
                      alt={portfolio.title || 'Portfolio Image'}
                      width={800}
                      height={600}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div className="cont mt-[30px]">
                    <div className="info mb-[10px] text-sm font-light">
                      <span className="date relative mr-[30px] after:content-[''] after:absolute after:top-1/2 after:-right-5 after:w-[5px] after:h-[5px] after:rounded-full after:bg-white">{new Date(portfolio.date).getFullYear()}</span>
                      <span className="tag">{portfolio.category || 'Portfolio'}</span>
                    </div>
                    <h5>
                      <Link href={`/portfolio/${portfolio.url}/`}>
                        {portfolio.title}
                      </Link>
                    </h5>
                    <p>{portfolio.Shortdescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <p>No portfolios available at the moment.</p>
            </div>
          )}

          {/* Template Section */}
          {htmlTemplates.length > 0 ? (
            htmlTemplates.slice(0, 2).map((template, index) => (
              <div
                className="col-span-1"
                key={template.url}
                ref={(el) => {
                  templateRefs.current[index] = el;
                }}
              >
                <div className="item max-[992px]:mb-[50px]">
                  <div className="img fit-img rounded-[15px] overflow-hidden max-md:h-[280px]">
                    <Image
                      src={template.thumbnail ? template.thumbnail : '/default-image.jpg'}
                      alt={template.title || 'Template Image'}
                      width={800}
                      height={600}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div className="cont mt-[30px]">
                    <div className="info mb-[10px] text-sm font-light">
                      <span className="date relative mr-[30px] after:content-[''] after:absolute after:top-1/2 after:-right-5 after:w-[5px] after:h-[5px] after:rounded-full after:bg-white">{new Date(template.date).getFullYear()}</span>
                      <span className="tag">{template.category || 'HTML Template'}</span>
                    </div>
                    <h5>
                      <Link href={`/templates/${template.url}/`}>
                        {template.title}
                      </Link>
                    </h5>
                    <p>{template.Shortdescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <p>No HTML templates available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;