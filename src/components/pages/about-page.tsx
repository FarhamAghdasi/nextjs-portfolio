'use client';

import React from 'react';
import { Inner, About, Skills } from '@/components';
import { ScrollAnimation } from '@/components';

const AboutPage: React.FC = () => {
  return (
    <>
      <Inner title="About Me" first="Home" secend="About Farham Aghdasi" />
      <ScrollAnimation animationType="fadeInUp" duration={.5} delay={0.2}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation animationType="zoomIn" duration={1} delay={0.4}>
        <Skills />
      </ScrollAnimation>
    </>
  );
};

export default AboutPage;