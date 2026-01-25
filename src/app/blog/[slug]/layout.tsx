import { Metadata } from "next";
import { fetchHashnodePostBySlug } from "@/lib/hashnode";

const HASHNODE_HOSTNAME = "amansrivastav.hashnode.dev";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchHashnodePostBySlug(HASHNODE_HOSTNAME, params.slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Aman Srivastav`,
    description: post.brief || `Read ${post.title} by Aman Srivastav, a Software Engineer based in Noida, India.`,
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
