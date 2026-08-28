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
    <section className="services-cst section-padding pt-0">
      <div className="container">
        <div className="sec-sm-head text-center mb-30">
          <div className="bract">
            {"{"} <span>My Services</span> {"}"}
          </div>
        </div>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`item ${activeItem === index ? 'active' : ''}`}
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
                    <p>
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
                    <h2>{service.title}</h2>
                  </div>
                  <div className="w-full md:w-4/12 flex">
                    <a href="#0" className="ml-auto">
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
