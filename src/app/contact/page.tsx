import { Metadata } from 'next';
import {ContactPage} from '@/components';
import { defaultMetadata } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Contact Us';
  const pageDescription = 'Get in touch with Farham Aghdasi for programming inquiries, projects, or collaborations..';
  const pageUrl = 'https://farhamaghdasi.ir/contact';

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
  return <ContactPage />;
}