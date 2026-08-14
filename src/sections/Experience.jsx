"use client";

import React, { useState } from "react";
import { FaArrowRight, FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Magnetic from "../components/Magnetic";

export default function Experience() {
  const experiences = [
    {
      company: "Charger Logistics",
      role: "Team Lead",
      period: "Aug 2024 - Present",
      location: "Brampton, ON (Canada)",
      about: "A leading North American logistics firm optimizing fleets and business operations through reactive real-time systems.",
      link: "https://www.chargerlogistics.com/",
      responsibilities: [
        {
          title: "Team Leadership",
          desc: "Manage end-to-end deliveries, coordinating with Business Analysts, DevOps, and Architects to lead full-scale project executions."
        },
        {
          title: "AI Integrations",
          desc: "Implement Claude LLMs for application planning, testing, and automated codebase documentation. Created expert knowledgebases to accelerate feature development."
        },
        {
          title: "Enterprise Boards",
          desc: "Architected key dashboards (Order Board, Trip Board, Contract Board, Customer Portal) using React, Zustand, and Firestore."
        }
      ],
      tech: ["React", "Zustand", "React Query", "Firestore", "Claude AI"]
    },
    {
      company: "Material Plus",
      role: "Senior Web Developer",
      period: "Feb 2023 - July 2024",
      location: "Gurugram, India",
      about: "Global technology and marketing consulting agency delivering premium digital platforms for international enterprises.",
      link: "https://materialplus.io/",
      responsibilities: [
        {
          title: "SportsClips Applications",
          desc: "Built full-scale client applications from scratch and dashboard platforms now active in the App Store."
        },
        {
          title: "Nasdaq Nordic CMS",
          desc: "Designed and engineered complex content management systems using React, Next.js, and PHP Lit components."
        }
      ],
      tech: ["React", "Next.js", "Node.js", "PHP Lit Components", "Tailwind CSS"]
    },
    {
      company: "Pasarpolis",
      role: "Lead Front-end Engineer (B2C)",
      period: "2023",
      location: "Gurugram, India",
      about: "Indonesia's leading insurtech firm making insurance simple and accessible for over 40 corporate partners.",
      link: "https://pasarpolis.io/",
      responsibilities: [
        {
          title: "B2C Mobile Web",
          desc: "Developed ~70% of the TAPINSURE mobile-web interface in Next.js from scratch within 3 months."
        },
        {
          title: "Micro-frontends",
          desc: "Engineered robust micro-frontend integrations that decreased deployment timelines by 40%."
        }
      ],
      tech: ["Next.js", "React", "Styled Components", "Webpack", "REST APIs"]
    },
    {
      company: "Xoriant",
      role: "Software Engineer",
      period: "2021 - 2023",
      location: "Pune, India",
      about: "Silicon Valley-headquartered product engineering firm building high-performance cloud and web software solutions.",
      link: "https://www.xoriant.com/",
      responsibilities: [
        {
          title: "Submodule Leadership",
          desc: "Assisted in building full-scale web applications, leading specific product modules and delivering client features on schedule."
        },
        {
          title: "Micro-frontends",
          desc: "Designed and integrated independent frontend submodules using React that are shared across various parent platforms."
        }
      ],
      tech: ["React", "JavaScript", "Tailwind CSS", "Redux", "Git"]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeExp = experiences[activeIndex];

  return (
    <section id="experience" className="experience-section scroll-reveal">
      
      {/* Centered Minimal Header */}
      <div style={{ textAlign: "left", marginBottom: "4rem" }}>
        <h2 className="reveal-mask" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: "600", marginBottom: "0.5rem" }}>
          <span>[ WORK TIMELINE ]</span>
        </h2>
        <h3 style={{ fontSize: "2.8rem", fontWeight: "800", color: "var(--fg-color)", letterSpacing: "-0.02em" }}>Selected Work.</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: "4.5rem", position: "relative" }} className="asymmetric-grid">
        
        {/* Left Column: Spotlight Menu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", borderRight: "1px solid var(--card-border)", paddingRight: "2.5rem" }}>
          {experiences.map((exp, idx) => {
            const isActive = activeIndex === idx;
            return (
              <Magnetic key={idx} scale={0.15}>
                <div 
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "1.25rem", padding: "0.5rem 0", transition: "transform 0.3s ease" }}
                  className="interactive-node"
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: isActive ? "var(--primary-color)" : "var(--fg-muted)", opacity: isActive ? 1 : 0.4, transition: "all 0.3s ease" }}>
                    0{idx + 1}
                  </span>
                  
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4 style={{ 
                      fontSize: "1.55rem", 
                      fontWeight: isActive ? "800" : "500", 
                      color: isActive ? "var(--fg-color)" : "var(--fg-muted)",
                      letterSpacing: "-0.02em",
                      transition: "all 0.3s ease",
                      position: "relative"
                    }}>
                      {exp.company}
                    </h4>
                  </div>
                </div>
              </Magnetic>
            );
          })}
        </div>

        {/* Right Column: Dynamic Spotlight Details Panel */}
        <div key={activeIndex} className="spotlight-details" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="glass-card" style={{ padding: "2.5rem", border: "1px solid var(--card-border)" }}>
            
            {/* Technical grid blueprint corner decorators */}
            <div className="grid-corner corner-tl"></div>
            <div className="grid-corner corner-tr"></div>
            <div className="grid-corner corner-bl"></div>
            <div className="grid-corner corner-br"></div>

            {/* Header info block */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h4 style={{ fontSize: "1.6rem", fontWeight: "750", color: "var(--fg-color)" }}>{activeExp.role}</h4>
                <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.8rem", color: "var(--fg-muted)", fontFamily: "var(--font-mono)", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaCalendarAlt size={10} /> {activeExp.period}</span>
                  <span>/</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaMapMarkerAlt size={10} /> {activeExp.location}</span>
                </div>
              </div>
              
              <Magnetic scale={0.2}>
                <a 
                  href={activeExp.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ padding: "0.5rem 1.25rem", fontSize: "0.68rem" }}
                >
                  VISIT SITE <FaExternalLinkAlt size={8} style={{ marginLeft: "6px" }} />
                </a>
              </Magnetic>
            </div>

            <p style={{ color: "var(--fg-color)", fontSize: "1rem", lineHeight: "1.65", marginBottom: "2.2rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
              {activeExp.about}
            </p>

            {/* key deliverables list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {activeExp.responsibilities.map((resp, rIdx) => (
                <div key={rIdx} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "1.5rem" }} className="experience-desc-mobile">
                  <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--primary-color)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: "600", marginTop: "0.25rem" }}>
                    // {resp.title}
                  </span>
                  <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)", lineHeight: "1.55", margin: 0 }}>
                    {resp.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Minimal tech tags */}
            <div style={{ marginTop: "3rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {activeExp.tech.map((t, tIdx) => (
                <span key={tIdx} className="tech-tag-minimal">
                  {t}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
