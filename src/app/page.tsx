import { Metadata } from 'next';
import { HomePage } from '@/components';
import { defaultMetadata } from '@/components/addon/seo';
import Head from 'next/head';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Farham Aghdasi | Front-end Developer';
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
    keywords: ['Farham Aghdasi', 'Front-end Developer', 'Web Development', 'Software Solutions', 'Programmer', 'React', 'Next.js'],
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    themeColor: '#1a73e8',
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      locale: 'en_US',
      type: 'website',
      siteName: 'Farham Aghdasi',
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
      card: 'summary_large_image',
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://farhamaghdasi.ir/#organization',
    'url': 'https://farhamaghdasi.ir/',
    'name': 'Farham Aghdasi',
    '@language': 'en-US',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://farhamaghdasi.ir/images/logo.png',
      'width': 160,
      'height': 48,
    },
    'description': 'Farham Aghdasi is a Front-end Developer specializing in web development and software solutions, with expertise in React, Next.js, and modern JavaScript frameworks.',
    'foundingDate': '2020',
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'email': 'info@farhamaghdasi.ir',
        'contactType': 'customer service',
      },
    ],
    'sameAs': [
      'https://www.linkedin.com/in/farham-aghdasi/',
      'https://github.com/farham-aghdasi',
      'https://twitter.com/farhamaghdasi',
      'https://instagram.com/farhamaghdasi',
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://farhamaghdasi.ir/#webpage',
    'url': 'https://farhamaghdasi.ir/',
    'name': 'Farham Aghdasi | Front-end Developer',
    '@language': 'en-US',
    'description': 'Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions.',
    'isPartOf': {
      '@type': 'WebSite',
      '@id': 'https://farhamaghdasi.ir/#website',
      'url': 'https://farhamaghdasi.ir/',
      'name': 'Farham Aghdasi',
      'publisher': {
        '@type': 'Organization',
        '@id': 'https://farhamaghdasi.ir/#organization',
        'name': 'Farham Aghdasi',
      },
    },
    'about': {
      '@type': 'Organization',
      '@id': 'https://farhamaghdasi.ir/#organization',
      'name': 'Farham Aghdasi',
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://farhamaghdasi.ir/search?q={search_term_string}',
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        'valueRequired': 'http://schema.org/True',
        'valueName': 'search_term_string',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://farhamaghdasi.ir/#breadcrumb',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://farhamaghdasi.ir/',
      },
    ],
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <HomePage />
    </>
  );
}