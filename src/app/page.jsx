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
import CyberCanvas from "../components/CyberCanvas";
import CursorTrailer from "../components/CursorTrailer";
import SandboxHUD from "../components/SandboxHUD";

export default function Home() {
  useWebMCP();

  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("theme") || "light";
      }
      return "light";
    } catch (_) {
      return "light";
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
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#020204");
    } else {
      root.classList.remove("dark");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#020204");
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

  // Force scroll to top on page load (prevents browser restoring old scroll position)
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Scroll-Reveal Intersection Observer (robust: handles late-rendered elements)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observedSet = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(".scroll-reveal");
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial pass
    observeAll();

    // Re-check after a short delay for late hydration
    const timer = setTimeout(observeAll, 300);

    // Watch for new elements added to DOM
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <CyberCanvas />
      <SandboxHUD />
      <CursorTrailer />
      <div className="film-grain" />
      
      {/* Minimalist vertical section index tracker */}
      <div className="vertical-nav" style={{ position: "fixed", right: "2.5rem", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "1.25rem", zIndex: 100, mixBlendMode: "difference" }}>
        <a href="#home" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#ffffff", opacity: 0.5, letterSpacing: "0.05em", textDecoration: "none" }}>01 / INTRO</a>
        <a href="#experience" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#ffffff", opacity: 0.5, letterSpacing: "0.05em", textDecoration: "none" }}>02 / WORK</a>
        <a href="#performance" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#ffffff", opacity: 0.5, letterSpacing: "0.05em", textDecoration: "none" }}>03 / VITALS</a>
        <a href="#ai-auditor" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#ffffff", opacity: 0.5, letterSpacing: "0.05em", textDecoration: "none" }}>04 / AUDIT</a>
        <a href="#contact" style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#ffffff", opacity: 0.5, letterSpacing: "0.05em", textDecoration: "none" }}>05 / TALK</a>
      </div>

      <main style={{ maxWidth: "980px", margin: "0 auto", padding: "0 2rem 8rem 2rem", position: "relative", zIndex: 1 }}>
        <Hero />
        <ClientAuditor />
        <ProjectsShowcase />
        <About />
        <Experience />
        <Skills />
        <PerformanceStats />
        <Terminal />
        <Contact />
      </main>
    </>
  );
}
