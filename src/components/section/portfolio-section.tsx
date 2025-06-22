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
    <section className="work-min ontop bord-thin-top-light" ref={sectionRef}>
      <div className="container pt-30 bord-thin-top-light">
        <div className="sec-head mb-80 col-lg-7 offset-lg-3">
          <h2>My Projects <br />and Website Templates</h2>
        </div>
        <div className="row">
          {/* Portfolio Section */}
          {portfolios.length > 0 ? (
            portfolios.slice(0, 2).map((portfolio, index) => (
              <div
                className="col-lg-6"
                key={portfolio.url}
                ref={(el) => {
                  portfolioRefs.current[index] = el;
                }}
              >
                <div className="item md-mb50">
                  <div className="img fit-img">
                    <Image
                      src={portfolio.thumbnail ? `/assets/imgs/uploads/${portfolio.thumbnail}` : '/default-image.jpg'}
                      alt={portfolio.title || 'Portfolio Image'}
                      width={800}
                      height={600}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div className="cont mt-30">
                    <div className="info">
                      <span className="date">{new Date(portfolio.date).getFullYear()}</span>
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
            <div className="col-lg-12">
              <p>No portfolios available at the moment.</p>
            </div>
          )}

          {/* Template Section */}
          {htmlTemplates.length > 0 ? (
            htmlTemplates.slice(0, 2).map((template, index) => (
              <div
                className="col-lg-6"
                key={template.url}
                ref={(el) => {
                  templateRefs.current[index] = el;
                }}
              >
                <div className="item md-mb50">
                  <div className="img fit-img">
                    <Image
                      src={template.thumbnail ? `/assets/imgs/uploads/${template.thumbnail}` : '/default-image.jpg'}
                      alt={template.title || 'Template Image'}
                      width={800}
                      height={600}
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div className="cont mt-30">
                    <div className="info">
                      <span className="date">{new Date(template.date).getFullYear()}</span>
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
            <div className="col-lg-12">
              <p>No HTML templates available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;