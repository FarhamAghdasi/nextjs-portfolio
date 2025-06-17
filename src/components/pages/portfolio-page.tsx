'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Inner } from '@/components';
import arrowTopRight from '@/assets/imgs/icons/arrow-top-right.svg';
import portfoliosData from '@/data/api/portfolio.json';
import texts from '@/data/portfolio-page.json';
import { Portfolio } from '@/components/types';

gsap.registerPlugin(ScrollTrigger);

const WorksPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortfolioData(portfoliosData.portfolio || []);
  }, []);

  useEffect(() => {
    if (!portfolioData.length || !cardsWrapperRef.current) return;

    const cards = Array.from(cardsWrapperRef.current.children) as HTMLElement[];
    if (!cards.length) return;

    const triggers: ScrollTrigger[] = [];

    const lastCard = cards[cards.length - 1];
    const lastCardST = ScrollTrigger.create({
      trigger: lastCard,
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
      lastCardST.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [portfolioData]);

  return (
    <>
      <Inner
        title={texts.innerTitle}
        first={texts.innerFirst}
        secend={texts.innerSecond}
        paragraph={texts.innerParagraph}
        links={texts.innerLinks}
      />
      <section className="work-card section-padding pt-0">
        <div className="container">
          <div className="cards" ref={cardsWrapperRef} style={{ position: 'relative' }}>
            {portfolioData.length > 0 ? (
              portfolioData.map((portfolio) => (
                <div
                  className="card-item rounded-xl"
                  key={portfolio.title}
                  style={{
                    marginBottom: '2rem',
                    transformOrigin: '50% center',
                  }}
                >
                  <div className="d-lg-flex align-items-end mt-4">
                    <div>
                      <div className="tags">
                        <a href="#">{portfolio.category}</a>
                      </div>
                      <h3 className="title">
                        <Link href={`/portfolio/${portfolio.url}`}>{portfolio.title}</Link>
                      </h3>
                    </div>
                    <div className="ml-auto">
                      <Link
                        href={portfolio.Previewurl || '#'}
                        className="butn butn-md butn-bord butn-rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="d-flex align-items-center">
                          <span>{texts.viewProject}</span>
                          <span className="icon invert ml-10 n">
                            <Image src={arrowTopRight} alt="Arrow" width={16} height={16} />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="img fit-img mt-30" style={{ height: '400px' }}>
                    {portfolio.thumbnail ? (
                      <Image
                        src={`https://farhamaghdasi.ir/${portfolio.thumbnail}`}
                        alt={portfolio.title || 'Portfolio Image'}
                        width={600}
                        height={400}
                        style={{ objectFit: 'cover', height: '100%' }}
                      />
                    ) : (
                      <span className="no-image">No Image Available</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message">{texts.noDataMessage}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorksPage;