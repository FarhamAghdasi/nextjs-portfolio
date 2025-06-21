'use client';

import React from 'react';
import { Inner, Bio, ServiceLine, Faq , ScrollAnimation} from '@/components';
import servicesText from '@/data/services.json';

const ServicesPage: React.FC = () => {
  return (
    <>
      <Inner
        title={servicesText.innerTitle}
        first={servicesText.innerFirst}
        secend={servicesText.innerSecond}
      />
      <ScrollAnimation animationType="fadeInUp" duration={0.6} delay={0.1}>
        <Bio />
      </ScrollAnimation>
      <ScrollAnimation animationType="zoomIn" duration={0.6} delay={0.2}>
        <ServiceLine />
      </ScrollAnimation>
      <ScrollAnimation animationType="slideRight" duration={0.6} delay={0.3}>
        <Faq />
      </ScrollAnimation>
    </>
  );
};

export default ServicesPage;