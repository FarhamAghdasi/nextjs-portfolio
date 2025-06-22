'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Inner } from '@/components';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import templateData from '@/data/api/template.json';
import { Template } from '@/components/types';

gsap.registerPlugin(ScrollTrigger);

export default function HtmlTemplates() {
  const templates = (templateData.templates || []) as Template[];

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.cards .card-item');
    if (!cards.length) return;

    const triggers: ScrollTrigger[] = [];

    const firstCardST = ScrollTrigger.create({
      trigger: cards[0],
      start: 'center center',
    });

    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: 'bottom bottom',
    });

    cards.forEach((card, index) => {
      const scale = 1 - (cards.length - index) * 0.025;
      const activeShadow = '0 10px 30px rgba(0,0,0,0.2)';
      const activeBorderColor = 'rgba(255, 255, 255, 0.8)';
      const inactiveShadow = '0 0 0 rgba(0,0,0,0)';
      const inactiveBorderColor = 'rgba(255, 255, 255, 0)';

      const anim = gsap.to(card, {
        scale,
        boxShadow: activeShadow,
        borderColor: activeBorderColor,
        transformOrigin: `50% ${lastCardST.start}px`,
        ease: 'power2.out',
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'center center',
        end: () => lastCardST.start,
        pin: true,
        pinSpacing: false,
        animation: anim,
        toggleActions: 'restart none none reverse',
        scrub: 0.3,
        onEnter: () => {
          gsap.to(card, { boxShadow: activeShadow, borderColor: activeBorderColor, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(card, { boxShadow: inactiveShadow, borderColor: inactiveBorderColor, duration: 0.3 });
        },
        onLeave: () => {
          gsap.to(card, { boxShadow: inactiveShadow, borderColor: inactiveBorderColor, duration: 0.3 });
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      firstCardST.kill();
      lastCardST.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <>
      <Inner title="HTML Templates" first="Home" secend="HTML Templates" />

      <section className="work-card section-padding pt-0">
        <div className="container">
          <div className="cards">
            {templates.length > 0 ? (
              templates.map((template, index) => (
                <div
                  className="card-item rounded-xl"
                  key={index}
                  style={{
                    border: '2px solid rgba(255,255,255,0)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  <div className="d-lg-flex align-items-end mt-4">
                    <div>
                      <div className="tags">
                        {template.category ? (
                          <Link href={`/templates?category=${encodeURIComponent(template.category)}`}>
                            {template.category}
                          </Link>
                        ) : (
                          <span>No category</span>
                        )}
                      </div>
                      <h3 className="title">
                        <Link href={`/templates/${template.url}`}>{template.title}</Link>
                      </h3>
                    </div>
                    <div className="ml-auto">
                      <a
                        href={template.buyLink || '#'}
                        className="mr-3 butn butn-md butn-bord butn-rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="d-flex align-items-center">
                          <span>Buy Now</span>
                          <span className="icon invert ml-10 n">
                            <Image src={arrowTopRight} alt="Arrow Icon" width={16} height={16} unoptimized />
                          </span>
                        </div>
                      </a>
                      <Link
                        href={`/templates/${template.url}`}
                        className="mr-3 butn butn-md butn-bord butn-rounded"
                      >
                        <div className="d-flex align-items-center">
                          <span>View Template</span>
                          <span className="icon invert ml-10 n">
                            <Image src={arrowTopRight} alt="Arrow Icon" width={16} height={16} unoptimized/>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="img fit-img mt-30">
                    <Image
                      src={template.thumbnail ? `/assets/imgs/uploads/${template.thumbnail}` : '/default-image.jpg'}
                      alt={template.title || 'Template Image'}
                      width={800}
                      height={500}
                      className="w-full rounded-xl"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message">No templates found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}