'use client';

import React from 'react';
import Link from 'next/link';
import { Inner } from '@/components';
import errorTexts from '@/data/errors.json';

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  const message = (errorTexts as Record<string, string>)[String(statusCode)] || errorTexts.default;

  return (
    <>
      <Inner
        title={String(statusCode)}
        first="Home"
        secend={`Error ${statusCode}`}
        cpage={
          <p className='error-page'>
            {message} <br />
            <Link href="/">
              Back to Home
            </Link>{' '}
            or{' '}
          </p>
        }
        noimage
      />
    </>
  );
}