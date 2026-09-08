import { Metadata } from 'next';
import { BloginfoClient } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'وبلاگ | فرهام اقدسی';
  const pageDescription = 'آخرین مقالات و یادداشت‌های فرهام اقدسی درباره توسعه وب و برنامه‌نویسی.';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: 'https://farhamaghdasi.ir/fa/blog/',
      locale: 'fa_IR',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: buildAlternates('/blog/', 'fa'),
  };
}

export default function BlogFa() {
  return <BloginfoClient />;
}
