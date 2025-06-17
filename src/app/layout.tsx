import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import '@/assets/css/common_style.css';
import '@/assets/css/font.css';
import '@/assets/css/inner_pages.css';
import '@/assets/css/personal.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Header, Footer } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import PageInitializer from '@/components/PageInitializer';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <PageInitializer /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}
