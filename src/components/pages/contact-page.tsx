'use client';

import React from 'react';
import { Inner, Contact , ScrollAnimation } from '@/components';

const AboutPage: React.FC = () => {
  return (
    <>
      <Inner title="Get In Touch" first="Home" secend="Contact" contact={true} />
      <ScrollAnimation animationType="fadeInUp" duration={0.6} delay={0.2}>
        <Contact />
      </ScrollAnimation>
    </>
  );
};

export default AboutPage;