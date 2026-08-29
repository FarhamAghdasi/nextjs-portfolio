"use client"
import React, { useState } from 'react';
import Image from 'next/image';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import servicesData from '@/data/services-line.json';
import { Service } from '../types';

const ServicesLine: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const services: Service[] = servicesData;

  return (
    <section className="section-padding pt-[0px] relative z-[3]">
      <div className="container">
        <div className="sec-sm-head text-center mb-[30px]">
          <div className="bract">
            {"{"} <span>My Services</span> {"}"}
          </div>
        </div>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`item relative py-[25px] px-[15px] border-t border-white/20 last-of-type:border-b last-of-type:border-white/20 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-0 [&>div]:w-full ${activeItem === index ? 'active text-[#111] after:h-full [&_.invert_img]:invert-0! [&_p]:text-[#1E1D1E]' : ''}`}
            onClick={() => setActiveItem(index)}
            onMouseEnter={() => setActiveItem(index)}
          >
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-6/12">
                <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-4/12">
                    <span className="numb">{service.number}</span>
                  </div>
                  <div className="w-full md:w-8/12">
                    <p className="max-md:mt-[5px]">
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
              <div className="w-full lg:w-6/12">
                <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-8/12">
                    <h2 className="text-[65px] font-semibold uppercase pt-[15px]">{service.title}</h2>
                  </div>
                  <div className="w-full md:w-4/12 flex">
                    <a href="#0" className="ml-auto max-md:ml-[0px]! max-md:mt-[15px]">
                      <span className="icon invert">
                        <Image src={arrowTopRight} alt="arrow icon" width={16} height={16} unoptimized/>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesLine;
