'use client';

import React from 'react';
import { Inner, Contact , ScrollAnimation } from '@/components';
import { useLocale } from '@/i18n/LocaleProvider';

const AboutPage: React.FC = () => {
  const locale = useLocale();
  const t = locale === 'fa'
    ? { title: 'در تماس باشید', home: 'خانه', contact: 'تماس با ما' }
    : { title: 'Get In Touch', home: 'Home', contact: 'Contact' };
  return (
    <>
      <Inner title={t.title} first={t.home} secend={t.contact} contact={true} />
      <ScrollAnimation animationType="fadeInUp" duration={0.6} delay={0.2}>
        <Contact />
      </ScrollAnimation>
    </>
  );
};

export default AboutPage;