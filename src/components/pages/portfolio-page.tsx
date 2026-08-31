'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Inner } from '@/components';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
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

    const cards = Array.from(cardsWrapperRef.current.querySelectorAll<HTMLElement>('.card-item'));
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.92,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });
    }, cardsWrapperRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
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
      <section className="section-padding pt-[0px]">
        <div className="container">
          <div className="cards" ref={cardsWrapperRef} style={{ position: 'relative' }}>
            {portfolioData.length > 0 ? (
              portfolioData.map((portfolio, index) => (
                <div
                  className="card-item rounded-[15px] py-[30px] px-10 bg-[#181616] max-md:mb-[30px]"
                  key={portfolio.title}
                  style={{
                    marginBottom: '2rem',
                    position: 'sticky',
                    top: '120px',
                    zIndex: index + 1,
                  }}
                >
                  <div className="flex items-end mt-4 lg:flex-row flex-col">
                    <div>
                      <div className="tags [&_a]:text-[#ccc] [&_a]:text-sm [&_a]:pt-[10px] [&_a]:px-5 [&_a]:pb-2 [&_a]:rounded-[30px] [&_a]:border [&_a]:border-white/30 [&_a]:mb-[15px] [&_a]:inline-block">
                        <a href="#">{portfolio.category}</a>
                      </div>
                      <h3 className="title max-md:mb-[30px]">
                        <Link href={`/portfolio/${portfolio.url}/`}>{portfolio.title}</Link>
                      </h3>
                    </div>
                    <div className="ml-auto max-md:ml-[0px]! max-md:mt-[5px]">
                      <Link
                        href={portfolio.Previewurl || '#'}
                        className="butn butn-md butn-bord butn-rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center">
                          <span>{texts.viewProject}</span>
                          <span className="icon invert ml-[10px] n">
                            <Image src={arrowTopRight} alt="Arrow" width={16} height={16} unoptimized/>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="img fit-img mt-[30px] relative rounded-[15px] overflow-hidden" style={{ height: '400px' }}>
                    {portfolio.thumbnail ? (
                      <Image
                        src={`/assets/imgs/uploads/${portfolio.thumbnail}`}
                        alt={portfolio.title || 'Portfolio Image'}
                        width={600}
                        height={400}
                        style={{ objectFit: 'cover', height: '100%' }}
                        unoptimized
                      />
                    ) : (
                      <span className="no-image">No Image Available</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data-message relative w-full z-[999999] text-white">{texts.noDataMessage}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorksPage;