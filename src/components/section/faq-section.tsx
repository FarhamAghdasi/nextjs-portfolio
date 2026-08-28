'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import data from '@/data/faq-section.json';
const FaqImage = '/assets/imgs/faqs.jpg';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleIndex = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faqs-pg section-padding">
      <div className="container">
        <div className="flex flex-wrap gap-10">
          <div className="w-full lg:w-5/12">
            <div className="fit-img img hidden lg:block">
              <Image src={FaqImage} alt="FAQs Image" unoptimized />
            </div>
          </div>
          <div className="w-full lg:w-7/12 lg:ml-[8.33%] pt-30 pb-30">
            <div className="sec-head mb-60">
              <h6 className="sub-head mb-15">{data.sectionTitle}</h6>
              <h2>{data.sectionSubtitle}</h2>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-10/12">
                <div className="accordion" id="faqAccordion">
                  {data.items.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div key={index} className={`accordion-item ${isActive ? 'active' : ''}`}>
                        <h4 className="accordion-header">
                          <button
                            type="button"
                            onClick={() => toggleIndex(index)}
                            aria-expanded={isActive}
                            className={isActive ? '' : 'collapsed'}
                          >
                            {item.question}
                          </button>
                        </h4>
                        <div
                          className="accordion-collapse"
                          style={{ maxHeight: isActive ? '500px' : '0', opacity: isActive ? 1 : 0 }}
                          aria-hidden={!isActive}
                        >
                          <p
                            className="accordion-body"
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
