'use client';

import React from 'react';
import { Inner, Contact } from '@/components';

const AboutPage: React.FC = () => {
  return (
    <>
      <Inner title="Get In Touch" first="Home" secend="Contact" contact={true}/>
      <Contact />
    </>
  );
};

export default AboutPage;