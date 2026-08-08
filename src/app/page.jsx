"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../sections/Hero";
import Terminal from "../components/Terminal";
import ProjectsShowcase from "../components/ProjectsShowcase";
import ClientAuditor from "../components/ClientAuditor";
import PerformanceStats from "../components/PerformanceStats";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Skills from "../sections/Skills";
import Contact from "../sections/Contact";
import useWebMCP from "../hooks/useWebMCP";

export default function Home() {
  useWebMCP();

  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("theme") || "dark";
      }
      return "dark";
    } catch (_) {
      return "dark";
    }
  });

  // Apply theme to HTML tag
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#060608");
    } else {
      root.classList.remove("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f5f5f9");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (_) {}
  }, [theme]);

  // System theme changes listener
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add("dark");
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#060608");
      } else {
        root.classList.remove("dark");
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f5f5f9");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Fallback Scroll-Reveal Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.CSS && CSS.supports("(animation-timeline: view()) and (animation-range: entry)")) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(".scroll-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 8rem 1.5rem" }}>
        <Hero />
        <Terminal />
        <ProjectsShowcase />
        <ClientAuditor />
        <PerformanceStats />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
