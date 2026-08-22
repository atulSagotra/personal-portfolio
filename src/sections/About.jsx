"use client";

import React, { useRef, useState } from "react";
import { FaGraduationCap, FaCode, FaRocket, FaNetworkWired } from "react-icons/fa";

export default function About() {
  const cards = [
    {
      icon: <FaGraduationCap />,
      title: "Education",
      desc: "B.Tech in Computer Science Engineering from Chandigarh Group of CGC.",
    },
    {
      icon: <FaCode />,
      title: "Architecture",
      desc: "Strong expertise in building reusable components and robust web systems.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Micro-frontends",
      desc: "Proven experience breaking monolithic structures into independent apps.",
    },
    {
      icon: <FaRocket />,
      title: "Performance",
      desc: "Optimizing Core Web Vitals to deliver highly responsive user flows.",
    },
  ];

  // Mouse tilt tracking states for each card
  const [tilts, setTilts] = useState(cards.map(() => ({ x: 0, y: 0 })));

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((centerY - y) / centerY) * 10;
    const tiltY = ((x - centerX) / centerX) * 10;

    const newTilts = [...tilts];
    newTilts[index] = { x: tiltX, y: tiltY };
    setTilts(newTilts);
  };

  const handleMouseLeave = (index) => {
    const newTilts = [...tilts];
    newTilts[index] = { x: 0, y: 0 };
    setTilts(newTilts);
  };

  return (
    <section id="about" className="about-section scroll-reveal">
      <h2 className="section-title">About // Executive Summary</h2>
      
      <div className="asymmetric-grid" style={{ marginTop: "3.5rem" }}>
        
        {/* Left Column: Story Paragraphs */}
        <div className="about-text-content" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <p style={{ fontSize: "1.1rem", color: "var(--fg-color)", lineHeight: "1.7" }}>
            Hello! I'm <strong>Atul Sagotra</strong>, a software engineer based in <strong>Brampton, Ontario, Canada</strong>. 
            My passion is writing clean, efficient code that runs flawlessly across a variety of devices. 
            I specialize in the JavaScript/TypeScript ecosystem, with extensive focus on building responsive frontends 
            using <strong>React</strong> and <strong>Next.js</strong>.
          </p>
          
          <p style={{ fontSize: "1.05rem", color: "var(--fg-muted)", lineHeight: "1.7" }}>
            Currently, I am working as a <strong>Team Lead</strong> at{" "}
            <a href="https://www.chargerlogistics.com/" target="_blank" rel="noopener noreferrer" className="inline-link" style={{ fontWeight: 700 }}>
              Charger Logistics
            </a>{" "}
            in Brampton, Canada. Here, I lead application development and architecture, collaborating directly with product managers, 
            business analysts, DevOps, and solution architects, while heavily leveraging AI models (like Claude) to architect and deliver 
            mission-critical logistics platforms.
          </p>
          
          <p style={{ fontSize: "1.05rem", color: "var(--fg-muted)", lineHeight: "1.7" }}>
            Before moving to Canada, I served as a Senior Web Developer at <strong>Material Plus</strong> in Gurugram, building client-side and 
            dashboard platforms for <strong>SportsClips</strong> (live in App Store) and a large-scale CMS for <strong>Nasdaq Nordic</strong>. Prior to that, 
            I led frontend engineering for the B2C mobile-web insurtech ecosystem at <strong>Pasarpolis</strong>.
          </p>
        </div>

        {/* Right Column: Visual Skill Cards */}
        <div className="about-cards-grid">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                padding: "2rem 1.5rem",
                textAlign: "left",
                transform: `rotateX(${tilts[idx].x}deg) rotateY(${tilts[idx].y}deg) translateZ(5px)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out, border-color 0.4s ease",
              }}
            >
              {/* Technical Grid Corner Connectors */}
              <div className="grid-corner corner-tl"></div>
              <div className="grid-corner corner-tr"></div>
              <div className="grid-corner corner-bl"></div>
              <div className="grid-corner corner-br"></div>

              <div className="card-icon-wrapper" style={{
                width: "42px",
                height: "42px",
                background: "var(--primary-glow)",
                color: "var(--primary-color)",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.15rem",
                marginBottom: "1.25rem",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                transform: "translateZ(10px)"
              }}>
                {card.icon}
              </div>

              <h3 className="card-title" style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.6rem", transform: "translateZ(15px)" }}>
                {card.title}
              </h3>
              
              <p className="card-desc" style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: "1.5", transform: "translateZ(20px)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
