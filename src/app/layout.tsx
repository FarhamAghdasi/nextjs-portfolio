import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import '@/assets/css/common_style.css';
import '@/assets/css/font.css';
import '@/assets/css/inner_pages.css';
import '@/assets/css/personal.css';

import localFont from 'next/font/local';

const outfit = localFont({
  src: [
    {
      path: "../assets/fonts/outfit.woff2",
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-outfit',
});

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import PageInitializer from '@/components/PageInitializer';
import {PageTransition} from '@/components';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <PageInitializer />
      </body>
    </html>
  );
}