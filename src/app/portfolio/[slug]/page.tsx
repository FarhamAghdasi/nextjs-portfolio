import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import portfoliosData from '@/data/api/portfolio.json';
import PortfolioInfoClient from '@/components/addon/PortfolioInfoClient';
import { defaultMetadata } from '@/components/addon/seo';
import texts from '@/data/portfolio-details.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return portfoliosData.portfolio.map((p) => ({
    slug: p.url,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const portfolio = portfoliosData.portfolio.find((p) => p.url === params.slug);

  if (!portfolio) {
    return {
      ...defaultMetadata,
      title: `Not Found | ${defaultMetadata.title.default}`,
      description: texts.portfolioNotFound,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const imagePrimary = `https://farhamaghdasi.ir/${portfolio.thumbnail}` || '/default-thumbnail.jpg';
  const pageUrl = `https://farhamaghdasi.ir/portfolio/${portfolio.url}`;
  const pageTitle = portfolio.title || texts.seoDefaultTitle;
  const pageDescription = portfolio.description || texts.seoDefaultDescription;

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
          url: imagePrimary,
          width: 1200,
          height: 630,
          alt: portfolio.title || 'Portfolio Image',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [imagePrimary],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function PortfolioPage({ params }: PageProps) {
  const portfolio = portfoliosData.portfolio.find((p) => p.url === params.slug);

  if (!portfolio) {
    notFound();
  }

  return <PortfolioInfoClient portfolio={portfolio} />;
}