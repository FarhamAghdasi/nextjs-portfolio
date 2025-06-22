'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import '@/assets/css/common_style.css';
import '@/assets/css/font.css';
import '@/assets/css/inner_pages.css';
import '@/assets/css/personal.css';

import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header, Footer, ScrollAnimation, PageTransition } from '@/components';
import PageInitializer from '@/components/PageInitializer';

const outfit = localFont({
  src: [
    {
      path: '../assets/fonts/outfit.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-outfit',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const shouldAnimateFooter = !(pathname === '/template');

  return (
    <html lang="en" className={outfit.className}>
      <body>
        <Header />
        <PageTransition>{children}</PageTransition>

        {shouldAnimateFooter ? (
          <ScrollAnimation animationType="fadeInUp" duration={0.5} delay={0.3}>
            <Footer />
          </ScrollAnimation>
        ) : (
          <Footer />
        )}

        <PageInitializer />
      </body>
    </html>
  );
}
