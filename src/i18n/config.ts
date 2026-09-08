export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Only non-default locales get a URL prefix (e.g. "/fa"). The default
// locale ("en") is served at the root with no prefix.
export const localePrefixes: Record<Locale, string> = {
  en: '',
  fa: '/fa',
};

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
};

export const localeLanguageTags: Record<Locale, string> = {
  en: 'en',
  fa: 'fa-IR',
};

/**
 * Given a Next.js pathname, figure out which locale it belongs to and
 * what the pathname looks like with the locale prefix stripped off.
 *
 *   "/fa/about/"  -> { locale: "fa", pathWithoutLocale: "/about/" }
 *   "/about/"     -> { locale: "en", pathWithoutLocale: "/about/" }
 */
export function getLocaleFromPathname(pathname: string): {
  locale: Locale;
  pathWithoutLocale: string;
} {
  if (pathname === '/fa' || pathname.startsWith('/fa/')) {
    const stripped = pathname.slice(3) || '/';
    return { locale: 'fa', pathWithoutLocale: stripped };
  }
  return { locale: defaultLocale, pathWithoutLocale: pathname };
}

/**
 * Prefix an internal, locale-neutral path (e.g. "/about/") with the
 * given locale's prefix. Leaves external links (http/https/mailto/tel)
 * and hash/query-only links untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (/^(https?:)?\/\//.test(href) || /^(mailto:|tel:|#)/.test(href)) {
    return href;
  }

  const prefix = localePrefixes[locale];
  if (!prefix) return href;

  // Avoid double-prefixing if it's somehow already localized.
  if (href === '/fa' || href.startsWith('/fa/')) return href;

  if (href === '/') return `${prefix}/`;
  return `${prefix}${href}`;
}
