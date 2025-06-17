"use client"
import { Metadata } from 'next';
import { ErrorPage } from '@/components';
import errorTexts from '@/data/errors.json';
import { defaultMetadata } from '@/components/addon/seo';

interface ErrorPageProps {
  error: Error & { statusCode?: number };
  reset: () => void;
}

export async function generateMetadata({ error }: { error: Error & { statusCode?: number } }): Promise<Metadata> {
  const statusCode = error.statusCode || 500;
  const message = (errorTexts as Record<string, string>)[String(statusCode)] || errorTexts.default;

  return {
    ...defaultMetadata,
    title: `Error ${statusCode} | ${defaultMetadata.title.default}`,
    description: message,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `Error ${statusCode}`,
      description: message,
      url: 'https://farhamaghdasi.ir/error',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `Error ${statusCode}`,
      description: message,
    },
  };
}

export default function Error({ error, reset }: ErrorPageProps) {
  const statusCode = error.statusCode || 500;

  return <ErrorPage statusCode={statusCode} reset={reset} />;
}