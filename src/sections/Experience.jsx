import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Experience() {
  const experiences = [
    {
      company: "Pasarpolis",
      role: "Lead Front-end Engineer (B2C)",
      period: "2023 - Present",
      location: "Gurugram, Haryana (India)",
      about: "Indonesia's first and leading Insurance Technology (Insurtech) company with 40+ partners, making insurance accessible and simple.",
      link: "https://pasarpolis.io/",
      logo: "https://storage.googleapis.com/pp_img/website/pp-logo-yellow-cap.png",
      responsibilities: [
        {
          title: "B2C Mobile-Web Lead",
          desc: "Leads the frontend of the B2C mobile application built with Next.js. Developed ~70% of the frontend code to deliver the B2C mobile application (TAPINSURE) in 3 months.",
        },
        {
          title: "Architecture & Micro-frontends",
          desc: "Created micro-frontend systems to solve common integration problems for multiple corporate clients, reducing deployment time by ~40%.",
        },
        {
          title: "Component Libraries",
          desc: "Built custom reusable component libraries that reduced overall developer integration timelines by 10-15%.",
        },
        {
          title: "Product Alignment",
          desc: "Collaborated closely with the product and engineering teams to identify critical bottlenecks, launching a product with 500+ downloads within its first week.",
        }
      ],
      tech: ["Next.js", "React", "JavaScript", "Styled Components", "Webpack", "REST APIs"]
    },
    {
      company: "Xoriant",
      role: "Software Engineer",
      period: "2021 - 2023",
      location: "Pune, Maharashtra (India)",
      about: "Silicon Valley-headquartered product engineering and technology services firm partnering with Microsoft, AWS, Oracle, Google, and Cisco.",
      link: "https://www.xoriant.com/",
      logo: "https://www.xoriant.com/cdn/ff/h8j4-N1kFokMkyOEiHIQVjpbRE5vP8EOCe4cCjK-sP4/1618405020/public/Xoriant-Logo.png",
      responsibilities: [
        {
          title: "Submodule Leadership",
          desc: "Assisted in building full-scale web applications, leading specific product modules and delivering client features on schedule.",
        },
        {
          title: "React micro-frontends",
          desc: "Designed and integrated independent frontend submodules using React that are shared across various parent platforms.",
        },
        {
          title: "Tailwind UI Integration",
          desc: "Adopted Tailwind CSS to deliver custom pixel-perfect layouts, maximizing UI consistency across dynamic browser configurations.",
        }
      ],
      tech: ["React", "JavaScript", "Tailwind CSS", "Redux", "Micro-frontends", "Git"]
    },
    {
      company: "T-Systems",
      role: "Software Engineer Intern",
      period: "2020 - 2021",
      location: "Pune, Maharashtra (India)",
      about: "ICT subsidiary of Deutsche Telekom, driving digital transformation with end-to-end IT solutions across global industries.",
      link: "https://www.t-systems.com/",
      logo: "https://www.t-systems.com/resource/crblob/218588/b0e71f03622a178044f0a0f7e3f1f391/logo-t-systems-magenta.svg-data.svg",
      responsibilities: [
        {
          title: "Campus to Corporate",
          desc: "Completed orientation covering the Software Development Life Cycle (SDLC), code reviews, and enterprise guidelines.",
        },
        {
          title: "UI Prototypes",
          desc: "Gained hands-on experience translating UI/UX wireframes into functional web prototypes using HTML, CSS, and React.",
        },
        {
          title: "Technical Mentorship",
          desc: "Received training under senior staff members on best practices in codebase structure, accessibility, and documentation.",
        }
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "React", "SDLC", "Agile"]
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <section id="experience" className="experience-section scroll-reveal">
      <h2 className="section-title">Work Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((exp, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className={`timeline-item ${isExpanded ? "active" : ""}`}>
              <div className="timeline-dot"></div>
              
              <div className="timeline-content glass-card">
                <div className="timeline-header-block" onClick={() => toggleExpand(idx)}>
                  <div className="company-logo-block">
                    <img src={exp.logo} alt={exp.company} className="company-logo" />
                  </div>
                  
                  <div className="timeline-summary">
                    <h3 className="company-name">{exp.company}</h3>
                    <h4 className="job-role">{exp.role}</h4>
                    
                    <div className="timeline-meta">
                      <span><FaCalendarAlt /> {exp.period}</span>
                      <span><FaMapMarkerAlt /> {exp.location}</span>
                    </div>
                  </div>

                  <div className="expand-icon-wrapper">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="timeline-details">
                    <p className="company-about">{exp.about}</p>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="company-link">
                      Visit {exp.company} <FaExternalLinkAlt size={10} style={{ marginLeft: "4px" }} />
                    </a>

                    <h5 className="responsibilities-title">Key Contributions</h5>
                    <ul className="responsibilities-list">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>
                          <strong>{resp.title}:</strong> {resp.desc}
                        </li>
                      ))}
                    </ul>

                    <div className="tech-tags">
                      {exp.tech.map((t, tIdx) => (
                        <span key={tIdx} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
