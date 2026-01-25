
import { Metadata } from "next";
import { BlogClient } from "@/components/pages/BlogClient";

export const metadata: Metadata = {
  title: "Engineering Journal | Aman Srivastav",
  description: "Technical notes on software engineering, system architecture, and modern JavaScript. Insights from Aman Srivastav, a Software Engineer based in Noida, India.",
  keywords: ["Software Engineering Blog", "System Architecture Notes", "Aman Srivastav Journal", "Technical Guides Noida"],
};

export default function BlogPage() {
  return <BlogClient />;
};
