import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Header, Footer , SEO} from '@/components';
import arrowTopRight from '/imgs/icons/arrow-top-right.svg';
import portfoliosData from '@/data/api/portfolio.json';
import texts from '@/data/portfolio-details.json';
import { Portfolio } from '@/components/types';

interface PortfolioInfoProps {
  portfolio: Portfolio | null;
}

const PortfolioInfo: React.FC<PortfolioInfoProps> = ({ portfolio }) => {
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

  const imagePrimary = `https://farhamaghdasi.ir/${portfolio.thumbnail}`;

  return (
    <>
      <SEO
        title={portfolio.title || texts.seoDefaultTitle}
        description={portfolio.description || texts.seoDefaultDescription}
        image={imagePrimary || '/default-thumbnail.jpg'}
        url={`https://farhamaghdasi.ir/portfolio/${portfolio.url}`}
      />
      <header className="serv-hed2 section-padding pb-0">
        <div className="container">
          <div className="caption mb-80">
            <h1 className="fz-80 fw-600">{portfolio.title || texts.defaultTitle}</h1>
            <div className="row justify-content-end">
              <div className="col-lg-3 mt-30">
                <p>
                  {texts.categoryLabel}: <b>{portfolio.category}</b>
                </p>
                <p>
                  {texts.authorLabel}: <b>{portfolio.author}</b>
                </p>
              </div>
              <div className="col-lg-5">
                <div className="text mt-30">
                  <p>
                    {portfolio.Shortdescription || texts.defaultShortDescription}{' '}
                    <br /> You Can See Website With This{' '}
                    <a href={portfolio.Previewurl}>{texts.viewLinkText}</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
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
        <div className="container-fluid">
          <div className="fit-img radius-15 scale">
            <Image
              src={imagePrimary || '/default-image.jpg'}
              alt={portfolio.title}
              width={1200}
              height={600}
            />
          </div>
        </div>
      </header>
      <section className="serv-details section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: portfolio.description || texts.defaultDescription }}
              />
            </div>
          </div>
          <div className="row mt-80">
            <div className="col-md-6">
              <div className="img sm-mb30">
                <Image
                  src="/default-image1.jpg"
                  alt="Portfolio Image 1"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="img">
                <Image
                  src="/default-image2.jpg"
                  alt="Portfolio Image 2"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-80">
            <div className="col-lg-7">
              <div className="content">
                <h3>{texts.faqTitle}</h3>
                <div className="text mt-30 mb-50">
                  <p>{texts.faqDescription}</p>
                </div>
                <div className="accordion" id="accordionExample">
                  {portfolio.accordionTitle && portfolio.accordionContent ? (
                    <div className={`accordion-item ${activeIndex === 0 ? 'active' : ''}`}>
                      <h2 className="accordion-header" id="heading0">
                        <button
                          className="accordion-button"
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
                        className={`accordion-collapse collapse ${activeIndex === 0 ? 'show' : ''}`}
                        aria-labelledby="heading0"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p>{portfolio.accordionContent || texts.defaultAccordionContent}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>{texts.noAccordionContent}</p>
                  )}
                </div>
                <div className="text-center">
                  <Link href="/portfolio" className="crv-butn mt-80">
                    <div className="d-flex">
                      <span className="text">{texts.checkMorePortfolios}</span>
                      <span className="icon">
                        <Image src={arrowTopRight} alt="" width={16} height={16} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = portfoliosData.portfolio.map((portfolio: Portfolio) => ({
    params: { url: portfolio.url },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PortfolioInfoProps> = async ({ params }) => {
  const portfolio = portfoliosData.portfolio.find((p: Portfolio) => p.url === params?.url) || null;

  return {
    props: {
      portfolio,
    },
  };
};

export default PortfolioInfo;