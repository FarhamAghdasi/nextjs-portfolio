import { Metadata } from 'next';
import {AboutPage} from '@/components';
import { defaultMetadata } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'About | Farham Aghdasi';
  const pageDescription = 'Learn more about Farham Aghdasi, a software developer specializing in web development and programming.';
  const pageUrl = 'https://farhamaghdasi.ir/about/';

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

export default function About() {
  return <AboutPage />;
}