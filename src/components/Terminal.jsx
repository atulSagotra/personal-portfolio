"use client";

import React, { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: "output", text: "Atul OS v3.0.0 (Minimal Command Shell)" },
    { type: "output", text: "Type 'help' to review available commands." },
  ]);
  const [input, setInput] = useState("");
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = terminalBodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;

    const trimmedInput = input.trim();
    const command = trimmedInput.toLowerCase().split(" ")[0];
    const newHistory = [...history, { type: "input", text: trimmedInput }];

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let output = "";
    switch (command) {
      case "":
        output = "";
        break;
      case "help":
        output = `Available commands:
  - about       : Executive summary profile
  - skills      : Technical stack metrics
  - experience  : Selective career timeline
  - contact     : Direct coordinates and email
  - clear       : Wipe shell terminal logs`;
        break;
      case "about":
        output = "Atul Sagotra: Engineering Lead & Frontend Architect with 6+ years of experience. Specializing in high-performance Next.js and micro-frontends. Located in Brampton, ON (Canada).";
        break;
      case "skills":
        output = "Frontend Architecture (React, Next.js, Micro-frontends/Module Federation), AI Orchestration (Claude, GPTs, Custom Agents), Leadership Workflows (Technical Scoping, Roadmaps, Mentorship), Backend & DevOps (Node.js, Databases, Git, CI/CD).";
        break;
      case "experience":
        output = `Timeline:
  1. Charger Logistics (Canada) - Team Lead (Aug 2024 - Present)
  2. Material Plus (Gurugram) - Senior Web Developer (Feb 2023 - July 2024)
  3. Pasarpolis (Gurugram) - B2C Front-end Lead (2023)
  4. Xoriant (Pune) - Software Engineer (2021 - 2023)`;
        break;
      case "contact":
        output = "Email: atulsagotra774@gmail.com | LinkedIn: linkedin.com/in/atulsagotra | GitHub: github.com/atulsagotra";
        break;
      default:
        output = `Unknown query: '${command}'. Type 'help' for instructions.`;
    }

    if (output) {
      newHistory.push({ type: "output", text: output });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section className="terminal-section scroll-reveal" style={{ padding: "4rem 0" }}>
      <div 
        onClick={focusInput}
        className="glass-card"
        style={{ 
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "4px",
          overflow: "hidden", 
          transition: "border-color 0.4s ease",
          cursor: "text"
        }}
      >
        {/* Technical grid blueprint corner decorators */}
        <div className="grid-corner corner-tl"></div>
        <div className="grid-corner corner-tr"></div>
        <div className="grid-corner corner-bl"></div>
        <div className="grid-corner corner-br"></div>

        {/* Simple Minimal Title Bar */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            padding: "12px 1.5rem", 
            borderBottom: "1px solid var(--card-border)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--fg-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}
        >
          <span>Console // visitor@atulsagotra.dev</span>
          <span style={{ fontSize: "0.65rem", opacity: 0.6, display: "flex", alignItems: "center", gap: "6px" }}>
            <span className="status-indicator" style={{ background: "var(--primary-color)", boxShadow: "0 0 8px var(--primary-color)" }}></span> System Terminal
          </span>
        </div>
        
        {/* Terminal Body */}
        <div 
          ref={terminalBodyRef}
          style={{
            padding: "1.75rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            lineHeight: "1.65",
            minHeight: "220px",
            maxHeight: "340px",
            overflowY: "auto",
            color: "var(--fg-muted)"
          }}
        >
          {history.map((line, idx) => (
            <div key={idx} style={{ marginBottom: "0.4rem" }}>
              {line.type === "input" ? (
                <>
                  <span style={{ color: "var(--fg-color)" }}>&gt; {line.text}</span>
                </>
              ) : (
                <pre style={{ color: "var(--fg-muted)", whiteSpace: "pre-wrap", margin: 0, fontFamily: "inherit" }}>{line.text}</pre>
              )}
            </div>
          ))}
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "var(--fg-color)", marginRight: "8px" }}>&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--fg-color)",
                outline: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                flexGrow: 1,
                padding: 0,
                width: "auto"
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
