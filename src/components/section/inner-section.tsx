'use client';

import React from 'react';
import Link from 'next/link';
const smokeBg = '/assets/imgs/smoke-bg.jpg';
import { ParticleCanvas } from '@/components'

import { InnerProps } from '@/components/types';
import { TextSplitter } from '@/components';


const Inner: React.FC<InnerProps> = ({ title, first, secend, paragraph, links, contact, cpage, noimage }) => {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <ParticleCanvas />
      <header className="pt-[120px]">
        <div className="container">
          <div className="text-center">
             <div className="caption mb-[50px]">
               <h1 className="text-[110px] mb-[15px] max-md:text-[60px]">
                 <TextSplitter
                   text={title}
                   animationType="fadeInUp"
                   duration={0.4}
                   stagger={0.02}
                   delay={0.1}
                   split="char"
                   scrollTrigger
                   triggerStart="top 85%"
                 />
               </h1>
               <h6 className="text-base font-normal uppercase tracking-[1px]">
                ( <Link href="/" className="px-[5px]">{first}</Link> - <span className="px-[5px] text-main">{secend}</span> )
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
          <div className="relative h-[540px] w-full grayscale rounded-[15px] overflow-hidden">
            <iframe
              id="gmap_canvas"
              className="absolute inset-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2159.8977309932147!2d52.349218173573426!3d36.4535717972231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8fbd12fbf1d8c9%3A0x92ce3372fb40c254!2z2YXYrNiq2YXYuSDYp9mE2YXYp9iz!5e1!3m2!1sen!2s!4v1750163834917!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ) : !noimage ? (
          <div
            className=""
            style={{ backgroundImage: `url(${smokeBg})` }}
          />
        ) : null}
      </header>
    </div>
  );
};

export default Inner;
