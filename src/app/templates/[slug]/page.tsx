"use client"
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { SEO , AccordionSection } from '@/components';
import templateData from '@/data/api/template.json';
import texts from '@/data/template-page.json';

type Template = typeof templateData.templates[0];

interface TemplateProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return templateData.templates.map(template => ({
    slug: template.url,
  }));
}

export default async function TemplatePage({ params }: TemplateProps) {
  const template = templateData.templates.find(t => t.url === params.slug);

  if (!template) {
    notFound();
  }

  const ImagePrimary = `https://farhamaghdasi.ir/uploads/${template.thumbnail}`;

  return (
    <>
      <SEO 
        title={template.title}
        description={template.description}
        image={ImagePrimary}
        url={`https://farhamaghdasi.ir/template/${template.url}`}
      />

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
            <Image
              src={ImagePrimary}
              alt={template.title}
              width={1200}
              height={600}
              style={{ objectFit: 'cover' }}
            />
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

                <AccordionSection template={template} />

                <div className="text-center">
                  <Link href="/templates">
                    <div className="crv-butn mt-80 d-flex justify-content-center align-items-center">
                      <span className="text">{texts.more_templates}</span>
                      <span className="icon">
                        <Image
                          src="/icons/arrow-top-right.svg"
                          alt="Arrow"
                          width={20}
                          height={20}
                        />
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
}