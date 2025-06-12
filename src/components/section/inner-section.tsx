'use client';

import React from 'react';
import Link from 'next/link';
import smokeBg from '@/assets/imgs/smoke-bg.jpg';

import { InnerProps } from '@/components/types';


const Inner: React.FC<InnerProps> = ({ title, first, secend, paragraph, links, contact, cpage, noimage }) => {
  return (
    <header className="header-pg">
      <div className="container">
        <div className="text-center">
          <div className="caption mb-100">
            <h1>{title}</h1>
            <h6>
              ( <Link href="/">{first}</Link> - <span>{secend}</span> )
            </h6>

            {paragraph && links && (
              <p>
                {paragraph} <Link href="/templates/">{links}</Link>
              </p>
            )}

            {cpage && <div>{cpage}</div>}
          </div>
        </div>
      </div>

      {contact ? (
        <div className="google-map">
          <iframe
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=hollywood&t=&z=11&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      ) : !noimage ? (
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${smokeBg.src})` }}
        />
      ) : null}
    </header>
  );
};

export default Inner;
