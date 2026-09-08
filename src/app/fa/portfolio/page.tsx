import { Metadata } from 'next';
import { WorksPage } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'نمونه‌کارها | فرهام اقدسی';
  const pageDescription = 'مجموعه‌ای از پروژه‌ها و نمونه‌کارهای طراحی و توسعه وب فرهام اقدسی.';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: 'https://farhamaghdasi.ir/fa/portfolio/',
      locale: 'fa_IR',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: buildAlternates('/portfolio/', 'fa'),
  };
}

export default function PortfolioFa() {
  return <WorksPage />;
}
