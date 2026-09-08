import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import portfoliosData from '@/data/fa/api/portfolio.json';
import PortfolioInfoClient from '@/components/addon/PortfolioInfoClient';
import { defaultMetadata } from '@/components/addon/seo';
import texts from '@/data/fa/portfolio-details.json';

function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfoliosData.portfolio.map((p) => ({
    slug: p.url,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = portfoliosData.portfolio.find((p) => p.url === slug);

  if (!portfolio) {
    return {
      ...defaultMetadata,
      title: `یافت نشد | ${defaultMetadata.title.default}`,
      description: texts.portfolioNotFound,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const imagePrimary = portfolio.thumbnail
    ? `https://farhamaghdasi.ir/assets/imgs/uploads/${portfolio.thumbnail}`
    : '/default-thumbnail.jpg';
  const pageUrl = `https://farhamaghdasi.ir/fa/portfolio/${portfolio.url}/`;
  const pageTitle = portfolio.title || texts.seoDefaultTitle;
  const pageDescription = stripHtmlTags(portfolio.Shortdescription) || texts.seoDefaultDescription;

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
          url: imagePrimary,
          width: 1200,
          height: 630,
          alt: portfolio.title || 'تصویر نمونه‌کار',
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

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = portfoliosData.portfolio.find((p) => p.url === slug);

  if (!portfolio) {
    notFound();
  }

  return <PortfolioInfoClient portfolio={portfolio} />;
}
