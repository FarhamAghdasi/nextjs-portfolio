'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import smokeBg from '@/assets/imgs/smoke-bg.jpg';
import arrowTopRight from '@/assets/imgs/icons/arrow-top-right.svg';
import reactIcon from '@/assets/imgs/skills/s4.png';
import seoIcon from '@/assets/imgs/skills/seo.png';
import editIcon from '@/assets/imgs/skills/s2.png';
import nextjsIcon from '@/assets/imgs/skills/nextjs.png';
import fallbackImage from '@/assets/imgs/fallback.png';

import servicesData from '@/data/service-section.json';
import { ServiceTitle } from '../types';

gsap.registerPlugin(ScrollTrigger);

const serviceImages: { [key: string]: StaticImageData } = {
  '/imgs/skills/s4.png': reactIcon,
  '/imgs/skills/seo.png': seoIcon,
  '/imgs/skills/s2.png': editIcon,
  '/imgs/skills/nextjs.png': nextjsIcon,
};

const Services = () => {
  const services: ServiceTitle[] = servicesData;
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !itemsRef.current.length) return;

    const setupAnimations = () => {
      itemsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0, // stagger effect
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
    };

    setupAnimations();

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && containerRef.current?.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(itemsRef.current);
    };
  }, []);

  return (
    <section
      className="services-personal section-padding bg-img"
      style={{ backgroundImage: `url(${smokeBg.src})` }}
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
                    <Image src={arrowTopRight} alt="Arrow" width={16} height={16} />
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
                      src={serviceImages[service.image] || fallbackImage}
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