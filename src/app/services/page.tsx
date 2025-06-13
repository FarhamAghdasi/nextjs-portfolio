// pages/services.tsx
import React from 'react';
import {  Inner, Bio, ServiceLine, Faq, SEO } from '@/components';
import servicesText from '@/data/services.json';

const ServicesPage: React.FC = () => {
  return (
    <>
      <SEO 
        title={servicesText.seoTitle}
        description={servicesText.seoDescription}
        url="https://farhamaghdasi.ir/services"
      />

      <Inner 
        title={servicesText.innerTitle} 
        first={servicesText.innerFirst} 
        secend={servicesText.innerSecond} 
      />
      <Bio />
      <ServiceLine />
      <Faq />
    </>
  );
};

export default ServicesPage;
