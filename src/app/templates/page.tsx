import { Metadata } from 'next';
import { HtmlTemplates } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'HTML Templates | Farham Aghdasi';
  const pageDescription = 'Explore a collection of professional HTML templates designed by Farham Aghdasi.';
  const pageUrl = 'https://farhamaghdasi.ir/templates';

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

export default function TemplatesPage() {
  return <HtmlTemplates />;
}