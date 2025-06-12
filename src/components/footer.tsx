'use client';

import React from 'react';
import Link from 'next/link';
import footerData from '@/data/footer.json';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="top-content text-center">
          <h2>
            <Link href="/contact/" className="underline">
              {footerData.cta}
            </Link>
          </h2>
          <h6 className="float_txt js-title">{footerData.subtitle}</h6>
        </div>

        <div className="main-content">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="text">
                <p
                  className="js-splittext-lines"
                  dangerouslySetInnerHTML={{ __html: footerData.description }}
                />
              </div>
            </div>

            <div className="col-lg-7">
              <a href={`tel:${footerData.phoneNumber.replace(/\s+/g, '')}`} className="contact-number fz-60">
                {footerData.phoneNumber}
              </a>

              <ul className="fz-18 mt-30 rest">
                <li className="mb-15">
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
