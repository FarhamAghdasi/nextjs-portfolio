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
      <div className={`accordion-item ${activeIndex === 0 ? 'active' : ''}`}>
        <h2 className="accordion-header" id="heading0">
          <button
            className="accordion-button"
            type="button"
            onClick={() => handleToggle(0)}
            aria-expanded={activeIndex === 0}
            aria-controls="collapse0"
          >
            {title}
          </button>
        </h2>
        <div
          id="collapse0"
          className={`accordion-collapse collapse ${activeIndex === 0 ? 'show' : ''}`}
          aria-labelledby="heading0"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}