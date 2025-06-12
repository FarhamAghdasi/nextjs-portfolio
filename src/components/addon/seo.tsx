// components/SEO.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import metaDefaults from '@/data/meta.json';
import { useMemo } from 'react';
import { SEOProps } from '../types'

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  type = 'website',
  noIndex = false,
}) => {
  const router = useRouter();

  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : metaDefaults.defaultUrl + router.asPath);

  const metaDescription = description || metaDefaults.defaultDescription;

  const date = new Date();
  const Time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const schemaData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebSite",
    "name": metaDefaults.defaultSiteName,
    "url": metaDefaults.defaultUrl,
    "sameAs": [
      metaDefaults.defaultUrl,
      "https://github.com/FarhamAghdasi/"
    ],
    "description": metaDescription,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": `${metaDefaults.defaultSiteName} | Junior Front-End Developer`
    },
    "mainEntityOfPage": canonicalUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.google.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "foundingDate": Time,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "info@farhamaghdasi.ir",
      "availableLanguage": ["English"]
    }
  }), [metaDescription, image, canonicalUrl, Time, type]);

  return (
    <Head>
      <title>{title} | {metaDefaults.defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={metaDefaults.defaultAuthor} />
      <meta property="og:title" content={`${title} | ${metaDefaults.defaultTitle}`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={metaDefaults.defaultSiteName} />

      <meta name="twitter:title" content={`${title} | ${metaDefaults.defaultTitle}`} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:site" content={metaDefaults.defaultTwitterSite} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      <script
        type="application/ld+json"
        // @ts-ignore
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
};

export default SEO;
