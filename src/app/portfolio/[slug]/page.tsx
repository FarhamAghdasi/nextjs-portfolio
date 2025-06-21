import { Metadata } from 'next';
import {WorksPage} from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import texts from '@/data/portfolio-page.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: texts.seoTitle,
    description: texts.seoDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: texts.seoTitle,
      description: texts.seoDescription,
      url: 'https://farhamaghdasi.ir/portfolio',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: texts.seoTitle,
      description: texts.seoDescription,
    },
    alternates: {
      canonical: 'https://farhamaghdasi.ir/portfolio',
    },
  };
}

export default function PortfolioPage() {
  return <WorksPage />;
}