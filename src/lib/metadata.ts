import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "Aman Srivastav | Creative Frontend Developer & React Engineer",
    template: "%s | Aman Srivastav",
  },


  description:
    "Aman Srivastav: Award-winning Frontend Developer & UI/UX Engineer. Specializing in high-performance React, Next.js, and immersive web experiences. Based in India, available globally.",
  
  // BASE URL: Important for images to work
  metadataBase: new URL("https://www.amansrivastav.com"),


  keywords: [
    // Branding & Personal Identity
    "Aman Srivastav",
    "Aman Srivastava", 
    "Aman Kumar Srivastav",
    "Aman Srivastav Portfolio",
    "Aman Srivastav Developer",
    "Aman Srivastav Designer",
    "Aman Srivastav From Gorakhpur",
    "Aman Srivastav From Noida",
    "Aman Srivastav From Uttar Pradesh",
    "Aman Srivastav From India",
    "Aman Srivastav From Delhi",
    "Aman Srivastav From Uttar Pradesh",
    "Aman Srivastav From India",
    "Aman Srivastav From Delhi",
    "Aman Srivastav AKTU",
    "Aman Srivastav btech enginner",
    "Aman Srivastav Software enginner",
    "Aman Srivastav Frontend enginner",
    "Aman Srivastav React enginner",
    "Aman Srivastav Next.js enginner",
    "Aman Srivastav Tailwind CSS enginner",
    "Aman Srivastav Three.js enginner",
    "Aman Srivastav Framer Motion enginner",
    "Aman Srivastav GSAP enginner",
    "Aman Srivastav UI/UX enginner",
    "Aman Srivastav Web enginner",
    "Aman Srivastav Web Developer",
    "Aman Srivastav Web",
    "Frontend Developer",
    "React Developer",
    "Next.js Expert",
    "Creative Web Developer",
    "UI/UX Engineer",
    "Javascript Developer",
    "Typescript Developer",
    "Web Performance Optimization",
    
    // Location Based (India & Global)
    "Frontend Developer India",
    "Best Frontend Developer in Noida",
    "React Developer Delhi NCR",
    "Web Developer Gorakhpur", 
    "Top Web Developer India",
    
    // Niche & Style
    "Award Winning Portfolio",
    "Awwwards Style Website",
    "Premium Web Design",
    "Interactive Websites",
    "Three.js Developer",
    "GSAP Animations",
    "Framer Motion Expert",
    "Freelance React Developer"
  ],

  authors: [{ name: "Aman Srivastav" }],
  creator: "Aman Srivastav",


  alternates: {
    canonical: "https://www.amansrivastav.com",
  },


  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.amansrivastav.com",
    title: "Aman Srivastav | Creative Frontend Developer & Designer",
    description:
      "Aman Srivastav: Award-winning Frontend Developer & UI/UX Engineer. Specializing in high-performance React, Next.js, and immersive web experiences. Based in India, available globally.",
    siteName: "Aman Srivastav Portfolio",
    images: [
      {
        url: "/Og_dark_theme.png",
        width: 1200,
        height: 630,
        alt: "Aman Srivastav - Creative Developer Portfolio",
      },
    ],
  },

  // TWITTER CARD
  twitter: {
    card: "summary_large_image",
    title: "Aman Srivastav | Creative Frontend Developer",
    description: "Building pixel-perfect web experiences with React, Next.js, and Tailwind CSS.",
    images: ["/Og_dark_theme.png"],
    creator: "@amansrivastav",
  },

  icons: {
    icon: "/signature_logo_light_png.png",
    shortcut: "/signature_logo_light_png.png",
    apple: "/signature_logo_light_png.png",
  },

  // ROBOTS: Google ko full access dene ke liye
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};