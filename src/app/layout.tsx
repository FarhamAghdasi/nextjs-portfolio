'use client';

import '@/assets/css/tailwind.css';

import '@/assets/css/font.css';

import '@/assets/css/blog-tables.css';

import localFont from 'next/font/local';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header, Footer, ScrollAnimation, PageTransition } from '@/components';
import PageInitializer from '@/components/PageInitializer';
import { LocaleProvider, useLocaleContext } from '@/i18n/LocaleProvider';

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

// Persian glyph support — IRANYekan FaNum (local variable font) used for
// RTL pages; Outfit has no Farsi coverage.
const iranyekan = localFont({
  src: [
    {
      path: '../assets/fonts/IRANYekanXVFaNumVF.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/IRANYekanXVFaNumVF.woff',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-iranyekan',
});

function HtmlShell({ children }: { children: ReactNode }) {
  const { locale, dir } = useLocaleContext();

  const pathname = usePathname();
  const shouldAnimateFooter = !(
    pathname === '/template' || pathname.startsWith('/template/')
  );

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${outfit.variable} ${iranyekan.variable} ${dir === 'rtl' ? iranyekan.className : outfit.className}`}
    >
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <HtmlShell>{children}</HtmlShell>
    </LocaleProvider>
  );
}
