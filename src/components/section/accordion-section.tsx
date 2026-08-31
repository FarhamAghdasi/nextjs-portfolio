'use client';

import { useState } from 'react';

interface AccordionSectionProps {
  template: {
    accordionTitle?: string;
    accordionContent?: string;
  };
}

export default function AccordionSection({ template }: AccordionSectionProps) {
  const [active, setActive] = useState<boolean>(false);

  const title = template.accordionTitle || 'No Title Provided';
  const content = template.accordionContent || 'No Content Provided';

  return (
    <div className="accordion proj-accordion" id="accordionExample">
      <div
        className={`accordion-item border-t border-white/15 transition-colors duration-300 ${
          active ? 'active border-main' : ''
        }`}
      >
        <h2 className="accordion-header" id="heading0">
          <button
            type="button"
            onClick={() => setActive((prev) => !prev)}
            aria-expanded={active}
            aria-controls="collapse0"
            className="flex w-full items-center justify-between gap-[15px] bg-transparent py-[18px] text-left text-xl font-medium leading-7 text-white transition-colors duration-300 hover:text-main"
          >
            <span className={active ? 'text-main' : ''}>{title}</span>
            <span
              className={`grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full border border-white/25 text-main transition-transform duration-300 ${
                active ? 'rotate-180' : ''
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </h2>
        <div id="collapse0" className={`accordion-collapse ${active ? 'open' : ''}`} aria-labelledby="heading0">
          <div className="accordion-body">
            <p className="pb-[18px] pl-[2px] pt-[4px] text-sm text-white/70">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
