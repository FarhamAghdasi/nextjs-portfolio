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
      <div className={`accordion-item ${activeIndex === 0 ? 'active' : ''}`}>
           <h2 className="accordion-header" id="heading0">
             <button
               type="button"
               onClick={() => handleToggle(0)}
               aria-expanded={activeIndex === 0}
               aria-controls="collapse0"
             >
               {portfolio.accordionTitle}
             </button>
           </h2>
           <div
             id="collapse0"
             className="accordion-collapse"
             style={{ maxHeight: activeIndex === 0 ? '500px' : '0', opacity: activeIndex === 0 ? 1 : 0 }}
             aria-labelledby="heading0"
           >
             <div className="accordion-body">
               <p>{portfolio.accordionContent || texts.defaultAccordionContent}</p>
             </div>
           </div>
         </div>
      );
    } else if (Array.isArray(portfolio.accordionContent)) {
      // Handle array case (e.g., Rip Hunter)
      return portfolio.accordionContent.map((item: { title: string; content: string }, index: number) => (
        <div
          className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
          key={index}
        >
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              type="button"
              onClick={() => handleToggle(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`collapse${index}`}
            >
              {item.title}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className="accordion-collapse"
            style={{ maxHeight: activeIndex === index ? '500px' : '0', opacity: activeIndex === index ? 1 : 0 }}
            aria-labelledby={`heading${index}`}
          >
            <div className="accordion-body">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ));
    }
    return <p>{texts.noAccordionContent}</p>;
  };

  return (
    <>
      <header className="serv-hed2 section-padding pb-0">
        <div className="container">
          <div className="caption mb-80">
            <h1 className="fz-80 fw-600">{portfolio.title || texts.defaultTitle}</h1>
            <div className="flex flex-wrap justify-end">
              <div className="w-full lg:w-3/12 mt-30">
                <p>
                  {texts.categoryLabel}: <b>{portfolio.category}</b>
                </p>
                <p>
                  {texts.authorLabel}: <b>{portfolio.author}</b>
                </p>
              </div>
              <div className="w-full lg:w-5/12">
                <div className="text mt-30">
                  <p>
                    {portfolio.Shortdescription || texts.defaultShortDescription}{' '}
                    <br /> You Can See Website With This{' '}
                    <a href={portfolio.Previewurl}>{texts.viewLinkText}</a>
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-4/12">
                <div className="list mt-30">
                  <ul>
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
          <div className="fit-img radius-15 scale">
            <Image
              src={imagePrimary}
              alt={portfolio.title || 'Portfolio Image'}
              width={1200}
              height={600}
              unoptimized
            />
          </div>
        </div>
      </header>
      <section className="serv-details section-padding">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-10/12">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: portfolio.description || texts.defaultDescription }}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-80">
            <div className="w-full lg:w-7/12">
              <div className="content">
                <h3>{texts.faqTitle}</h3>
                <div className="text mt-30 mb-50">
                  <p>{texts.faqDescription}</p>
                </div>
                <div className="accordion" id="accordionExample">
                  {portfolio.accordionTitle && portfolio.accordionContent
                    ? renderAccordionContent()
                    : <p>{texts.noAccordionContent}</p>}
                </div>
                <div className="text-center">
                  <Link href="/portfolio" className="crv-butn mt-80">
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