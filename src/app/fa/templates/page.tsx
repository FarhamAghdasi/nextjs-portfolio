import { Metadata } from 'next';
import { HtmlTemplates } from '@/components';
import { defaultMetadata, buildAlternates } from '@/components/addon/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'قالب‌های HTML | فرهام اقدسی';
  const pageDescription = 'مجموعه‌ای از قالب‌های حرفه‌ای HTML طراحی‌شده توسط فرهام اقدسی را مشاهده کنید.';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: 'https://farhamaghdasi.ir/fa/templates/',
      locale: 'fa_IR',
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
    },
    alternates: buildAlternates('/templates/', 'fa'),
  };
}

export default function TemplatesFa() {
  return <HtmlTemplates />;
}
