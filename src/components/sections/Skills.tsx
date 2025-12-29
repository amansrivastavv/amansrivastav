"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const skillsData = [
  // Frontend
  { name: "React.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "GSAP", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "Supabase", category: "backend" },

  // DevOps
  { name: "Docker", category: "devops" },
  { name: "AWS", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "Git", category: "devops" },

  // Design
  { name: "Figma", category: "design" },
  { name: "Adobe XD", category: "design" },
  { name: "UI/UX", category: "design" },
  { name: "Prototyping", category: "design" },
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    const engine = Engine.create();
    const world = engine.world;

    // Adjust gravity for a floaty feel
    engine.gravity.y = 0.8;

    const { clientWidth: width, clientHeight: height } = containerRef.current;
    setIsMobile(width < 768);

    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 60, width, 120, { 
      isStatic: true, 
      render: { fillStyle: "transparent" } 
    });
    const leftWall = Bodies.rectangle(-60, height / 2, 120, height * 2, { 
      isStatic: true,
      render: { fillStyle: "transparent" }
    });
    const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height * 2, { 
      isStatic: true,
      render: { fillStyle: "transparent" }
    });

    Composite.add(world, [ground, leftWall, rightWall]);

    // Skills Bodies
    const skillBodies = skillsData.map((skill) => {
      const x = Math.random() * (width - 100) + 50;
      const y = -Math.random() * 500 - 100; // Start above screen
      
      const themeColor = 
        skill.category === "frontend" ? "#00f2fe" : 
        skill.category === "backend" ? "#7000ff" :
        skill.category === "devops" ? "#ff0080" : "#ffa500";

      // Approximate text width base on length
      const fontSize = width < 768 ? 14 : 18;
      const boxWidth = skill.name.length * (fontSize * 0.6) + 40; 
      const boxHeight = fontSize * 2.5;

      return Bodies.rectangle(x, y, boxWidth, boxHeight, {
        chamfer: { radius: boxHeight / 2 }, // Pill shape
        restitution: 0.6, // Bouncy
        friction: 0.005,
        render: {
          fillStyle: "#0e0e0e",
          strokeStyle: "#333",
          lineWidth: 1,
        },
        label: skill.name, // Store text in label
        plugin: {
            // Custom properties for rendering text later if needed
            text: skill.name,
            textColor: themeColor,
            fontSize: fontSize
        }
      });
    });

    Composite.add(world, skillBodies);

    // Mouse Control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Custom Rendering for Text
    Events.on(render, "afterRender", () => {
        const context = render.context;
        context.font = "500 16px 'Inter', sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";

        skillBodies.forEach((body) => {
            const { x, y } = body.position;
            const angle = body.angle;
            const { text, textColor, fontSize } = body.plugin;

            context.save();
            context.translate(x, y);
            context.rotate(angle);
            
            // Draw Pill Border Glow (optional)
            // context.shadowBlur = 10;
            // context.shadowColor = textColor;
            
            context.fillStyle = textColor || "#fff";
            context.font = `600 ${fontSize}px 'Inter', sans-serif`;
            context.fillText(text, 0, 0);
            
            context.restore();
        });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Resize Handler
    const handleResize = () => {
       if (!containerRef.current || !canvasRef.current) return;
       const newWidth = containerRef.current.clientWidth;
       const newHeight = containerRef.current.clientHeight;

       render.canvas.width = newWidth;
       render.canvas.height = newHeight;
       render.options.width = newWidth;
       render.options.height = newHeight;

       // Reposition ground
       Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 60 });
       Matter.Body.setPosition(rightWall, { x: newWidth + 60, y: newHeight / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
          render.canvas.remove();
      }
      Composite.clear(world, false);
      Engine.clear(engine);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="skills" className="py-32 bg-[#020202] text-white relative overflow-hidden min-h-[100vh]">
      
      <div className="container mx-auto px-4 relative z-10 mb-12 text-center pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
              Interactive
          </span>
          <h2 className="text-6xl md:text-9xl font-serif font-black tracking-tighter text-white mb-6">
            THE PLAYGROUND
          </h2>
          <p className="text-neutral-400 max-w-sm mx-auto">
              Grab, throw, and explore the technologies that power my work.
          </p>
      </div>

      <div 
        ref={containerRef} 
        className="w-full h-[60vh] md:h-[70vh] relative cursor-grab active:cursor-grabbing border-y border-white/5 bg-neutral-900/10"
      >
          <canvas ref={canvasRef} className="block w-full h-full" />
          
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
             <span className="text-9xl font-black text-white/5">SKILLS</span>
          </div>
      </div>

    </section>
  );
};
