'use client';

import { useRef, useState } from 'react';
import data from '@/data/faq-section.json';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const collapseRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleIndex = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const half = Math.ceil(data.items.length / 2);
  const columns = [data.items.slice(0, half), data.items.slice(half)];

  return (
    <section className="faqs-pg section-padding">
      <div className="container">
        <div className="sec-head text-center mb-[60px]">
          <h6 className="sub-head mb-[15px]">{data.sectionTitle}</h6>
          <h2 className="max-md:text-[30px]">{data.sectionSubtitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px]">
          {columns.map((colItems, ci) => (
            <div key={ci} className="accordion" id={ci === 0 ? 'faqAccordion' : `faqAccordion-${ci}`}>
              {colItems.map((item) => {
                const index = data.items.indexOf(item);
                const isActive = index === activeIndex;
                return (
                  <div key={index} className={`accordion-item border-b border-white/10 mb-[5px] transition-colors duration-300 ${isActive ? 'active' : ''}`}>
                    <h2 className="accordion-header bg-transparent">
                      <button
                        type="button"
                        onClick={() => toggleIndex(index)}
                        aria-expanded={isActive}
                        className="flex w-full items-center justify-between gap-[15px] bg-transparent py-[18px] text-left text-xl font-medium leading-7 text-white transition-colors duration-300 hover:text-main after:hidden"
                      >
                        <span className={isActive ? 'text-main' : ''}>{item.question}</span>
                        <span className={`grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full border border-white/25 text-main transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    </h2>
                    <div
                      className="accordion-collapse"
                      ref={(el) => {
                        collapseRefs.current[index] = el;
                      }}
                      style={{
                        maxHeight: isActive
                          ? `${collapseRefs.current[index]?.scrollHeight ?? 500}px`
                          : '0px',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                      }}
                      aria-hidden={!isActive}
                    >
                      <p
                        onClick={() => toggleIndex(index)}
                        className="accordion-body cursor-pointer pt-[4px] pb-[25px] pr-[10px] pl-[2px] text-sm leading-relaxed text-white/70"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
