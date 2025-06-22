'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import servicesData from '@/data/service-section.json';
import { ServiceTitle } from '../types';

gsap.registerPlugin(ScrollTrigger);

const serviceImages: { [key: string]: string } = {
  '/imgs/skills/s4.png': '/assets/imgs/skills/s4.png',
  '/imgs/skills/seo.png': '/assets/imgs/skills/seo.png',
  '/imgs/skills/s2.png': '/assets/imgs/skills/s2.png',
  '/imgs/skills/nextjs.png': '/assets/imgs/skills/nextjs.png',
};

const Services = () => {
  const services: ServiceTitle[] = servicesData;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemsRef.current;

    if (!container || items.length === 0) return;

    items.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
              markers: false,
            },
          }
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && container?.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(items);
    };
  }, []);


  return (
    <section
      className="services-personal section-padding bg-img"
      style={{ backgroundImage: `url('/assets/imgs/smoke-bg.jpg')` }}
      ref={containerRef}
    >
      <div className="container pt-30 bord-thin-top-light ontop">
        {/* Header */}
        <div className="sec-head mb-80">
          <div className="d-flex">
            <div>
              <span className="sub-head">What I Do ?</span>
            </div>
            <div className="ml-auto">
              <div className="bract">
                {'{'} <span>A+ Support</span> {'}'}
              </div>
            </div>
          </div>
          <div className="row mt-30">
            <div className="col-lg-7 offset-lg-3">
              <div>
                <h2>
                  What areas am I
                  <br /> skilled in?
                </h2>
                <Link href="/about/" className="butn-under mt-15">
                  Read About My Skills{' '}
                  <span className="icon invert">
                    <Image
                      src="/assets/imgs/icons/arrow-top-right.svg"
                      alt="Arrow"
                      width={16}
                      height={16}
                      unoptimized
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="row justify-content-end">
          <div className="col-lg-8">
            <div className="serv-items">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="item"
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                >
                  <h2>{service.title}</h2>
                  <div className="tags">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex}>{tag}</span>
                    ))}
                  </div>
                  <div className="img fit-img">
                    <Image
                      src={serviceImages[service.image] || '/assets/imgs/fallback.png'}
                      alt={service.title}
                      width={400}
                      height={300}
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
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

export default Services;