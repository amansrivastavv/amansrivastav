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
    'Aman Srivastav is a software engineer based in Noida, India, with 2+ years of production experience building secure, high-performance web applications and system-driven interfaces.',

  metadataBase: new URL('https://www.amansrivastav.com'),

  /* =========================
     KEYWORDS (MINIMAL & CLEAN)
     Note: Google mostly ignores this,
     but we keep it non-spammy.
  ========================== */
  keywords: [
    'Aman Srivastav',
    'Software Engineer',
    'Web Applications',
    'System Architecture',
    'Frontend Engineering',
    'React',
    'Next.js',
    'Noida India',

    'Aman Srivastav',
    'Aman Srivastava',
    'Aman Kumar Srivastav',
    'Aman Srivastav Portfolio',
    'Aman Srivastav Developer',
    'Aman Srivastav Designer',
    'Aman Srivastav From Gorakhpur',
    'Aman Srivastav From Noida',
    'Aman Srivastav From Uttar Pradesh',
    'Aman Srivastav From India',
    'Aman Srivastav From Delhi',
    'Aman Srivastav AKTU',
    'Aman Srivastav B.Tech Engineer',
    'Aman Srivastav Software Engineer',
    'Aman Srivastav Frontend Engineer',
    'Aman Srivastav React Engineer',
    'Aman Srivastav Next.js Engineer',
    'Aman Srivastav Tailwind CSS Engineer',
    'Aman Srivastav Three.js Engineer',
    'Aman Srivastav Framer Motion Engineer',
    'Aman Srivastav GSAP Engineer',
    'Aman Srivastav UI/UX Engineer',
    'Aman Srivastav Web Engineer',
    'Aman Srivastav Web Developer',
    'Aman Srivastav Web',
    'Frontend Developer',
    'React Developer',
    'Next.js Expert',
    'Creative Web Developer',
    'UI/UX Engineer',
    'Javascript Developer',
    'Typescript Developer',
    'Web Performance Optimization', // Location Based (India & Global) "Frontend Developer India", "Best Frontend Developer in Noida", "React Developer Delhi NCR", "Web Developer Gorakhpur", "Top Web Developer India", // Niche & Style "Award Winning Portfolio", "Awwwards Style Website", "Premium Web Design", "Interactive Websites", "Three.js Developer", "GSAP Animations", "Framer Motion Expert", "Freelance React Developer"
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
      'Software engineer focused on building secure, high-performance web applications and system-oriented interfaces.',
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
      'Building secure, high-performance web applications with modern frontend technologies.',
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
