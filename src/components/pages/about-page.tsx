'use client';

import React from 'react';
import { Inner, About, Skills } from '@/components';
import { ScrollAnimation } from '@/components';

const AboutPage: React.FC = () => {
  return (
    <>
      <Inner title="About Me" first="Home" secend="About Farham Aghdasi" />
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