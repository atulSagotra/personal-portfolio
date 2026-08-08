"use client";

import React, { useState } from "react";
import { FiExternalLink, FiMaximize2, FiX, FiCheckCircle } from "react-icons/fi";

const PROJECTS = [
  {
    id: "tapinsure",
    title: "TAPINSURE (B2C Insurance Platform)",
    client: "Pasarpolis",
    role: "Lead Front-end Engineer",
    summary: "Built and launched Pasarpolis' flagship B2C mobile web application, delivering ~70% of the app in 3 months.",
    metrics: [
      { label: "App Delivery", value: "3 Months" },
      { label: "Deployment Speed", value: "+40% Improvement" },
      { label: "Lighthouse Score", value: "98/100" }
    ],
    challenge: "The challenge was to deliver a high-converting, extremely fast mobile web application under tight deadlines while handling complex insurance flows and integrating multiple API partners.",
    solution: "Designed a modular micro-frontend architecture using Next.js, optimizing bundle sizes with lazy loading and edge caching. Reusable component system decreased development times for new insurance products by 50%.",
    tech: ["Next.js", "React", "JavaScript", "Styled Components", "Webpack", "Vercel"],
    link: "https://tapinsure.id"
  },
  {
    id: "micro-frontends",
    title: "Enterprise Micro-Frontend Platform",
    client: "Xoriant",
    role: "Software Engineer",
    summary: "Designed and built micro-frontend modules for high-scale enterprise applications, optimizing load times and isolation.",
    metrics: [
      { label: "Page Speed Boost", value: "+30% Faster" },
      { label: "Team Velocity", value: "+25% Higher" },
      { label: "Webpack Bundle Size", value: "-35% Smaller" }
    ],
    challenge: "Monolithic frontend became too slow to compile and deploy. Multiple teams were blocking each other on shared codebases, resulting in slow feature releases.",
    solution: "Implemented Module Federation in Webpack to separate the application into isolated, independently deployable micro-frontends. Standardized component APIs using Tailwind CSS and Redux.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Redux", "Webpack Module Federation", "Node.js"],
    link: null
  },
  {
    id: "react-sandbox",
    title: "WebMCP & AI-Agent Developer Environment",
    client: "Personal Portfolio",
    role: "Lead Architect",
    summary: "An interactive, AI-friendly personal developer website with registered WebMCP tools for direct agent execution.",
    metrics: [
      { label: "WebMCP Protocol", value: "Active" },
      { label: "Agent Discovery Time", value: "<100ms" },
      { label: "Interactivity", value: "100%" }
    ],
    challenge: "Most developer portfolios are static and readable only by humans. AI agents visiting the site struggle to retrieve structured info like project stats and contact methods.",
    solution: "Built custom WebMCP tool registrations on document.modelContext. Any AI agent visiting the site can directly execute methods like get_work_experience or get_technical_skills to fetch raw, structured profiles.",
    tech: ["React", "Vite", "WebMCP SDK", "WebSockets", "Vanilla CSS", "GitHub CLI"],
    link: "https://atulsagotra.vercel.app"
  }
];

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="scroll-reveal" style={{ padding: "6rem 0 3rem 0" }}>
      <div style={{ marginBottom: "3rem" }}>
        <p className="text-gradient" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem" }}>
          Selected Work
        </p>
        <h2 style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>Case Studies & Projects</h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem"
      }}>
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="glass-card" 
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}
            onClick={() => setSelectedProject(project)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.85rem", opacity: 0.7, color: "var(--primary-color)" }}>
                {project.client} • {project.role}
              </span>
              <FiMaximize2 style={{ opacity: 0.5 }} />
            </div>

            <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem", fontWeight: 700 }}>
              {project.title}
            </h3>

            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", flexGrow: 1, marginBottom: "2rem" }}>
              {project.summary}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
              {project.metrics.slice(0, 3).map((metric, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div className="text-gradient" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: "0.25rem" }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tech.slice(0, 3).map((tag, idx) => (
                <span key={idx} style={{
                  fontSize: "0.75rem",
                  background: "var(--primary-glow)",
                  color: "var(--primary-color)",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "20px"
                }}>
                  {tag}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)", padding: "0.25rem 0.2rem" }}>
                  +{project.tech.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Case Study Overlay */}
      {selectedProject && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem"
        }}
        onClick={() => setSelectedProject(null)}
        >
          <div 
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: "800px",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "2.5rem",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "transparent",
                border: "none",
                color: "var(--fg-color)",
                fontSize: "1.5rem",
                cursor: "pointer",
                opacity: 0.7
              }}
              aria-label="Close modal"
            >
              <FiX />
            </button>

            <span style={{ fontSize: "0.9rem", color: "var(--primary-color)", fontWeight: 600 }}>
              {selectedProject.client} • {selectedProject.role}
            </span>

            <h3 style={{ fontSize: "2rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              {selectedProject.title}
            </h3>

            {/* Metrics */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
              gap: "1rem", 
              background: "var(--card-bg)", 
              border: "1px solid var(--card-border)",
              borderRadius: "12px",
              padding: "1.5rem",
              marginBottom: "2rem"
            }}>
              {selectedProject.metrics.map((metric, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)" }}>{metric.label}</div>
                  <div className="text-gradient" style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Content sections */}
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiCheckCircle style={{ color: "var(--error-color)" }} /> The Challenge
              </h4>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {selectedProject.challenge}
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiCheckCircle style={{ color: "var(--success-color)" }} /> The Solution & Architecture
              </h4>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {selectedProject.solution}
              </p>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>Technologies Used</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selectedProject.tech.map((tag, idx) => (
                  <span key={idx} style={{
                    fontSize: "0.8rem",
                    background: "var(--card-border)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "20px",
                    border: "1px solid var(--card-border)"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Link */}
            {selectedProject.link && (
              <a 
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className="text-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none"
                }}
              >
                Visit Website <FiExternalLink />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
