import { Metadata } from 'next';
import {WorksPage} from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';
import texts from '@/data/en/portfolio-page.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: "My Works | Farham Aghdasi",
    description: texts.seoDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: texts.seoTitle,
      description: texts.seoDescription,
      url: 'https://farhamaghdasi.ir/portfolio/',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: texts.seoTitle,
      description: texts.seoDescription,
    },
    alternates: buildAlternates('/portfolio/', 'en'),
  };
}

export default function PortfolioPage() {
  return <WorksPage />;
}