import { MetadataRoute } from "next";

const BASE_URL = "https://www.amansrivastav.com";

// helper for consistent dates
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
  
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    /**
     * 🧠 PERSONAL BRAND / STORY
     * Reinforces "Who is Aman Srivastav"
     */
    {
      url: `${BASE_URL}/story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    /**
     * 🧑‍💻 PROFESSIONAL AUTHORITY
     * Shows skills, proof of work
     */
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    /**
     * ✍️ NAME-BASED CONTENT (VERY POWERFUL)
     * Blog posts help dominate name searches
     */
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    /**
     * 📩 TRUST & CONTACT
     */
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
