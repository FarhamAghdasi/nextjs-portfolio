// ❌ بدون use client (حذفش کن)

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import '@/assets/css/common_style.css';
import '@/assets/css/font.css';
import '@/assets/css/inner_pages.css';
import '@/assets/css/personal.css';

import { ReactNode } from 'react';
import { Header, Footer } from '@/components';
import PageInitializer from '@/components/PageInitializer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <PageInitializer /> {/* ✅ فقط در کلاینت اجرا میشه */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
