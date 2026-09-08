import type { Locale } from './config';

/**
 * Small, hand-maintained dictionary for chrome/UI copy that isn't
 * already covered by the page-specific JSON files in `src/data`.
 * Add keys here as you localize more components.
 */
const dictionaries = {
  en: {
    common: {
      readMore: 'Read More',
      viewProject: 'View Project',
      sendMessage: 'Send Message',
      loading: 'Loading',
      backToHome: 'Back to Home',
      language: 'Language',
    },
  },
  fa: {
    common: {
      readMore: 'ادامه مطلب',
      viewProject: 'مشاهده پروژه',
      sendMessage: 'ارسال پیام',
      loading: 'در حال بارگذاری',
      backToHome: 'بازگشت به خانه',
      language: 'زبان',
    },
  },
} satisfies Record<Locale, { common: Record<string, string> }>;

export type Dictionary = (typeof dictionaries)['en'];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export default dictionaries;
