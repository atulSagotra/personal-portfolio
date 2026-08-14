"use client";

import React, { useState } from "react";
import { FaReact, FaJsSquare, FaCss3Alt, FaTerminal, FaTools, FaRobot, FaBrain, FaSitemap, FaUsers, FaNodeJs, FaGitAlt } from "react-icons/fa";
import Magnetic from "../components/Magnetic";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories = [
    { id: "all", label: "All Capabilities" },
    { id: "frontend", label: "Frontend & Architecture" },
    { id: "ai", label: "AI Systems & Tooling" },
    { id: "leadership", label: "Leadership & Workflows" },
    { id: "backend", label: "Backend & DevOps" },
  ];

  const skillsData = [
    // Frontend
    { name: "ReactJS & TypeScript", level: 90, category: "frontend", icon: <FaReact /> },
    { name: "NextJS (App Router & SSR)", level: 88, category: "frontend", icon: <FaReact /> },
    { name: "Micro-frontends & Module Federation", level: 88, category: "frontend", icon: <FaTerminal /> },
    { name: "State & Data (Zustand, React Query)", level: 86, category: "frontend", icon: <FaJsSquare /> },
    { name: "Responsive CSS & Design Systems", level: 85, category: "frontend", icon: <FaCss3Alt /> },
    
    // AI Systems
    { name: "AI Agent Orchestration (Claude, GPTs)", level: 92, category: "ai", icon: <FaRobot /> },
    { name: "AI-Driven Workflows & Code Gen", level: 90, category: "ai", icon: <FaBrain /> },
    { name: "Team AI Projects & Custom Assistants", level: 88, category: "ai", icon: <FaTools /> },
    
    // Leadership & Workflows
    { name: "Technical Scoping & Architecture Plans", level: 88, category: "leadership", icon: <FaSitemap /> },
    { name: "Team Process Optimization & Workflows", level: 86, category: "leadership", icon: <FaUsers /> },
    { name: "Mentorship & Code Standards", level: 85, category: "leadership", icon: <FaTools /> },

    // Backend & DevOps
    { name: "Node.js & Python API Services", level: 78, category: "backend", icon: <FaNodeJs /> },
    { name: "Databases & REST APIs Integration", level: 80, category: "backend", icon: <FaTools /> },
    { name: "CI/CD Pipelines & DevOps (Git, Docker)", level: 82, category: "backend", icon: <FaGitAlt /> }
  ];

  const filteredSkills = activeCategory === "all"
    ? skillsData
    : skillsData.filter((skill) => skill.category === activeCategory);

  // Helper to render telemetry bar segments e.g. [||||||||||.....]
  const renderTelemetrySegments = (level) => {
    const totalSegments = 10;
    const activeSegments = Math.round((level / 100) * totalSegments);
    const segments = [];
    
    for (let i = 0; i < totalSegments; i++) {
      segments.push(
        <span 
          key={i} 
          style={{
            display: "inline-block",
            width: "6px",
            height: "10px",
            background: i < activeSegments ? "var(--primary-color)" : "rgba(255, 255, 255, 0.08)",
            marginRight: "2px",
            borderRadius: "1px",
            transition: "background 0.5s ease"
          }}
        />
      );
    }
    return <div style={{ display: "flex", alignItems: "center" }}>{segments}</div>;
  };

  return (
    <section id="skills" className="skills-section scroll-reveal">
      
      {/* Title */}
      <h2 className="section-title">Skills // Capability Matrix</h2>
      
      {/* Core Competencies Header */}
      <div className="glass-card" style={{ padding: "2.5rem", marginBottom: "3.5rem", border: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Blueprint Corners */}
        <div className="grid-corner corner-tl"></div>
        <div className="grid-corner corner-tr"></div>
        <div className="grid-corner corner-bl"></div>
        <div className="grid-corner corner-br"></div>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--fg-color)", marginBottom: "1.5rem" }}>
          // CORE_COMPETENCIES
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span className="status-indicator" style={{ marginTop: "6px" }}></span>
            <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)", lineHeight: "1.5" }}>Developing responsive, high-performance mobile-first web applications.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span className="status-indicator" style={{ marginTop: "6px" }}></span>
            <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)", lineHeight: "1.5" }}>Designing modular and scalable micro-frontend architectures with Module Federation.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span className="status-indicator" style={{ marginTop: "6px" }}></span>
            <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)", lineHeight: "1.5" }}>Optimizing pages focusing on Core Web Vitals (LCP, INP, CLS) and SSR execution.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span className="status-indicator" style={{ marginTop: "6px" }}></span>
            <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)", lineHeight: "1.5" }}>Building decoupled UI component libraries for fast feature rollouts.</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", justifyContent: "flex-start", gap: "0.75rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        {skillCategories.map((cat) => (
          <Magnetic key={cat.id} scale={0.15}>
            <button
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? "var(--fg-color)" : "rgba(var(--fg-color), 0.03)",
                border: "1px solid var(--card-border)",
                color: activeCategory === cat.id ? "var(--bg-color)" : "var(--fg-muted)",
                padding: "0.5rem 1.25rem",
                borderRadius: "2px",
                fontFamily: "var(--font-mono)",
                fontWeight: "600",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              className="interactive-node"
            >
              {cat.label}
            </button>
          </Magnetic>
        ))}
      </div>

      {/* Skill Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
        {filteredSkills.map((skill, idx) => (
          <div 
            key={idx} 
            className="glass-card" 
            style={{ 
              padding: "1.75rem 1.5rem", 
              border: "1px solid var(--card-border)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease" 
            }}
          >
            {/* Tech Corners */}
            <div className="grid-corner corner-tl"></div>
            <div className="grid-corner corner-br"></div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.65rem", color: "var(--primary-color)", display: "flex", alignItems: "center" }}>
                {skill.icon}
              </span>
              <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--fg-color)" }}>
                {skill.name}
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {renderTelemetrySegments(skill.level)}
              <span style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>
                {skill.level}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
