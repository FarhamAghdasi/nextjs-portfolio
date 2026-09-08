'use client';

import React, { useRef } from 'react';
import Link from '@/i18n/LocaleLink';
import { useLocalizedData } from '@/i18n/LocaleProvider';
import footerDataEn from '@/data/en/footer.json';
import footerDataFa from '@/data/fa/footer.json';
import { TextSplitter } from '@/components';

const Footer: React.FC = () => {
  const footerData = useLocalizedData(footerDataEn, footerDataFa);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  return (
    <footer>
      <div className="container mx-auto px-4">
        <div className="top-content text-center">
          <h2 className="whitespace-nowrap">
            <Link href="/contact/" className="transition-all duration-500 ease-in-out hover:my-6">
              <TextSplitter
                text={footerData.cta}
                animationType="fadeInUp"
                duration={0.4}
                stagger={0.02}
                delay={0.1}
                split="char"
                scrollTrigger
                triggerStart="top 85%"
              />
            </Link>
          </h2>
          <h6
            className="float_txt js-title max-md:text-[40px] max-md:-mt-2 font-iranyekan"
            ref={subtitleRef}
          >
            {footerData.subtitle}
          </h6>
        </div>

        <div className="main-content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
            <div className="lg:col-span-5">
              <div className="text">
                <p
                  className="js-splittext-lines"
                  dangerouslySetInnerHTML={{ __html: footerData.description }}
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <a
                href={`tel:${footerData.phoneNumber.replace(/\s+/g, '')}`}
                dir="ltr"
                className="contact-number text-[60px] max-md:text-[35px]! max-md:mt-[10px]"
              >
                {footerData.phoneNumber}
              </a>

              <ul className="text-[18px] mt-[30px] rest">
                <li className="mb-[15px]">
                  <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
                </li>
              </ul>

              <div className="social-icons">
                {footerData.socials.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
