'use client';

import React from 'react';
import { Hero, Portfolio, Service, Skills, Posts } from '@/components';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Portfolio />
      <Service />
      <Skills />
      <Posts />
    </>
  );
};

export default HomePage;