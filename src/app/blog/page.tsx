import { Metadata } from 'next';
import { BloginfoClient } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import texts from '@/data/blog.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: 'Blog | Farham Aghdasi',
    description: texts.pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: 'Blog | Farham Aghdasi',
      description: texts.pageDescription,
      url: 'https://farhamaghdasi.ir/blog',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: 'Blog | Farham Aghdasi',
      description: texts.pageDescription,
    },
    alternates: {
      canonical: 'https://farhamaghdasi.ir/blog',
    },
  };
}

export default function BlogPage() {
  return <BloginfoClient />;
}
