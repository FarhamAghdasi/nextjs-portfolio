"use client"
import React, { useRef, useState } from 'react';
import servicesData from '@/data/services-line.json';
import { Service } from '../types';

const ServicesLine: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const services: Service[] = servicesData;

  const focusItem = (index: number) => {
    const items = containerRef.current?.querySelectorAll<HTMLElement>('[data-service-item]');
    if (!items || items.length === 0) return;
    const next = (index + items.length) % items.length;
    items[next]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveItem(index);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(index - 1);
    }
  };

  return (
    <section className="services-cst section-padding pt-[0px] relative z-[3]">
      <div className="container" ref={containerRef}>
        <div className="sec-sm-head text-center mb-[30px]">
          <div className="bract">
            {"{"} <span>My Services</span> {"}"}
          </div>
        </div>
        <div className="services-list">
          {services.map((service, index) => {
            const isActive = activeItem === index;
            return (
              <div
                key={service.id}
                data-service-item
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${service.title} — ${service.description.replace(/\n/g, ', ')}`}
                className={`item relative py-[25px] px-[15px] border-t border-white/20 last-of-type:border-b last-of-type:border-white/20 cursor-pointer ${isActive ? 'active' : ''}`}
                onClick={() => setActiveItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                <div className="flex flex-wrap items-center w-full lg:justify-between">
                  <div className="w-full lg:w-auto lg:max-w-[55%]">
                    <h2 className="text-[65px] leading-[1.05] font-semibold uppercase pt-[15px]">{service.title}</h2>
                  </div>
                  <div className="w-full lg:w-auto lg:text-right">
                    <p className="max-md:mt-[5px] text-right">
                      {service.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesLine;
