'use client';

import React from 'react';
import Link from '@/i18n/LocaleLink';
import { Inner } from '@/components';
import errorTextsEn from '@/data/en/errors.json';
import errorTextsFa from '@/data/fa/errors.json';
import { useLocale, useLocalizedData } from '@/i18n/LocaleProvider';

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  const locale = useLocale();
  const errorTexts = useLocalizedData(errorTextsEn, errorTextsFa);
  const message = (errorTexts as Record<string, string>)[String(statusCode)] || errorTexts.default;
  const t = locale === 'fa'
    ? { home: 'خانه', error: 'خطا', backToHome: 'بازگشت به خانه', or: 'یا' }
    : { home: 'Home', error: 'Error', backToHome: 'Back to Home', or: 'or' };

  return (
    <>
      <Inner
        title={String(statusCode)}
        first={t.home}
        secend={`${t.error} ${statusCode}`}
        cpage={
          <p className='error-page'>
            {message} <br />
            <Link href="/">
              {t.backToHome}
            </Link>{' '}
            {t.or}{' '}
          </p>
        }
        noimage
      />
    </>
  );
}