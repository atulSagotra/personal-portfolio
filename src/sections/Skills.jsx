import React, { useState } from "react";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaPython, FaTerminal, FaTools, FaCheckCircle } from "react-icons/fa";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillCategories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend & Languages" },
    { id: "tools", label: "Methodologies & Tools" },
  ];

  const skillsData = [
    { name: "ReactJS", level: 90, category: "frontend", icon: <FaReact /> },
    { name: "NextJS", level: 85, category: "frontend", icon: <FaReact /> },
    { name: "Javascript", level: 88, category: "frontend", icon: <FaJsSquare /> },
    { name: "HTML5", level: 92, category: "frontend", icon: <FaHtml5 /> },
    { name: "CSS3 / SCSS", level: 85, category: "frontend", icon: <FaCss3Alt /> },
    { name: "Python", level: 75, category: "backend", icon: <FaPython /> },
    { name: "Django", level: 70, category: "backend", icon: <FaPython /> },
    { name: "Micro-frontends", level: 88, category: "tools", icon: <FaTerminal /> },
    { name: "Styled Components", level: 85, category: "frontend", icon: <FaCss3Alt /> },
    { name: "Tailwind CSS", level: 80, category: "frontend", icon: <FaCss3Alt /> },
    { name: "Git & Webpack", level: 82, category: "tools", icon: <FaTools /> },
    { name: "REST APIs Integration", level: 88, category: "backend", icon: <FaTools /> },
  ];

  const filteredSkills = activeCategory === "all"
    ? skillsData
    : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="skills-section scroll-reveal">
      <h2 className="section-title">Functional Expertise & Skills</h2>
      
      <div className="skills-intro glass-card">
        <h3 className="intro-title">Core Competencies</h3>
        <ul className="competencies-list">
          <li>
            <FaCheckCircle className="check-icon" /> Developing responsive, mobile-friendly web applications.
          </li>
          <li>
            <FaCheckCircle className="check-icon" /> Designing modular and scalable micro-frontend architectures.
          </li>
          <li>
            <FaCheckCircle className="check-icon" /> Creating optimized web pages focusing on Core Web Vitals (LCP, INP, CLS).
          </li>
          <li>
            <FaCheckCircle className="check-icon" /> Building reusable UI component libraries for large-scale code reuse.
          </li>
        </ul>
      </div>

      <div className="skills-filter">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.map((skill, idx) => (
          <div key={idx} className="skill-card glass-card">
            <div className="skill-icon-name">
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </div>
            
            <div className="skill-level-block">
              <div className="skill-bar-bg">
                <div 
                  className="skill-bar-fill" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
