import { Metadata } from 'next';
import { ServicePage } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import servicesText from '@/data/services.json';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = servicesText.seoTitle;
  const pageDescription = servicesText.seoDescription;
  const pageUrl = 'https://farhamaghdasi.ir/services/';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function Services() {
  return <ServicePage />;
}