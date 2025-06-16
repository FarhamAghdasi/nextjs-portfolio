"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'animate.css';

import '@/assets/css/common_style.css';
import '@/assets/css/font.css';
import '@/assets/css/inner_pages.css';
import '@/assets/css/personal.css';
import { ReactNode, useEffect } from 'react';
import { Header, Footer, SmoothScroll } from '@/components';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {

    // Background Image
    const pageSections = document.querySelectorAll('.bg-img, section');
    pageSections.forEach((section) => {
      const background = section.getAttribute('data-background');
      if (background) {
        (section as HTMLElement).style.backgroundImage = `url(${background})`;
      }
    });

    // Background Color
    const pageSectionsColor = document.querySelectorAll('.bg-solid-color, section');
    pageSectionsColor.forEach((section) => {
      const color = section.getAttribute('data-solid-color');
      if (color) {
        (section as HTMLElement).style.backgroundColor = color;
      }
    });

    window.scrollTo(0, 0);
  }, []);

  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
