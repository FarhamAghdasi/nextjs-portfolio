"use client"
import React from 'react';
import Image from 'next/image';
import data from '@/data/faq-section.json';
import FaqImage from '@/assets/imgs/faqs.jpg'

const Faq: React.FC = () => {
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
                <div className="accordion" id="accordionExample">
                  {data.items.map((item, index) => {
                    const collapseId = `collapse${index}`;
                    const headingId = `heading${index}`;
                    const isActive = index === 0;

                    return (
                      <div key={index} className={`accordion-item ${isActive ? 'active' : ''}`}>
                        <h4 className="accordion-header" id={headingId}>
                          <button
                            className={`accordion-button ${!isActive ? 'collapsed' : ''}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isActive}
                            aria-controls={collapseId}
                          >
                            {item.question}
                          </button>
                        </h4>
                        <div
                          id={collapseId}
                          className={`accordion-collapse collapse ${isActive ? 'show' : ''}`}
                          aria-labelledby={headingId}
                          data-bs-parent="#accordionExample"
                        >
                          <div
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
};

export default Faq;
