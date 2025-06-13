import {  Posts, Skills, Hero, Portfolio, Service ,SEO } from '@/components';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Front-end Developer"
        description="Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions."
        url="https://farhamaghdasi.ir/"
      />
      
      <Hero />
      <Portfolio />
      <Service />
      <Skills />
      <Posts />
    </>
  );
};

export default HomePage;
