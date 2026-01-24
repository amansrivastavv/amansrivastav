
import { 
    Atom, 
    Blocks, 
    FileType, 
    Code2, 
    Database, 
    Layers, 
    Palette, 
    Server,
    GitBranch,
    Globe,
    Cpu,
    Cloud,
    Terminal,
    Box,
    Braces,
    Layout,
    Smartphone,
    Workflow,
    Monitor,
    Component,
    LucideIcon
} from "lucide-react";

export interface TreeNode {
    name: string;
    icon?: LucideIcon;
    children?: TreeNode[];
    type?: "root" | "category" | "skill";
}

export const skillTree: TreeNode = {
    name: "Full Stack Engineering",
    icon: Cpu,
    type: "root",
    children: [
        {
            name: "Frontend Development",
            icon: Layout,
            type: "category",
            children: [
                {
                    name: "Core",
                    icon: Braces,
                    type: "category",
                    children: [
                        { name: "TypeScript", icon: FileType },
                        { name: "JavaScript", icon: Code2 },
                        { name: "HTML5 / CSS3", icon: Globe },
                    ]
                },
                {
                    name: "Frameworks",
                    icon: Atom,
                    type: "category",
                    children: [
                        { name: "React", icon: Atom },
                        { name: "Next.js", icon: Blocks },
                        { name: "Vue.js", icon: Layers },
                    ]
                },
                {
                    name: "UI & UX",
                    icon: Palette,
                    type: "category",
                    children: [
                        { name: "Tailwind CSS", icon: Palette },
                        { name: "Framer Motion", icon: Layers },
                        { name: "Shadcn UI", icon: Component },
                    ]
                }
            ]
        },
        {
            name: "Backend & Infrastructure",
            icon: Server,
            type: "category",
            children: [
                {
                    name: "Server Side",
                    icon: Terminal,
                    type: "category",
                    children: [
                        { name: "Node.js", icon: Server },
                        { name: "Express", icon: Server },
                        { name: "PHP", icon: Code2 },
                    ]
                },
                {
                    name: "Data",
                    icon: Database,
                    type: "category",
                    children: [
                        { name: "PostgreSQL", icon: Database },
                        { name: "MongoDB", icon: Database },
                        { name: "MySQL", icon: Database },
                    ]
                },
                {
                    name: "DevOps & Cloud",
                    icon: Cloud,
                    type: "category",
                    children: [
                        { name: "Docker", icon: Box },
                        { name: "Git / CI/CD", icon: Workflow },
                        { name: "Appwrite", icon: Cloud },
                    ]
                }
            ]
        }
    ]
};
