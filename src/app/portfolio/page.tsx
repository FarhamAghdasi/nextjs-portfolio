'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Inner, SEO } from '@/components';
import arrowTopRight from '@/assets/imgs/icons/arrow-top-right.svg';
import portfoliosData from '@/data/api/portfolio.json';
import texts from '@/data/portfolio-page.json';
import { Portfolio } from '@/components/types';

gsap.registerPlugin(ScrollTrigger);

const WorksPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null); // ✅ Timeline ref
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null); // ✅ ScrollTrigger ref

  useEffect(() => {
    setPortfolioData(portfoliosData.portfolio || []);
  
    const cards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const container = containerRef.current;
    const wrapper = cardsWrapperRef.current;
  
    if (cards.length > 0 && container && wrapper) {
      const cardHeight = window.innerHeight;
      const totalScroll = cardHeight * cards.length;
  
      container.style.height = `${totalScroll}px`;
  
      cards.forEach((card, index) => {
        gsap.set(card, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: cards.length - index,
        });
      });
  
      const tl = gsap.timeline();
  
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
  
        tl.to(card, {
          yPercent: -100,
          duration: 1,
          ease: 'none',
        }, index);
      });
  
      scrollTriggerRef.current = ScrollTrigger.create({
        animation: tl,
        trigger: wrapper,
        start: 'top top',
        end: `+=${totalScroll - cardHeight}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
      });
  
      tlRef.current = tl;
  
      const onResize = () => {
        scrollTriggerRef.current?.kill();
        tlRef.current?.kill();
        ScrollTrigger.refresh();
      };
  
      window.addEventListener('resize', onResize);
  
      return () => {
        scrollTriggerRef.current?.kill();
        tlRef.current?.kill();
        window.removeEventListener('resize', onResize);
        cards.forEach((card) => {
          gsap.set(card, {
            clearProps: 'all',
          });
        });
        if (container) container.style.height = '';
      };
    }
  }, []);
  
  

  return (
    <>
      <SEO
        title={texts.seoTitle}
        description={texts.seoDescription}
        url="https://farhamaghdasi.ir/portfolio"
      />
      <Inner
        title={texts.innerTitle}
        first={texts.innerFirst}
        secend={texts.innerSecond}
        paragraph={texts.innerParagraph}
        links={texts.innerLinks}
      />
      <section className="work-card section-padding pt-0" ref={containerRef}>
        <div className="container">
          <div className="cards" ref={cardsWrapperRef}>
            {portfolioData.length > 0 ? (
              portfolioData.map((portfolio, index) => (
                <div
                  className="card-item rounded-xl"
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  key={portfolio.title}
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
                        href={portfolio.Previewurl}
                        className="butn butn-md butn-bord butn-rounded"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="d-flex align-items-center">
                          <span>{texts.viewProject}</span>
                          <span className="icon invert ml-10 n">
                            <Image src={arrowTopRight} alt="" width={16} height={16} />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="img fit-img mt-30">
                    {portfolio.thumbnail ? (
                      <Image
                        src={`https://farhamaghdasi.ir/${portfolio.thumbnail}`}
                        alt={portfolio.title}
                        width={600}
                        height={400}
                        style={{ objectFit: 'cover' }}
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
