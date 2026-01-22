# Aman Srivastav's Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

> A high-performance, immersive portfolio website built with modern web technologies, focusing on motion, interaction, and architectural precision.

---

## 🚀 Key Features

- **Cinematic Preloader**: A premium, noise-overlayed entrance animation.
- **Immersive Hero Section**: GSAP-powered text reveals and structural grid backgrounds.
- **Magnetic Navigation**: Interactive cursor effects and fluid navigation menus.
- **Dynamic Projects**: Scroll-triggered project reveals with detailed metadata.
- **Smooth Scrolling**: Lenis-powered inertial scrolling for a native app feel.
- **Responsive Design**: Fully optimized for all device sizes with a mobile-first approach.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**:
  - [Framer Motion](https://www.framer.com/motion/) (Declarative animations)
  - [GSAP](https://greensock.com/gsap/) (Complex timelines)
- **Typography**: Inter (Sans) & Playfair Display (Serif) via `next/font`
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚡ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router pages & layouts
│   ├── layout.tsx    # Root layout with global providers
│   ├── page.tsx      # Homepage composition
│   └── globals.css   # Global styles & Tailwind directives
├── components/       # React components
│   ├── layout/       # Structural components (Navbar, Footer)
│   ├── sections/     # Page sections (Hero, About, Projects)
│   └── ui/           # Reusable UI elements (Buttons, Cursor)
└── lib/              # Utilities & configurations
    ├── utils.ts      # Helper functions (cn, etc.)
    └── data.ts       # Static content data
```

---

## 🎨 Design System

- **Colors**:
  - Background: `#020202` (Deep Black)
  - Accent: `#06b6d4` (Cyan 500)
  - Text: White / Neutral Grays
- **Micro-interactions**: Hover effects, magnetic buttons, and parallax scrolling.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ and Code by Aman Srivastav</p>
