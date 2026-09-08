import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TemplateDetails } from '@/components';
import templateData from '@/data/fa/api/template.json';
import texts from '@/data/fa/template-page.json';
import { defaultMetadata } from '@/components/addon/seo';
import { TemplateDetails2 } from '@/components/types';
import Head from 'next/head';

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return templateData.templates.map((template: TemplateDetails2) => ({
    slug: template.url,
  }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;

  const template = templateData.templates.find((t: TemplateDetails2) => t.url === slug);

  if (!template) {
    return {
      ...defaultMetadata,
      title: `یافت نشد | ${defaultMetadata.title?.default ?? ''}`,
      description: texts.postNotFound || 'قالب یافت نشد.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = template.title || texts.defaultTitle || 'قالب';
  const pageDescription = stripHtmlTags(template.Shortdescription) || texts.defaultDescription || '';
  const pageUrl = `https://farhamaghdasi.ir/fa/templates/${template.url}/`;
  const pageImage = template.thumbnail
    ? template.thumbnail
    : defaultMetadata.openGraph?.images?.[0]?.url || '';

  return {
    ...defaultMetadata,
    title: `${pageTitle} | فرهام اقدسی`,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: pageImage,
          width: 2100,
          height: 1040,
          alt: template.title || 'تصویر قالب',
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

export default async function Template({ params }: TemplatePageProps) {
  const { slug } = await params;

  const template = templateData.templates.find((t: TemplateDetails2) => t.url === slug);

  if (!template) {
    notFound();
  }

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ImageObject',
        '@id': `https://farhamaghdasi.ir/fa/templates/${slug}/#primaryimage`,
        'inLanguage': 'fa-IR',
        'url': template.thumbnail || '/default-image.jpg',
        'contentUrl': template.thumbnail || '/default-image.jpg',
        'width': '590',
        'height': '300',
        'caption': template.title || 'تصویر قالب',
      },
    ],
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 0,
        'item': {
          '@type': 'WebPage',
          '@id': 'https://farhamaghdasi.ir',
          'url': 'https://farhamaghdasi.ir',
          'name': 'خانه',
        },
      },
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@type': 'WebPage',
          '@id': 'https://farhamaghdasi.ir/fa/templates',
          'url': 'https://farhamaghdasi.ir/fa/templates',
          'name': 'قالب‌ها',
        },
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@type': 'WebPage',
          '@id': `https://farhamaghdasi.ir/fa/templates/${slug}/`,
          'url': `https://farhamaghdasi.ir/fa/templates/${slug}/`,
          'name': template.title || 'قالب',
        },
      },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://farhamaghdasi.ir/fa/templates/${slug}#product`,
    'name': template.title || 'قالب',
    'url': `https://farhamaghdasi.ir/fa/templates/${slug}/`,
    'logo': template.thumbnail || '/default-image.jpg',
    'description': template.Shortdescription || 'توضیحاتی موجود نیست.',
    'sku': template.url || 'unknown-sku',
    'mpn': template.url || 'unknown-mpn',
    'image': [template.thumbnail || '/default-image.jpg'],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'worstRating': 1,
      'bestRating': 5,
      'ratingCount': 1,
      'ratingValue': '5.00',
    },
    'offers': {
      '@type': 'Offer',
      'price': 4050000,
      'priceValidUntil': '2025-06-23',
      'priceCurrency': 'IRR',
      'availability': 'https://schema.org/InStock',
      'url': `https://farhamaghdasi.ir/fa/templates/${slug}/`,
      'priceSpecification': {
        '@type': 'PriceSpecification',
        'priceCurrency': 'IRR',
        'valueAddedTaxIncluded': 'https://schema.org/True',
      },
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </Head>
      <TemplateDetails template={template} />
    </>
  );
}
