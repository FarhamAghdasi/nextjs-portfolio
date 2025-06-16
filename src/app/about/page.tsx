"use client"
import React from 'react';
import {  Inner, About, Skills } from '@/components';
import SEO from '@/components/addon/seo';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About"
        description="Learn more about Farham Aghdasi, a software developer specializing in web development and programming."
      />
      <Inner title="About Me" first="Home" secend="About Farham Aghdasi" />
      <About />
      <Skills />
    </>
  );
};

export default AboutPage;
