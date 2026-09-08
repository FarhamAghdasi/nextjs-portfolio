import { Metadata } from 'next';
import { AboutPage } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'درباره من | فرهام اقدسی';
  const pageDescription =
    'با فرهام اقدسی بیشتر آشنا شوید؛ یک برنامه‌نویس نرم‌افزار متخصص در توسعه وب و برنامه‌نویسی.';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: 'https://farhamaghdasi.ir/fa/about/',
      locale: 'fa_IR',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: buildAlternates('/about/', 'fa'),
  };
}

export default function AboutFa() {
  return <AboutPage />;
}
