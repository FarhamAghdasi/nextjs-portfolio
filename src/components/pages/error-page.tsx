'use client';

import React from 'react';
import Link from 'next/link';
import { Header, Footer, Inner } from '@/components';
import errorTexts from '@/data/errors.json';

interface ErrorPageProps {
  statusCode: number;
  reset: () => void;
}

export default function ErrorPage({ statusCode, reset }: ErrorPageProps) {
  const message = (errorTexts as Record<string, string>)[String(statusCode)] || errorTexts.default;

  return (
    <>
      <Header />
      <Inner
        title={String(statusCode)}
        first="Home"
        secend={`Error ${statusCode}`}
        cpage={
          <p>
            {message} <br />
            <Link href="/" className="underline text-blue-500">
              Back to Home
            </Link>{' '}
            or{' '}
            <button onClick={reset} className="underline text-blue-500">
              Try Again
            </button>
          </p>
        }
        noimage
      />
      <Footer />
    </>
  );
}