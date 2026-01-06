import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

import { PremiumPreloader } from "@/components/ui/PremiumPreloader";

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
        "name": "Aman Srivastav Portfolio",
        "publisher": {
          "@id": "https://www.amansrivastav.com/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.amansrivastav.com/#person",
        "name": "Aman Srivastav",
        "alternateName": ["Aman Srivastava", "Aman Kumar Srivastav"],
        "url": "https://www.amansrivastav.com",
        "jobTitle": "Frontend Developer",
        "image": "https://www.amansrivastav.com/Og_dark_theme.png",
        "description": "Award-winning Frontend Developer & UI/UX Engineer specializing in high-performance React, Next.js, and immersive web experiences.",
        "gender": "Male",
        "email": "amansrivastav1203@gmail.com",
        "nationality": "Indian",
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "ITM GIDA",
            "sameAs": "https://www.itmgida.ac.in/"
        },
        "knowsAbout": [
            "Frontend Development",
            "React.js",
            "Next.js", 
            "TypeScript",
            "Tailwind CSS",
            "GSAP Animations",
            "Three.js",
            "UI/UX Design"
        ],
        "sameAs": [
          "https://www.linkedin.com/in/aman-kumar-srivastav-627ba1258",
          "https://github.com/amansrivastavv",
          "https://x.com/amansrivastavv",
          "https://www.instagram.com/amansrivastav"
        ],
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
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#030014] text-white overflow-x-hidden`}
      >
      
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <PremiumPreloader />
        <div className="noise-overlay" />
        <CustomCursor />
        
       
        <Navbar />
        
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}