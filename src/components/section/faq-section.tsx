'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import data from '@/data/faq-section.json';
import FaqImage from '@/assets/imgs/faqs.jpg';

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
        <div className="row lg-marg">
          <div className="col-lg-5">
            <div className="fit-img img md-hide">
              <Image src={FaqImage} alt="FAQs Image" />
            </div>
          </div>
          <div className="col-lg-7 pt-30 pb-30">
            <div className="sec-head mb-60">
              <h6 className="sub-head mb-15">{data.sectionTitle}</h6>
              <h2>{data.sectionSubtitle}</h2>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="accordion">
                  {data.items.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div key={index} className={`accordion-item ${isActive ? 'active' : ''}`}>
                        <h4 className="accordion-header">
                          <button
                            className={`accordion-button ${!isActive ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => toggleIndex(index)}
                            aria-expanded={isActive}
                          >
                            {item.question}
                          </button>
                        </h4>
                        <div
                          className={`accordion-collapse ${isActive ? 'fade show' : 'fade'}`}
                          style={{ maxHeight: isActive ? '500px' : '0' }}
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
