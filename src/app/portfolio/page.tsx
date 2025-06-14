"use client"
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import {  Inner, SEO } from '@/components';
import arrowTopRight from '@/assets/imgs/icons/arrow-top-right.svg';
import portfoliosData from '@/data/api/portfolio.json';
import texts from '@/data/portfolio-page.json';
import { Portfolio } from '@/components/types';

gsap.registerPlugin(ScrollTrigger);

const WorksPage: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Set portfolio data from JSON
    setPortfolioData(portfoliosData.portfolio || []);

    const cards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const scrollTriggers: ScrollTrigger[] = [];

    if (cards.length > 0) {
      const firstCardST = ScrollTrigger.create({
        trigger: cards[0],
        start: 'center center',
      });

      const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: 'bottom bottom',
      });

      scrollTriggers.push(firstCardST, lastCardST);

      cards.forEach((card, index) => {
        const scale = 1 - (cards.length - index) * 0.025;
        const scaleDown = gsap.to(card, {
          scale: scale,
          ease: 'none', // Apply easing to the GSAP animation
          'transform-origin': '50% ' + (lastCardST.start + 0),
        });

        const cardST = ScrollTrigger.create({
          trigger: card,
          start: 'center center',
          end: () => lastCardST.start,
          pin: true,
          pinSpacing: false,
          animation: scaleDown,
          toggleActions: 'restart none none reverse',
        });

        scrollTriggers.push(cardST);
      });
    }

    return () => {
      scrollTriggers.forEach((st) => st.kill());
    };
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
      <section className="work-card section-padding pt-0">
        <div className="container">
          <div className="cards">
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
                    <Image
                      src={`https://farhamaghdasi.ir/${portfolio.thumbnail}`}
                      alt={portfolio.title}
                      width={600}
                      height={400}
                    />
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