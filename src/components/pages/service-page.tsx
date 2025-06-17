'use client';

import React from 'react';
import { Inner, Bio, ServiceLine, Faq } from '@/components';
import servicesText from '@/data/services.json';

const ServicesPage: React.FC = () => {
  return (
    <>
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