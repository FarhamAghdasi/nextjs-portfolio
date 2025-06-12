import React from 'react';
import { Header, Footer, Inner, About, Skills } from '@/components';
import SEO from '@/components/addon/seo';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About"
        description="Learn more about Farham Aghdasi, a software developer specializing in web development and programming."
      />
      <Header />
      <Inner title="About Me" first="Home" secend="About Farham Aghdasi" />
      <About />
      <Skills />
      <Footer />
    </>
  );
};

export default AboutPage;
