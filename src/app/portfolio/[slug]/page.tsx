import { notFound } from 'next/navigation';
import portfoliosData from '@/data/api/portfolio.json';
import {PortfolioInfoClient} from '@/components';

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

export default function PortfolioPage({ params }: PageProps) {
  const portfolio = portfoliosData.portfolio.find((p) => p.url === params.slug);

  if (!portfolio) {
    notFound();
  }

  return <PortfolioInfoClient portfolio={portfolio} />;
}