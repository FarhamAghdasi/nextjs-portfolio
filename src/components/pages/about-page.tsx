'use client';

import React from 'react';
import { Inner, About, Skills } from '@/components';

const AboutPage: React.FC = () => {
  return (
    <>
      <Inner title="About Me" first="Home" secend="About Farham Aghdasi" />
      <About />
      <Skills />
    </>
  );
};

export default AboutPage;