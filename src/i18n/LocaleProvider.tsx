'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import {
  Locale,
  getLocaleFromPathname,
  localizeHref,
} from './config';
import { getDictionary, Dictionary } from './dictionaries';

interface LocaleContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  /** Current path with the locale prefix stripped, e.g. "/about/" */
  pathWithoutLocale: string;
  /** Prefix an internal href with the current locale, e.g. "/about/" -> "/fa/about/" */
  localizeHref: (href: string) => string;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';

  const value = useMemo<LocaleContextValue>(() => {
    const { locale, pathWithoutLocale } = getLocaleFromPathname(pathname);
    return {
      locale,
      dir: locale === 'fa' ? 'rtl' : 'ltr',
      pathWithoutLocale,
      localizeHref: (href: string) => localizeHref(href, locale),
      dictionary: getDictionary(locale),
    };
  }, [pathname]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return ctx;
}

export function useLocale(): Locale {
  return useLocaleContext().locale;
}

export function useDir(): 'ltr' | 'rtl' {
  return useLocaleContext().dir;
}

/** Returns the `common` dictionary strings for the current locale. */
export function useTranslations() {
  return useLocaleContext().dictionary.common;
}

/**
 * Given English and Persian versions of a data object (typically two
 * imported JSON files), pick the one matching the current locale.
 *
 *   const data = useLocalizedData(headerEn, headerFa);
 */
export function useLocalizedData<T>(en: T, fa: T): T {
  const locale = useLocale();
  return locale === 'fa' ? fa : en;
}
