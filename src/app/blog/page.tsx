import { Metadata } from 'next';
import { BloginfoClient } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';
import texts from '@/data/en/blog.json';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...defaultMetadata,
    title: 'Blog | Farham Aghdasi',
    description: texts.pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: 'Blog | Farham Aghdasi',
      description: texts.pageDescription,
      url: 'https://farhamaghdasi.ir/blog/',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: 'Blog | Farham Aghdasi',
      description: texts.pageDescription,
    },
    alternates: buildAlternates('/blog/', 'en'),
  };
}

export default function BlogPage() {
  return <BloginfoClient />;
}
