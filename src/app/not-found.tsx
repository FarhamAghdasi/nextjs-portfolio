"use client";

import { Metadata } from 'next';
import { ErrorPage } from '@/components';
import errorTexts from '@/data/errors.json';
import { defaultMetadata } from '@/components/addon/seo';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: `404 | ${defaultMetadata.title.default}`,
  description: errorTexts["404"] || errorTexts.default,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "404 Not Found",
    description: errorTexts["404"] || errorTexts.default,
    url: 'https://farhamaghdasi.ir/404',
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: "404 Not Found",
    description: errorTexts["404"] || errorTexts.default,
  },
};

export default function NotFound() {
  return <ErrorPage statusCode={404} reset={() => window.location.href = "/"} />;
}
