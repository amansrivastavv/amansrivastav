"use client";

import React, { useRef, useEffect } from "react";

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.color = `rgba(6, 182, 212, ${Math.random() * 0.5})`; // Cyan-ish
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction (Gravity Well)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
           this.x += dx * 0.01;
           this.y += dy * 0.01;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      const numberOfParticles = Math.min((width * height) / 15000, 100); // Responsive density
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      particles.forEach((a, index) => {
         for (let j = index + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
               ctx.beginPath();
               ctx.strokeStyle = `rgba(6, 182, 212, ${1 - distance / 150})`;
               ctx.lineWidth = 0.5;
               ctx.moveTo(a.x, a.y);
               ctx.lineTo(b.x, b.y);
               ctx.stroke();
            }
         }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
       const rect = canvas.getBoundingClientRect();
       mouse.x = e.clientX - rect.left;
       mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};
