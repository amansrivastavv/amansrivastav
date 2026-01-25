import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

import { PremiumPreloader } from "@/components/ui/PremiumPreloader";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Noise } from "@/components/ui/Noise";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.amansrivastav.com/#website",
      "url": "https://www.amansrivastav.com",
      "name": "Aman Srivastav",
      "publisher": {
        "@id": "https://www.amansrivastav.com/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.amansrivastav.com/#person",
      "name": "Aman Srivastav",
      "alternateName": [
        "Aman Srivastava",
        "Aman Kumar Srivastav"
      ],
      "url": "https://www.amansrivastav.com",

      "jobTitle": "Software Engineer",

      "description": "Software Engineer based in Noida, India, specializing in high-performance web applications, secure system architecture, and modern JavaScript engineering.",

      "image": {
        "@type": "ImageObject",
        "url": "https://www.amansrivastav.com/Og_dark_theme.png"
      },

      "email": "amansrivastav1203@gmail.com",
      "nationality": "Indian",

      /* 🎓 EDUCATION */
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "ITM GIDA",
        "url": "https://www.itmgida.ac.in/"
      },

      /* 🧠 KNOWLEDGE GRAPH SIGNALS */
      "knowsAbout": [
        "Software Engineering",
        "System Architecture",
        "Web Development",
        "React.js",
        "Next.js", 
        "TypeScript",
        "Node.js",
        "Performance Optimization",
        "Application Security",
        "Tailwind CSS",
        "GSAP Animations",
        "Three.js",
        "Expressjs",
        "Socket.io",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "Redis",
        "Stripe",
        "Git",
        "GitHub",
        "GitLab",
        "Bitbucket",
        "Docker",
        "Kubernetes",
        "Web Performance Optimization",
        "Application Security"
      ],

      "sameAs": [
        "https://www.linkedin.com/in/aman-kumar-srivastav-627ba1258",
        "https://github.com/amansrivastavv",
        "https://x.com/amansrivastavv",
        "https://www.instagram.com/aman_srivastav07"
      ],

      /* 💼 WORK */
      "worksFor": {
        "@type": "Organization",
        "name": "Oaky Web",
        "url": "https://www.oakyweb.com"
      },

      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "India"
      }
    }
  ]
};


  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#020202] text-white overflow-x-hidden`}
      >
      
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <PremiumPreloader />
        <CommandPalette />
        <Noise />
        <CustomCursor />
        
       
        <Navbar />
        
        <SmoothScroll>
          {children}
        </SmoothScroll>

        <Analytics />

      </body>
    </html>
  );
}