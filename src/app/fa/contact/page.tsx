import { Metadata } from 'next';
import { ContactPage } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'تماس با ما | فرهام اقدسی';
  const pageDescription =
    'برای پرسش‌های برنامه‌نویسی، پروژه‌ها یا همکاری با فرهام اقدسی در تماس باشید.';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: 'https://farhamaghdasi.ir/fa/contact/',
      locale: 'fa_IR',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: buildAlternates('/contact/', 'fa'),
  };
}

export default function ContactFa() {
  return <ContactPage />;
}
