import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TemplateDetails } from '@/components';
import templateData from '@/data/api/template.json';
import texts from '@/data/template-page.json';
import { defaultMetadata } from '@/components/addon/seo';
import { TemplateDetails2 } from '@/components/types';

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

interface TemplatePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return templateData.templates.map((template: TemplateDetails2) => ({
    slug: template.url,
  }));
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const template = templateData.templates.find((t: TemplateDetails2) => t.url === params.slug);

  if (!template) {
    return {
      ...defaultMetadata,
      title: `Not Found | ${defaultMetadata.title.default}`,
      description: texts.postNotFound || 'Template not found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = template.title || texts.defaultTitle;
  const pageDescription = stripHtmlTags(template.Shortdescription) || texts.defaultDescription;
  const pageUrl = `https://farhamaghdasi.ir/templates/${template.url}`;
  const pageImage = `https://farhamaghdasi.ir/${template.thumbnail}` || defaultMetadata.openGraph.images[0].url;

  return {
    ...defaultMetadata,
    title: pageTitle,
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
          alt: template.title || 'Template Image',
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

export default function Template({ params }: TemplatePageProps) {
  const template = templateData.templates.find((t: TemplateDetails2) => t.url === params.slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetails template={template} />;
}