'use client';

import React from 'react';
import Link from 'next/link';
import { useLocaleContext } from './LocaleProvider';
import { localizeHref } from './config';

/**
 * Renders EN / FA toggle links. Each link points to the equivalent
 * page in the other locale (same pathWithoutLocale), so switching
 * language keeps the user on the same page.
 */
export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, pathWithoutLocale } = useLocaleContext();

  return (
    <div className={`lang-switcher ${className}`} aria-label="Language switcher">
      <Link
        href={localizeHref(pathWithoutLocale, 'en')}
        className={locale === 'en' ? 'is-active' : ''}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
      <span aria-hidden="true"> / </span>
      <Link
        href={localizeHref(pathWithoutLocale, 'fa')}
        className={locale === 'fa' ? 'is-active' : ''}
        aria-current={locale === 'fa' ? 'true' : undefined}
      >
        FA
      </Link>
    </div>
  );
}
