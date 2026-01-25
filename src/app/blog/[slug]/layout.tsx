import React from "react";
import { Metadata } from "next";
import { fetchHashnodePostBySlug } from "@/lib/hashnode";

const HASHNODE_HOSTNAME = "amansrivastav.hashnode.dev";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchHashnodePostBySlug(HASHNODE_HOSTNAME, slug);
  
  if (!post) {
    return {
      title: "Article Not Found | Aman Srivastav",
    };
  }

  return {
    title: `${post.title} | Aman Srivastav`,
    description: post.brief || `Technical article by Aman Srivastav, Software Engineer based in Noida, India.`,
    openGraph: {
      title: post.title,
      description: post.brief,
      images: [post.coverImage?.url || "/og-image.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.brief,
      images: [post.coverImage?.url || "/og-image.png"],
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
