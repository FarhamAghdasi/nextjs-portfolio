'use client';

import React from 'react';
import { Inner, Bio, ServiceLine, Faq , ScrollAnimation} from '@/components';
import servicesTextEn from '@/data/en/services.json';
import servicesTextFa from '@/data/fa/services.json';
import { useLocalizedData } from '@/i18n/LocaleProvider';

const ServicesPage: React.FC = () => {
  const servicesText = useLocalizedData(servicesTextEn, servicesTextFa);
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