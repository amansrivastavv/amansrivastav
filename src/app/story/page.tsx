
import { Metadata } from "next";
import { StoryClient } from "@/components/pages/StoryClient";

export const metadata: Metadata = {
  title: "Professional Story | Aman Srivastav",
  description: "The technical journey of Aman Srivastav, a Software Engineer based in Noida, India. Detailed career timeline, engineering milestones, and system architecture focus.",
  keywords: ["Software Engineer Journey", "Aman Srivastav Professional Story", "Engineering Career Noida", "Technical Background"],
};

export default function StoryPage() {
  return <StoryClient />;
};
