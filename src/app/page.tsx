import { useRouter } from 'next/router';
import {  Posts, Skills, Hero, Portfolio, Service ,SEO } from '@/components';
import React from 'react';

const HomePage: React.FC = () => {
  const router = useRouter();
  const currentURL = `https://farhamaghdasi.ir${router.asPath}`;

  return (
    <>
      <SEO 
        title="Front-end Developer"
        description="Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions."
        url={currentURL}
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
