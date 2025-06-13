import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { Header, Footer , SEO } from '@/components';
import Link from 'next/link';
import templateData from '@/data/api/template.json';
import texts from '@/data/template-page.json';

type Template = typeof templateData.templates[0];

interface TemplateProps {
  template: Template;
}

const TemplatePage: React.FC<TemplateProps> = ({ template }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ImagePrimary = `https://api.farhamaghdasi.ir/backend/${template.thumbnail}`;

  const handleToggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      <SEO 
        title={template.title}
        description={template.description}
        image={ImagePrimary}
        url={`https://farhamaghdasi.ir/template/${template.url}`}
      />

      <Header />
      <header className="serv-hed2 section-padding pb-0">
        <div className="container">
          <div className="caption mb-80">
            <h1 className="fz-80 fw-600">{template.title}</h1>
            <div className="row justify-content-end">
              <div className="col-lg-3 mt-30">
                <p>{texts.category}: <b>{template.category}</b></p>
                <p>{texts.author}: <b>{template.author}</b></p>
              </div>
              <div className="col-lg-5">
                <div className="text mt-30">
                  <p>
                    {template.Shortdescription} <br />
                    {texts.preview} <a href={template.buyLink}>{texts.link}</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="list mt-30">
                  <ul>
                    <li>{template.serviceTitle1}</li>
                    <li>{template.serviceTitle2}</li>
                    <li>{template.serviceTitle3}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="fit-img radius-15 scale">
            <img src={ImagePrimary} alt={template.title} />
          </div>
        </div>
      </header>

      <section className="serv-details section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content" dangerouslySetInnerHTML={{ __html: template.description }} />
            </div>
          </div>

          <div className="row justify-content-center mt-80">
            <div className="col-lg-7">
              <div className="content">
                <h3>{texts.faq_title}</h3>
                <div className="text mt-30 mb-50">
                  <p>{texts.faq_text}</p>
                </div>

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
                        {template.accordionTitle}
                      </button>
                    </h2>
                    <div
                      id="collapse0"
                      className={`accordion-collapse collapse ${activeIndex === 0 ? 'show' : ''}`}
                      aria-labelledby="heading0"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <p>{template.accordionContent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/template/">
                    <div className="crv-butn mt-80 d-flex justify-content-center align-items-center">
                      <span className="text">{texts.more_templates}</span>
                      <span className="icon">
                        <img src="/icons/arrow-top-right.svg" alt="" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = templateData.templates.map(template => ({
    params: { slug: template.url },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const template = templateData.templates.find(t => t.url === slug);

  if (!template) return { notFound: true };

  return {
    props: {
      template,
    },
  };
};

export default TemplatePage;
