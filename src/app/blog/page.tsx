import { Metadata } from 'next';
import {Bloginfo} from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import texts from '@/data/blog.json';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Blog';
  const pageDescription = texts.pageDescription;
  const pageUrl = 'https://farhamaghdasi.ir/blog';

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

export default function BlogPage() {
  return <Bloginfo />;
}