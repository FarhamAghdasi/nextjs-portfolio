'use client';

import { useEffect } from 'react';

export default function PageInitializer() {
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

    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return null;
}
