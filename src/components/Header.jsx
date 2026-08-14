import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCode, FaUser, FaBriefcase, FaGraduationCap, FaEnvelope } from "react-icons/fa";

export default function Header({ theme, setTheme }) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Monitor which section is in view
  useEffect(() => {
    const sections = ["home", "experience", "skills", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section is in the middle of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Monitor scroll for shadow/opacity changes on header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navItems = [
    { id: "home", label: "Home", icon: <FaCode /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "skills", label: "Skills", icon: <FaGraduationCap /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <a href="#home" className="logo">
          <span className="logo-brackets">&lt;</span>
          <span className="logo-text">Atul</span>
          <span className="logo-brackets">/&gt;</span>
        </a>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        <button 
          onClick={toggleTheme} 
          className="theme-toggle" 
          aria-label="Toggle Theme"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon" />}
        </button>
      </div>
    </header>
  );
}
