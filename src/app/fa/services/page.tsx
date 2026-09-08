import { Metadata } from 'next';
import { ServicePage } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'خدمات | فرهام اقدسی';
  const pageDescription =
    'خدمات توسعه وب و نرم‌افزار ارائه‌شده توسط فرهام اقدسی، شامل طراحی و برنامه‌نویسی سایت.';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: 'https://farhamaghdasi.ir/fa/services/',
      locale: 'fa_IR',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: buildAlternates('/services/', 'fa'),
  };
}

export default function ServicesFa() {
  return <ServicePage />;
}
