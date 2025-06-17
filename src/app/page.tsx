import { Metadata } from 'next';
import { HomePage } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Front-end Developer';
  const pageDescription = 'Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions.';
  const pageUrl = 'https://farhamaghdasi.ir/';
  const pageImage = 'https://farhamaghdasi.ir/images/og-image.jpg';

  return {
    ...defaultMetadata,
    title: {
      default: pageTitle,
      template: defaultMetadata.title.template,
    },
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: 'Farham Aghdasi',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function Home() {
  return <HomePage />;
}