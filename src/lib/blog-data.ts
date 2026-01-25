
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    category: string;
    image: string;
    slug: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Art of Minimalist Web Design",
        excerpt: "Exploring how less can be more in modern web interfaces, focusing on white space, typography, and core functionality.",
        date: "Jan 15, 2026",
        readingTime: "5 min read",
        category: "Design",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80\u0026w=2067\u0026auto=format\u0026fit=crop",
        slug: "minimalist-web-design"
    },
    {
        id: "2",
        title: "Mastering Framer Motion for Next.js",
        excerpt: "A deep dive into creating seamless transitions and sophisticated animations that enhance but don't distract.",
        date: "Jan 10, 2026",
        readingTime: "8 min read",
        category: "Development",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80\u0026w=2070\u0026auto=format\u0026fit=crop",
        slug: "mastering-framer-motion"
    },
    {
        id: "3",
        title: "Why TypeScript is Essential in 2026",
        excerpt: "How static typing has evolved from an option to a necessity for building scalable, maintainable enterprise applications.",
        date: "Jan 05, 2026",
        readingTime: "6 min read",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80\u0026w=2128\u0026auto=format\u0026fit=crop",
        slug: "typescript-essential-2026"
    },
    {
        id: "4",
        title: "The Psychology of Dark Mode UI",
        excerpt: "Understanding why users prefer dark interfaces and how to design them for accessibility and aesthetic appeal.",
        date: "Dec 20, 2025",
        readingTime: "7 min read",
        category: "UX Research",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80\u0026w=2070\u0026auto=format\u0026fit=crop",
        slug: "psychology-dark-mode"
    }
];
