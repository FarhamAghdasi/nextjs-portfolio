'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Header, Footer } from '@/components';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import texts from '@/data/portfolio-details.json';
import { Portfolio } from '@/components/types';

interface PortfolioInfoProps {
  portfolio: Portfolio | null;
}

const PortfolioInfoClient: React.FC<PortfolioInfoProps> = ({ portfolio }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!portfolio) {
    return (
      <>
        <Header />
        <div className="container text-center section-padding">
          <p>{texts.portfolioNotFound}</p>
        </div>
        <Footer />
      </>
    );
  }

  const imagePrimary = portfolio.thumbnail
    ? `/assets/imgs/uploads/${portfolio.thumbnail}`
    : '/assets/imgs/default-image.jpg';

  // Helper function to render accordion content
  const renderAccordionContent = () => {
    if (typeof portfolio.accordionContent === 'string') {
      // Handle string case (e.g., Khooshesanat Amol)
      return (
        <div className={`accordion-item border-t border-white/15 transition-colors duration-300 ${activeIndex === 0 ? 'active border-main' : ''}`}>
          <h2 className="accordion-header" id="heading0">
            <button
              type="button"
              onClick={() => handleToggle(0)}
              aria-expanded={activeIndex === 0}
              aria-controls="collapse0"
              className="flex w-full items-center justify-between gap-[15px] bg-transparent py-[18px] text-left text-xl font-medium leading-7 text-white transition-colors duration-300 hover:text-main"
            >
              <span className={activeIndex === 0 ? 'text-main' : ''}>{portfolio.accordionTitle}</span>
              <span
                className={`grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full border border-white/25 text-main transition-transform duration-300 ${activeIndex === 0 ? 'rotate-180' : ''}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id="collapse0"
            className={`accordion-collapse ${activeIndex === 0 ? 'open' : ''}`}
            aria-labelledby="heading0"
          >
            <div className="accordion-body">
              <p className="pb-[18px] pl-[2px] pt-[4px] text-sm text-white/70">{portfolio.accordionContent || texts.defaultAccordionContent}</p>
            </div>
          </div>
        </div>
      );
    } else if (Array.isArray(portfolio.accordionContent)) {
      // Handle array case (e.g., Rip Hunter)
      return portfolio.accordionContent.map((item: { title: string; content: string }, index: number) => (
        <div
          className={`accordion-item border-t border-white/15 transition-colors duration-300 ${activeIndex === index ? 'active border-main' : ''}`}
          key={index}
        >
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`collapse${index}`}
              className="flex w-full items-center justify-between gap-[15px] bg-transparent py-[18px] text-left text-xl font-medium leading-7 text-white transition-colors duration-300 hover:text-main"
            >
              <span className={activeIndex === index ? 'text-main' : ''}>{item.title}</span>
              <span
                className={`grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full border border-white/25 text-main transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className={`accordion-collapse ${activeIndex === index ? 'open' : ''}`}
            aria-labelledby={`heading${index}`}
          >
            <div className="accordion-body">
              <p className="pb-[18px] pl-[2px] pt-[4px] text-sm text-white/70">{item.content}</p>
            </div>
          </div>
        </div>
      ));
    }
    return <p>{texts.noAccordionContent}</p>;
  };

  return (
    <>
      <header className="section-padding pb-[0px]">
        <div className="container">
          <div className="caption mb-[40px]">
            <h1 className="text-[52px] font-semibold max-md:text-[28px]!">{portfolio.title || texts.defaultTitle}</h1>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-[40px] gap-y-[40px]">
                <div className="lg:col-span-3">
                  <div className="space-y-[10px]">
                    <p>
                      {texts.categoryLabel}: <b>{portfolio.category}</b>
                    </p>
                    <p>
                      {texts.authorLabel}: <b>{portfolio.author}</b>
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="text leading-relaxed">
                    <p>
                      {portfolio.Shortdescription || texts.defaultShortDescription}{' '}
                      <br /> You Can See Website With This{' '}
                      <a href={portfolio.Previewurl}>{texts.viewLinkText}</a>
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div className="list max-md:[&_ul]:p-0">
                    <ul className="space-y-[12px]">
                      <li>{portfolio.serviceTitle1 || texts.defaultService}</li>
                      <li>{portfolio.serviceTitle2 || texts.defaultService}</li>
                      <li>{portfolio.serviceTitle3 || texts.defaultService}</li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="w-full px-4">
            <div className="fit-img radius-15 scale max-w-[900px] mx-auto">
            <Image
              src={imagePrimary}
              alt={portfolio.title || 'Portfolio Image'}
              width={1200}
              height={600}
              style={{ objectFit: 'contain' }}
              className="hero-img-anim"
              unoptimized
            />
          </div>
        </div>
      </header>
      <section className="section-padding">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-10/12">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: portfolio.description || texts.defaultDescription }}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-[80px]">
            <div className="w-full lg:w-7/12">
              <div className="content">
                <h3>{texts.faqTitle}</h3>
                <div className="text mt-[30px] mb-[50px]">
                  <p>{texts.faqDescription}</p>
                </div>
                <div className="accordion proj-accordion" id="accordionExample">
                  {portfolio.accordionTitle && portfolio.accordionContent
                    ? renderAccordionContent()
                    : <p>{texts.noAccordionContent}</p>}
                </div>
                <div className="text-center">
                  <Link href="/portfolio" className="crv-butn mt-[80px]">
                    <div className="flex justify-center items-center">
                      <span className="text">{texts.checkMorePortfolios}</span>
                      <span className="icon">
                        <Image src={arrowTopRight} alt="Arrow" width={16} height={16} unoptimized />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioInfoClient;