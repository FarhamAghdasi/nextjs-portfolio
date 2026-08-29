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
      className="section-padding bg-img relative pb-[170px] after:content-[''] after:absolute after:-top-[10px] after:left-0 after:w-full after:h-1/2 after:[background-image:linear-gradient(to_bottom,var(--theme-color)_10%,transparent)] before:content-[''] before:absolute before:inset-0 before:bg-theme before:opacity-80"
      style={{ backgroundImage: `url('/assets/imgs/smoke-bg.jpg')` }}
      ref={containerRef}
    >
      <div className="container mx-auto px-4 pt-[30px] bord-thin-top-light ontop">
        {/* Header */}
        <div className="sec-head mb-[80px]">
          <div className="flex">
            <div>
              <span className="sub-head">What I Do ?</span>
            </div>
            <div className="ml-auto">
              <div className="bract">
                {'{'} <span>A+ Support</span> {'}'}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-[30px]">
            <div className="w-full lg:w-7/12 lg:ml-[25%]">
              <div>
                <h2 className="max-md:text-[30px] max-md:leading-[1.2]">
                  What areas am I
                  <br /> skilled in?
                </h2>
                <Link href="/about/" className="butn-under mt-[15px]">
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
        <div className="flex flex-wrap justify-end max-[992px]:justify-start">
          <div className="w-full lg:w-8/12">
            <div className="serv-items">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="item group relative py-10 border-t border-white/10 last-of-type:border-b last-of-type:border-white/10"
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                >
                  <h2 className="text-[80px] max-md:text-[30px]">{service.title}</h2>
                  <div className="tags mt-[15px]">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="relative text-sm font-light mr-[50px] last-of-type:after:hidden after:content-[''] after:absolute after:top-1/2 after:-right-[30px] after:w-[5px] after:h-[5px] after:rounded-full after:bg-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="img fit-img w-0 rounded-[10px] absolute top-1/2 right-[50px] max-md:right-[10px] -translate-y-1/2 transition-all duration-400 group-hover:w-[10%] max-md:group-hover:w-[120px]">
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