export const defaultMetadata = {
  metadataBase: new URL('https://farhamaghdasi.ir'),
  title: {
    default: 'Farham Aghdasi',
    template: '%s | Farham Aghdasi',
  },
  description:
    'Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions.',
  openGraph: {
    title: 'Farham Aghdasi',
    description:
      'Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions.',
    url: 'https://farhamaghdasi.ir',
    siteName: 'Farham Aghdasi',
    images: [
      {
        url: 'https://farhamaghdasi.ir/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Farham Aghdasi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farham Aghdasi',
    description:
      'Welcome to my personal website. I am Farham Aghdasi, a programmer specializing in web development and software solutions.',
    images: ['https://farhamaghdasi.ir/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};