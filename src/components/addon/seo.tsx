import Head from 'next/head';
import { useMemo } from 'react';
import metaDefaults from '@/data/meta.json';
import { SEOProps } from '../types';

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  noIndex = false,
}) => {
  const canonicalUrl = url || metaDefaults.defaultUrl;
  const metaDescription = description || metaDefaults.defaultDescription;
  const metaTitle = `${title} | ${metaDefaults.defaultTitle}`;

  const formattedDate = new Date().toISOString().split('T')[0];

  const schemaData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      'name': metaDefaults.defaultSiteName,
      'url': canonicalUrl,
      'sameAs': [metaDefaults.defaultUrl, 'https://github.com/FarhamAghdasi/'],
      'description': metaDescription,
      ...(image && { 'image': image }),
      'publisher': {
        '@type': 'Organization',
        'name': `${metaDefaults.defaultSiteName} | Junior Front-End Developer`,
      },
      'mainEntityOfPage': canonicalUrl,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://www.google.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
      'foundingDate': formattedDate,
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Support',
        'email': 'info@farhamaghdasi.ir',
        'availableLanguage': ['English'],
      },
    }),
    [metaDescription, image, canonicalUrl, formattedDate, type]
  );

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={metaDefaults.defaultAuthor} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={metaDefaults.defaultSiteName} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:site" content={metaDefaults.defaultTwitterSite} />
      {image && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={image} />
        </>
      )}

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Head>
  );
};

export default SEO;