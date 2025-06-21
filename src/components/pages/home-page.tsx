'use client';

import React from 'react';
import { Hero, Portfolio, Service, Skills, Posts } from '@/components';
import { ScrollAnimation } from '@/components';

const HomePage: React.FC = () => {
  return (
    <>
      <ScrollAnimation animationType="fadeIn" duration={0.6} delay={0.1}>
        <Hero />
      </ScrollAnimation>
      <ScrollAnimation animationType="fadeInUp" duration={0.6} delay={0.2}>
        <Portfolio />
      </ScrollAnimation>
      <ScrollAnimation animationType="zoomIn" duration={0.6} delay={0.3}>
        <Service />
      </ScrollAnimation>
      <ScrollAnimation animationType="slideLeft" duration={0.6} delay={0.4}>
        <Skills />
      </ScrollAnimation>
      <ScrollAnimation animationType="slideRight" duration={0.6} delay={0.5}>
        <Posts />
      </ScrollAnimation>
    </>
  );
};

export default HomePage;