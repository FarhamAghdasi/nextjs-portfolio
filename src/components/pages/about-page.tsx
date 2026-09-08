'use client';

import React from 'react';
import { Inner, About, Skills } from '@/components';
import { ScrollAnimation } from '@/components';
import { useLocale } from '@/i18n/LocaleProvider';

const AboutPage: React.FC = () => {
  const locale = useLocale();
  const t = locale === 'fa'
    ? { title: 'درباره من', home: 'خانه', about: 'درباره فرهام اقدسی' }
    : { title: 'About Me', home: 'Home', about: 'About Farham Aghdasi' };
  return (
    <>
      <Inner title={t.title} first={t.home} secend={t.about} />
      <ScrollAnimation animationType="fadeInUp" duration={0.5} delay={0.1}>
        <About />
      </ScrollAnimation>

      <ScrollAnimation animationType="zoomIn" duration={0.8} delay={0.2}>
        <Skills />
      </ScrollAnimation>
    </>
  );
};

export default AboutPage;