import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  /* =========================
     PRIMARY IDENTITY
  ========================== */
  title: {
    default: 'Aman Srivastav | Software Engineer',
    template: '%s | Aman Srivastav',
  },

  description:
    'Aman Srivastav: Software Engineer based in Noida, India. Specializing in secure, high-performance web applications and system-driven frontend architecture.',

  // BASE URL: Important for images to work
  metadataBase: new URL('https://www.amansrivastav.com'),

  /* =========================
     KEYWORDS (MINIMAL & FACTUAL)
  ========================== */
  keywords: [
    'Aman Srivastav',
    'Software Engineer',
    'Software Engineer Noida',
    'Web Application Development',
    'System Architecture',
    'React.js Engineering',
    'Next.js Specialist',
    'TypeScript Developer India',
    'Technical Software Engineering Portfolio',
  ],

  authors: [{ name: 'Aman Srivastav' }],
  creator: 'Aman Srivastav',

  alternates: {
    canonical: 'https://www.amansrivastav.com',
  },

  /* =========================
     OPEN GRAPH (GOOGLE + SOCIAL)
  ========================== */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.amansrivastav.com',
    title: 'Aman Srivastav | Software Engineer',
    description:
      'Aman Srivastav: Software Engineer based in Noida, India. Specializing in secure, high-performance web applications and system-driven frontend architecture.',
    siteName: 'Aman Srivastav',
    images: [
      {
        url: '/Og_dark_theme.png',
        width: 1200,
        height: 630,
        alt: 'Aman Srivastav – Software Engineer',
      },
    ],
  },

  /* =========================
     TWITTER
  ========================== */
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Srivastav | Software Engineer',
    description:
      'Aman Srivastav: Software Engineer based in Noida, India. Specializing in secure, high-performance web applications and system-driven frontend architecture.',
    images: ['/Og_dark_theme.png'],
  },

  /* =========================
     ICONS
  ========================== */
  icons: {
    icon: [
      { url: '/fabDark.png', media: '(prefers-color-scheme: light)' },
      { url: '/FavLight.png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: ['/FavLight.png'],
    apple: [{ url: '/FavLight.png' }],
  },
  manifest: '/manifest.json',

  /* =========================
     ROBOTS
  ========================== */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
