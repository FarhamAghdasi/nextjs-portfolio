'use client';

import { useState } from 'react';

interface AccordionSectionProps {
  template: {
    accordionTitle?: string;
    accordionContent?: string;
  };
}

export default function AccordionSection({ template }: AccordionSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const title = template.accordionTitle || 'No Title Provided';
  const content = template.accordionContent || 'No Content Provided';

  return (
    <div className="accordion" id="accordionExample">
      <div className={`accordion-item bg-transparent border-0 border-t border-white rounded-none ${activeIndex === 0 ? 'active border-main' : ''}`}>
        <h2 className="accordion-header bg-transparent text-white" id="heading0">
          <button
            type="button"
            onClick={() => handleToggle(0)}
            aria-expanded={activeIndex === 0}
            aria-controls="collapse0"
            className={`bg-transparent text-inherit text-xl font-medium leading-7 py-[15px] after:hidden ${activeIndex === 0 ? '!text-main' : ''}`}
          >
            {title}
          </button>
        </h2>
        <div
          id="collapse0"
          className="accordion-collapse"
          style={{ maxHeight: activeIndex === 0 ? '500px' : '0', opacity: activeIndex === 0 ? 1 : 0 }}
          aria-labelledby="heading0"
        >
          <div className="accordion-body pt-[0px] pr-[0px] pb-[15px] pl-[90px]">
            <p className="text-sm">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}