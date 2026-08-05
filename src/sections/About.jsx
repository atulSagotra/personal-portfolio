import React from "react";
import { FaGraduationCap, FaCode, FaRocket, FaNetworkWired } from "react-icons/fa";

export default function About() {
  const cards = [
    {
      icon: <FaGraduationCap />,
      title: "Education",
      desc: "B.Tech in Computer Science Engineering from Chandigarh Group of Colleges.",
    },
    {
      icon: <FaCode />,
      title: "Clean Code",
      desc: "Strong expertise in building reusable components and robust architectures.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Micro-frontends",
      desc: "Proven experience breaking monolithic applications into independent frontend apps.",
    },
    {
      icon: <FaRocket />,
      title: "Performance",
      desc: "Optimizing Core Web Vitals to deliver super-fast, mobile-friendly customer experiences.",
    },
  ];

  return (
    <section id="about" className="about-section scroll-reveal">
      <h2 className="section-title">About Me</h2>
      <div className="about-container">
        <div className="about-text-content">
          <p>
            Hello! I'm <strong>Atul Sagotra</strong>, a software engineer based in Jammu, India. 
            My passion is writing clean, efficient code that runs flawlessly across a variety of devices. 
            I specialize in the JavaScript/TypeScript ecosystem, with extensive focus on building responsive frontends 
            using <strong>React</strong> and <strong>Next.js</strong>.
          </p>
          <p>
            Currently, I am working with the talented team at{" "}
            <a href="https://pasarpolis.io/" target="_blank" rel="noopener noreferrer" className="inline-link">
              Pasarpolis
            </a>
            , Indonesia's leading insurtech firm, where I lead frontend development for the B2C mobile-web ecosystem. 
            Throughout my career, I've worked in fast-paced startups and structured enterprise environments, giving me a 
            well-rounded perspective on product lifecycles and software craft.
          </p>
        </div>

        <div className="about-cards-grid">
          {cards.map((card, idx) => (
            <div key={idx} className="about-card glass-card">
              <div className="card-icon-wrapper">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
