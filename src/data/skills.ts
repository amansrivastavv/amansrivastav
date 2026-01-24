
import { 
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiTailwindcss,
    SiFramer,
    SiHtml5,
    SiCss3,
    SiNodedotjs,
    SiPhp,
    SiExpress,
    SiPython,
    SiMysql,
    SiMongodb,
    SiPostgresql,
    SiGit,
    SiDocker,
    SiGithub,
    SiRedux,
    SiAppwrite,
    SiFirebase,
    SiPostman,
    SiVercel,
    SiFigma,
    SiLinux
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { IconType } from "react-icons";

export interface Skill {
    name: string;
    category: string;
    Icon: IconType;
}

export const skillsData: Skill[] = [
    // Top Priority / Core (Inner Orbit)
    { name: "React", category: "Frontend", Icon: SiReact },
    { name: "Next.js", category: "Fullstack", Icon: SiNextdotjs },
    { name: "TypeScript", category: "Language", Icon: SiTypescript },
    { name: "Node.js", category: "Backend", Icon: SiNodedotjs },
    { name: "Tailwind", category: "Styling", Icon: SiTailwindcss },
    { name: "MongoDB", category: "Database", Icon: SiMongodb },

    // Secondary (Middle Orbit)
    { name: "JavaScript", category: "Language", Icon: SiJavascript },
    { name: "Express", category: "Backend", Icon: SiExpress },
    { name: "PostgreSQL", category: "Database", Icon: SiPostgresql },
    { name: "Framer Motion", category: "Animation", Icon: SiFramer },
    { name: "Git", category: "Version Control", Icon: SiGit },
    { name: "Docker", category: "DevOps", Icon: SiDocker },
    { name: "Redux", category: "State", Icon: SiRedux },
    { name: "Figma", category: "Design", Icon: SiFigma },

    // Tools / Others (Outer Orbit)
    { name: "HTML5", category: "Structure", Icon: SiHtml5 },
    { name: "CSS3", category: "Styling", Icon: SiCss3 },
    { name: "PHP", category: "Backend", Icon: SiPhp },
    { name: "Python", category: "Language", Icon: SiPython },
    { name: "MySQL", category: "Database", Icon: SiMysql },
    { name: "GitHub", category: "Platform", Icon: SiGithub },
    { name: "VS Code", category: "Editor", Icon: TbBrandVscode },
    { name: "Appwrite", category: "BaaS", Icon: SiAppwrite },
    { name: "Firebase", category: "BaaS", Icon: SiFirebase },
    { name: "Postman", category: "Tool", Icon: SiPostman },
    { name: "Vercel", category: "Deployment", Icon: SiVercel },
    { name: "Linux", category: "OS", Icon: SiLinux },
];
