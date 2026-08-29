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
  const ImagePrimary = template.thumbnail ? template.thumbnail : '/default-image.jpg';

  return (
    <>
      <header className="section-padding pb-[0px]">
        <div className="container">
          <div className="caption mb-[80px]">
            <h1 className="text-[80px] font-semibold max-md:text-[40px]!">{template.title || texts.defaultTitle}</h1>
            <div className="flex flex-wrap justify-end max-[992px]:justify-start">
              <div className="w-full lg:w-3/12 mt-[30px]">
                <p>
                  {texts.category}: <b>{template.category || 'N/A'}</b>
                </p>
                <p>
                  {texts.author}: <b>{template.author || 'Unknown'}</b>
                </p>
              </div>
              <div className="w-full lg:w-5/12">
                <div className="text mt-[30px]">
                  <p>
                    {template.Shortdescription || texts.defaultDescription} <br />
                    {texts.preview}{' '}
                    <a href={template.buyLink || '#'} target="_blank" rel="noopener noreferrer">
                      {texts.link}
                    </a>
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-4/12">
                <div className="list mt-[30px] max-md:[&_ul]:p-0">
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
        <div className="w-full px-4">
          <div className="fit-img radius-15 scale">
            <Image
              src={ImagePrimary}
              alt={template.title || 'Template Image'}
              width={1200}
              height={600}
              style={{ objectFit: 'cover' }}
              unoptimized
              id='primaryimage'
            />
          </div>
        </div>
      </header>

      <section className="section-padding">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-10/12">
              <div className="content" dangerouslySetInnerHTML={{ __html: template.description || '' }} />
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-[80px]">
            <div className="w-full lg:w-7/12">
              <div className="content">
                <h3>{texts.faq_title}</h3>
                <div className="text mt-[30px] mb-[50px]">
                  <p>{texts.faq_text}</p>
                </div>

                <AccordionSection template={template} />

                <div className="text-center">
                  <Link href="/templates">
                    <div className="crv-butn mt-[80px] flex justify-center items-center">
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