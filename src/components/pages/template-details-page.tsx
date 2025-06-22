'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AccordionSection } from '@/components';
import texts from '@/data/template-page.json';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import { TemplateDetails2 } from '@/components/types';

interface TemplatePageProps {
  template: TemplateDetails2;
}

export default function TemplatePage({ template }: TemplatePageProps) {
  const ImagePrimary = template.thumbnail ? `/assets/imgs/uploads/${template.thumbnail}` : '/default-image.jpg';

  return (
    <>
      <header className="serv-hed2 section-padding pb-0">
        <div className="container">
          <div className="caption mb-80">
            <h1 className="fz-80 fw-600">{template.title || texts.defaultTitle}</h1>
            <div className="row justify-content-end">
              <div className="col-lg-3 mt-30">
                <p>
                  {texts.category}: <b>{template.category || 'N/A'}</b>
                </p>
                <p>
                  {texts.author}: <b>{template.author || 'Unknown'}</b>
                </p>
              </div>
              <div className="col-lg-5">
                <div className="text mt-30">
                  <p>
                    {template.Shortdescription || texts.defaultDescription} <br />
                    {texts.preview}{' '}
                    <a href={template.buyLink || '#'} target="_blank" rel="noopener noreferrer">
                      {texts.link}
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="list mt-30">
                  <ul>
                    <li>{template.serviceTitle1 || 'Service 1'}</li>
                    <li>{template.serviceTitle2 || 'Service 2'}</li>
                    <li>{template.serviceTitle3 || 'Service 3'}</li>
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
              alt={template.title || 'Template Image'}
              width={1200}
              height={600}
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
        </div>
      </header>

      <section className="serv-details section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="content" dangerouslySetInnerHTML={{ __html: template.description || '' }} />
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
                        <Image src={arrowTopRight} alt="Arrow" width={20} height={20} unoptimized />
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