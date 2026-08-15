"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiExternalLink, FiArrowRight, FiX, FiCheckCircle } from "react-icons/fi";
import Magnetic from "./Magnetic";

const PROJECTS = [
  {
    id: "tapinsure",
    title: "TAPINSURE (B2C Insurance Platform)",
    client: "Pasarpolis",
    role: "Lead Front-end Engineer",
    summary: "Built and launched Pasarpolis' flagship B2C mobile web application, delivering ~70% of the app from scratch in 3 months.",
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
    id: "sportsclips",
    title: "SportsClips Client App & Dashboard",
    client: "Material Plus",
    role: "Senior Web Developer",
    summary: "Built the client-side mobile-first web app from scratch along with a high-scale admin dashboard system, both live in stores and production.",
    metrics: [
      { label: "Development", value: "From Scratch" },
      { label: "Clients Served", value: "Store Release" },
      { label: "Timeframe", value: "Feb 23 - Jul 24" }
    ],
    challenge: "The project required architecting a highly performant, visually premium salon booking client app and complex shop dashboard with real-time slot bookings and heavy metrics visualizations.",
    solution: "Architected a responsive React/Redux client app and dashboard. Integrated real-time slot scheduling APIs, scaled visual analytics graphs for shop owners, and optimized webpack chunks to achieve ultra-fast page load times under 1.2s.",
    tech: ["React.js", "Redux Toolkit", "JavaScript", "Webpack", "CSS3 Modules", "Chart.js"],
    link: null
  },
  {
    id: "charger-orderboard",
    title: "Charger Logistics Orderboard & Tripboard",
    client: "Charger Logistics",
    role: "Engineering Team Lead",
    summary: "Architected and delivered the mission-critical logistics Orderboard and Tripboard systems, leveraging AI assistance to accelerate development.",
    metrics: [
      { label: "AI Acceleration", value: "Claude/Cosmos" },
      { label: "Delivery Lead", value: "BA/DevOps Sync" },
      { label: "Team Size Led", value: "Cross-Functional" }
    ],
    challenge: "Managing thousands of orders and active trips required real-time updates, custom drag-and-drop boards, complex route plotting, and zero-latency data sync across drivers and dispatchers.",
    solution: "Designed the architecture for the Orderboard and Tripboard modules using React and Next.js, utilizing Claude & Cosmos to build apps. Led a team of developers, communicating directly with DevOps and solution architects to deliver a high-frequency WebSocket sync layer.",
    tech: ["React", "Next.js", "TypeScript", "WebSockets", "Tailwind CSS", "AI Tools"],
    link: "https://www.chargerlogistics.com"
  },
  {
    id: "charger-fleet",
    title: "Truck, Trailer & Driver Management System",
    client: "Charger Logistics",
    role: "Engineering Team Lead",
    summary: "Built a comprehensive logistics management portal containing driver management, truck-trailer pairing, and order inventories.",
    metrics: [
      { label: "Role", value: "Tech Architect" },
      { label: "Integrations", value: "GPS & Inventory" },
      { label: "Start Date", value: "Aug 2024" }
    ],
    challenge: "Managing physical fleet pairing (trucks, trailers) and driver profiles required absolute security, rapid CRUD latency, and an interactive customer portal that integrates live GPS dispatch data.",
    solution: "Developed an inventory and driver portal from scratch. Implemented a robust customer facing interface and pairing algorithm, handled CI/CD setups with DevOps, and constructed a shared team knowledgebase to allow quick bug fixes.",
    tech: ["React", "TypeScript", "Redux", "Docker", "Node.js", "Tailwind CSS"],
    link: "https://www.chargerlogistics.com"
  }
];

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="scroll-reveal" style={{ padding: "3.5rem 0 2rem 0" }}>
      
      {/* Section Header */}
      <div style={{ marginBottom: "3.5rem" }}>
        <p className="reveal-mask" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: "600", marginBottom: "0.5rem" }}>
          <span>[ SELECT CASE STUDIES ]</span>
        </p>
        <h2 style={{ fontSize: "2.8rem", fontWeight: "800", color: "var(--fg-color)", letterSpacing: "-0.02em" }}>Featured Projects.</h2>
      </div>

      {/* Showcase Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2.5rem"
      }}>
        {[...PROJECTS].reverse().map((project) => (
          <div 
            key={project.id} 
            className="glass-card interactive-node" 
            style={{
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--card-border)"
            }}
            onClick={() => setSelectedProject(project)}
          >
            {/* Tech Corners */}
            <div className="grid-corner corner-tl"></div>
            <div className="grid-corner corner-tr"></div>
            <div className="grid-corner corner-bl"></div>
            <div className="grid-corner corner-br"></div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", opacity: 0.7, color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {project.client} // {project.role}
              </span>
              <FiArrowRight style={{ opacity: 0.4, transition: "transform 0.3s ease" }} className="arrow-icon" />
            </div>

            <h3 style={{ fontSize: "1.5rem", marginBottom: "1.25rem", fontWeight: 800, color: "var(--fg-color)" }}>
              {project.title}
            </h3>

            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", flexGrow: 1, marginBottom: "2.5rem", lineHeight: "1.6" }}>
              {project.summary}
            </p>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", borderTop: "1px solid var(--card-border)", paddingTop: "1.75rem", marginBottom: "1.75rem" }}>
              {project.metrics.slice(0, 3).map((metric, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--fg-color)", fontFamily: "var(--font-mono)" }}>
                    {metric.value}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "var(--fg-muted)", marginTop: "0.25rem", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Mini list */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tech.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="tech-tag-minimal">
                  {tag}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--fg-muted)", padding: "0.25rem 0.2rem" }}>
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Overlay (Immersive sliding panel) */}
      {selectedProject && mounted && createPortal(
        <div className="project-drawer-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.25)", // Subtle dim overlay
          zIndex: 1000,
          display: "flex",
          justifyContent: "flex-end", // Drawer snaps to right
        }}
        onClick={() => setSelectedProject(null)}
        >
          {/* Drawer Body */}
          <div 
            className="glass-card project-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner Crosshairs */}
            <div className="grid-corner corner-tl"></div>
            <div className="grid-corner corner-bl"></div>

            {/* Close button */}
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "transparent",
                border: "1px solid var(--card-border)",
                borderRadius: "2px",
                color: "var(--fg-color)",
                padding: "8px",
                cursor: "pointer",
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--fg-color)";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.opacity = "0.7";
              }}
              aria-label="Close case study panel"
            >
              <FiX size={16} />
            </button>

            {/* Client & Role */}
            <span style={{ fontSize: "0.8rem", color: "var(--primary-color)", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {selectedProject.client} // {selectedProject.role}
            </span>

            {/* Title */}
            <h3 style={{ fontSize: "2rem", marginTop: "0.5rem", marginBottom: "2rem", fontWeight: 800 }}>
              {selectedProject.title}
            </h3>

            {/* Metrics Panel */}
            <div className="project-metrics-grid">
              {selectedProject.metrics.map((metric, idx) => (
                <div key={idx} style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--fg-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>{metric.label}</div>
                  <div className="text-gradient" style={{ fontSize: "1.45rem", fontWeight: 800, marginTop: "0.25rem", fontFamily: "var(--font-mono)" }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge Section */}
            <div style={{ marginBottom: "2.2rem" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--fg-color)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiCheckCircle style={{ color: "var(--error-color)" }} /> [ CHALLENGE ]
              </h4>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {selectedProject.challenge}
              </p>
            </div>

            {/* Solution Section */}
            <div style={{ marginBottom: "2.5rem" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--fg-color)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiCheckCircle style={{ color: "var(--success-color)" }} /> [ SOLUTION & ARCHITECTURE ]
              </h4>
              <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {selectedProject.solution}
              </p>
            </div>

            {/* Tech Tags */}
            <div style={{ marginBottom: "3rem" }}>
              <h4 style={{ fontSize: "0.85rem", color: "var(--fg-color)", marginBottom: "1rem", fontFamily: "var(--font-mono)" }}>[ ENGAGED_STACK ]</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {selectedProject.tech.map((tag, idx) => (
                  <span key={idx} className="tech-tag-minimal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Website Anchor link */}
            {selectedProject.link && (
              <Magnetic scale={0.25}>
                <a 
                  href={selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    width: "auto"
                  }}
                >
                  Visit Website <FiExternalLink size={12} />
                </a>
              </Magnetic>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
