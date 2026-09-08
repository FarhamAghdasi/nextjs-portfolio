import { Metadata } from 'next';
import { HomePage } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export const viewport = {
  themeColor: '#1a73e8',
};

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'فرهام اقدسی | برنامه‌نویس فول‌استک';
  const pageDescription =
    'به وب‌سایت شخصی من خوش آمدید. من فرهام اقدسی هستم، برنامه‌نویسی متخصص در توسعه وب و راه‌حل‌های نرم‌افزاری.';
  const pageUrl = 'https://farhamaghdasi.ir/fa/';
  const pageImage = 'https://farhamaghdasi.ir/assets/imgs/rtl-banner.png';

  return {
    ...defaultMetadata,
    title: {
      default: pageTitle,
      template: `%s | ${pageTitle.split(' | ')[0]}`,
    },
    description: pageDescription,
    keywords: ['فرهام اقدسی', 'برنامه‌نویس فول‌استک', 'توسعه وب', 'React', 'Next.js'],
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      locale: 'fa_IR',
      type: 'website',
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: 'فرهام اقدسی',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: buildAlternates('/', 'fa'),
  };
}

export default function HomeFa() {
  return <HomePage />;
}
