import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "Aman Srivastav | Creative Frontend Developer & React Engineer",
    template: "%s | Aman Srivastav",
  },


  description:
    "Portfolio of Aman Srivastav, a Creative Frontend Developer from India. Specializing in React, Next.js, and pixel-perfect UI design. Building high-performance web solutions for clients in Noida, Delhi NCR, and Worldwide.",

  // BASE URL: Important for images to work
  metadataBase: new URL("https://www.amansrivastav.com"),


  keywords: [
    // Branding
    "Aman Srivastav",
    "Aman Srivastav Portfolio",
    
    // Core Skills
    "Frontend Developer",
    "Creative Web Developer",
    "React Developer",
    "Next.js Developer",
    "Web Designer",
    "UI/UX Engineer",
    
    "Frontend Developer India",
    "Frontend Developer Noida",
    "Frontend Developer Delhi NCR",
    "Frontend Developer Gorakhpur", 
    "Web Developer Uttar Pradesh",
    

    "Pixel Perfect Design",
    "Creative Portfolio",
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
      "Creative Frontend Developer from India specializing in React, Next.js, and modern UI. Check out my pixel-perfect web projects.",
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
    icon: "/favicon.ico",
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