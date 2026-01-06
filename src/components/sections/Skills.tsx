"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { useInView } from "framer-motion";

const skillsData = [
  "React", "Next.js", "TypeScript", "Node.js", "Three.js", "GSAP", "Tailwind", "Framer",
  "PostgreSQL", "AWS", "Docker", "Figma", "UI/UX", "WebGL", "Redux", "Linux"
];

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView || !containerRef.current || !canvasRef.current) return;

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
    engine.gravity.y = 1;

    const { clientWidth: width, clientHeight: height } = containerRef.current;

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
      isStatic: true, render: { fillStyle: "transparent" } 
    });
    const leftWall = Bodies.rectangle(-60, height / 2, 120, height * 2, { 
      isStatic: true, render: { fillStyle: "transparent" }
    });
    const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height * 2, { 
      isStatic: true, render: { fillStyle: "transparent" }
    });

    Composite.add(world, [ground, leftWall, rightWall]);

    // Skills Bodies - Monochrome Scheme
    const skillBodies = skillsData.map((skill) => {
      const x = Math.random() * (width - 100) + 50;
      const y = -Math.random() * 500 - 100;
      
      const isHighlight = Math.random() > 0.8; // 20% chance of being Cyan
      const bgColor = isHighlight ? "#06b6d4" : "#171717"; // Cyan or Dark Grey
      const textColor = isHighlight ? "#000000" : "#ffffff";
      const borderColor = isHighlight ? "#06b6d4" : "#262626";

      const fontSize = width < 768 ? 14 : 16;
      const boxWidth = skill.length * (fontSize * 0.7) + 40; 
      const boxHeight = fontSize * 3;

      return Bodies.rectangle(x, y, boxWidth, boxHeight, {
        chamfer: { radius: boxHeight / 2 },
        restitution: 0.5,
        friction: 0.005,
        render: {
          fillStyle: bgColor,
          strokeStyle: borderColor,
          lineWidth: 1,
        },
        plugin: {
            text: skill,
            textColor: textColor,
            fontSize: fontSize
        }
      });
    });

    Composite.add(world, skillBodies);

    // Mouse Control
    const mouse = Mouse.create(render.canvas);
    
    // Fix: Allow scrolling on mobile by completely disabling mouse constraint on touch devices
    // or by not preventing default events.
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel as any);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel as any);

    // Important: Allow touch scrolling to pass through
    // @ts-ignore
    mouse.element.removeEventListener('touchstart', mouse.mousedown);
    // @ts-ignore
    mouse.element.removeEventListener('touchmove', mouse.mousemove);
    // @ts-ignore
    mouse.element.removeEventListener('touchend', mouse.mouseup);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Re-add touch events only if we want INTERACTION, but we must not call preventDefault
    // ideally for this specific "stuck" issue, we might just want to disable interaction on mobile
    // or set a flag. A simpler CSS fix is often better: pointer-events-none on mobile.
    
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Custom Rendering for Text
    Events.on(render, "afterRender", () => {
        const context = render.context;
        context.textAlign = "center";
        context.textBaseline = "middle";

        skillBodies.forEach((body) => {
            const { x, y } = body.position;
            const angle = body.angle;
            const { text, textColor, fontSize } = body.plugin;

            context.save();
            context.translate(x, y);
            context.rotate(angle);
            
            context.fillStyle = textColor;
            context.font = `600 ${fontSize}px 'Inter', sans-serif`;
            context.fillText(text, 0, 0);
            
            context.restore();
        });
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
       if (!containerRef.current || !canvasRef.current) return;
       const newWidth = containerRef.current.clientWidth;
       const newHeight = containerRef.current.clientHeight;

       render.canvas.width = newWidth;
       render.canvas.height = newHeight;
       
       Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 60 });
       Matter.Body.setPosition(rightWall, { x: newWidth + 60, y: newHeight / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Composite.clear(world, false);
      Engine.clear(engine);
      window.removeEventListener("resize", handleResize);
    };
  }, [isInView]);

  return (
    <section id="skills" className="pt-48 pb-32 bg-[#020202] text-white relative overflow-hidden min-h-[80vh] border-t border-white/5">
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row items-end gap-6">
          <h2 className="text-[10vw] md:text-8xl font-serif font-black text-white leading-[0.8]">
            Digital <br /> <span className="text-neutral-500 italic">Arsenal.</span>
          </h2>
          <div className="mb-4 flex items-center gap-4">
              <div className="h-px w-12 bg-cyan-500" />
              <p className="text-cyan-500 font-mono text-sm uppercase tracking-widest">
                Tech Stack
              </p>
          </div>
      </div>

      <div 
        ref={containerRef} 
        className="w-full h-[60vh] relative border-y border-white/5 bg-neutral-900/20"
      >
          <canvas 
            ref={canvasRef} 
            className="block w-full h-full pointer-events-none md:pointer-events-auto cursor-grab active:cursor-grabbing" 
          />
      </div>
    </section>
  );
};
