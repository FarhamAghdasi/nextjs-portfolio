"use client"
import aboutData from '@/data/about-section.json';
import { AboutContent } from '@/components/types';

export default function AboutIntro() {
  const { sectionClass, header, content } = aboutData as AboutContent;

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className={header.class}>
              <div className={header.bractClass}>
                <span>{header.title}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="text">
              <h3 className={content.class}>{content.text}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}