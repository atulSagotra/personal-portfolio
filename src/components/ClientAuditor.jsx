"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

const QUICK_PROMPTS = [
  { label: "Can you lead large-scale project architecture?", query: "large_projects" },
  { label: "How do you define workflows for engineering teams?", query: "team_workflows" },
  { label: "How do you deliver projects in shorter timeframes?", query: "accelerated_delivery" },
  { label: "What is your core frontend tech stack?", query: "tech_stack" }
];

export default function ClientAuditor() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am Atul's AI Assistant, connected to his local WebMCP profile. You can ask me anything about his projects, skills, or availability.",
      logs: []
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      let logs = [];
      const query = textToSend.toLowerCase();

      if (query.includes("large") || query.includes("scale") || query.includes("big") || query === "large_projects") {
        logs = [
          "WebMCP: Querying architecture history...",
          "WebMCP: Found 3 large-scale system migrations"
        ];
        responseText = `Yes, Atul has extensive experience leading large-scale projects:
• **Micro-frontend Architecture**: Engineered modular systems using Webpack Module Federation, breaking massive monolothic applications into decoupled sub-apps to scale engineering capacity.
• **High-Concurrence Logistical Boards**: Architected mission-critical real-time logistics Orderboard, Tripboard, and Fleet inventories at Charger Logistics, supporting thousands of drivers and dispatchers.
• **Scalable Client Booking Apps**: Delivered salon client booking apps and merchant dashboards for SportsClips from scratch, supporting high transaction volumes and real-time operations.`;
      }
      else if (query.includes("workflow") || query.includes("team") || query === "team_workflows") {
        logs = [
          "WebMCP: Accessing processes playbook...",
          "WebMCP: Process matches 'AGILE_AI_HYBRID'"
        ];
        responseText = `Atul establishes workflows that align engineering teams and accelerate roadmap delivery:
• **AI-Augmented Execution**: Designs workflows using AI tools (Claude, Cursor, custom team context pools) effectively, boosting developer delivery speed by 30-40%.
• **Module-Federated Deployments**: Establishes isolated build & deployment pipelines so sub-teams can deploy features independently without release bottlenecks.
• **Mentorship & Quality Standards**: Structures developer onboarding, code review standards, and comprehensive automated test suites to ensure standard code quality.`;
      }
      else if (query.includes("short") || query.includes("duration") || query.includes("fast") || query.includes("time") || query.includes("accelerat") || query === "accelerated_delivery") {
        logs = [
          "WebMCP: Checking performance timelines...",
          "WebMCP: Average delivery acceleration: +35%"
        ];
        responseText = `Atul specializes in accelerating engineering delivery times without compromising standard reliability:
• **Modular UI Component Reusability**: Shipped ~70% of Pasarpolis' flagship B2C TAPINSURE mobile-web app in just 3 months by building a pre-scaffolded, modular design system.
• **Pre-Coding Scoping**: Leverages AI models to perform dry-runs of edge cases and structure unit test mocks prior to code implementation.
• **Automated CI/CD**: Tight DevOps alignment (Docker, Git, Webpack caching, Vercel) ensures clean pipeline execution to reduce testing overhead and deployment delays.`;
      }
      else if (query.includes("tech") || query.includes("skill") || query === "tech_stack") {
        logs = [
          "WebMCP: Executed get_technical_skills()",
          "WebMCP: Returned 4 architecture categories, 14 lead variables"
        ];
        responseText = `Atul is an Engineering Team Lead and Frontend Architect. Core capability sets:
• Frontend Architecture: React, Next.js, Micro-frontends (Module Federation), TypeScript, CSS/Design Systems.
• AI Systems & Tooling: AI Agent Orchestration (Claude, Custom GPTs), AI-Driven Workflows (code generation, prompt structures), Custom Team AI Assistants.
• Leadership & Workflows: Technical Scoping, Architecture Planning & Scoping, Mentorship, Team Workflows, Standardizing Code Quality.
• Backend & DevOps: Node.js, Python, Databases (Firestore, PostgreSQL), REST APIs, CI/CD, Docker, Git.`;
      } 
      else if (query.includes("avail") || query.includes("contract") || query.includes("work") || query.includes("rate") || query === "availability") {
        logs = [
          "WebMCP: Executed get_developer_profile()",
          "WebMCP: Availability state matches 'ACTIVE_INTERVIEWING'"
        ];
        responseText = "Yes! Atul is currently open to senior/lead developer roles, freelance contracts, and full-time employment. Located in Brampton, ON (Canada), and fully authorized to work locally or remotely. Contact: **atulsagotra774@gmail.com**.";
      } 
      else if (query.includes("tap") || query.includes("pasarp") || query === "tapinsure") {
        logs = [
          "WebMCP: Executed get_work_experience() for company: 'Pasarpolis'"
        ];
        responseText = `At Pasarpolis, Atul was the Lead Front-end Engineer for TAPINSURE mobile-web app.
Key achievements:
• Shipped ~70% of Next.js frontend code from scratch in 3 months.
• Structured micro-frontend modules reducing deployment times by 40%.
• Delivered responsive layouts with 98/100 Lighthouse performance.`;
      } 
      else if (query.includes("bio") || query.includes("education") || query.includes("location") || query.includes("who is")) {
        logs = [
          "WebMCP: Executed get_developer_profile()"
        ];
        responseText = "Atul Sagotra: Engineering Lead with 6+ years of experience. Graduated B.Tech in CS from Chandigarh Group of Colleges. Currently located in Brampton, ON (Canada). Formerly at Charger Logistics, Material Plus, and Pasarpolis.";
      } 
      else {
        logs = [
          "WebMCP: Querying profile records..."
        ];
        responseText = `Atul is an Engineering Team Lead and Frontend Architect with 6+ years of experience. He specializes in React/Next.js systems, AI-driven developer workflows, and team process optimizations. Contact: **atulsagotra774@gmail.com**.`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: responseText, logs: logs }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="ai-auditor" className="scroll-reveal" style={{ padding: "3.5rem 0" }}>
      
      {/* Header */}
      <div style={{ textAlign: "left", marginBottom: "4rem" }}>
        <h2 className="reveal-mask" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: "600", marginBottom: "0.5rem" }}>
          <span>[ AI CAPABILITY AUDIT ]</span>
        </h2>
        <h3 style={{ fontSize: "2.8rem", fontWeight: "800", color: "var(--fg-color)", letterSpacing: "-0.02em" }}>MCP Agent.</h3>
      </div>

      <div className="asymmetric-grid">
        
        {/* Left Column: Context info */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--fg-color)", marginBottom: "1.25rem", fontFamily: "var(--font-mono)" }}>
            // MODEL_CONTEXT_PROTOCOL
          </h4>
          <p style={{ color: "var(--fg-muted)", fontSize: "1.02rem", lineHeight: "1.7", marginBottom: "2.5rem" }}>
            This website is fully configured with the **Model Context Protocol (WebMCP)**. AI agents crawling this portfolio can discover and invoke local profile tools in real-time to audit Atul's capabilities and work history.
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {QUICK_PROMPTS.map((p, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(p.label)}
                disabled={isTyping}
                style={{
                  background: "transparent",
                  border: "1px solid var(--btn-secondary-border)",
                  borderRadius: "2px",
                  padding: "0.6rem 1.1rem",
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                  color: "var(--fg-muted)",
                  transition: "all 0.3s ease"
                }}
                className="quick-prompt-btn interactive-node"
              >
                &gt; {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Dialog Box */}
        <div 
          className="glass-card"
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            height: "440px", 
            overflow: "hidden", 
            borderRadius: "4px", 
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
            transition: "border-color 0.4s ease"
          }}
        >
          {/* Tech Corners */}
          <div className="grid-corner corner-tl"></div>
          <div className="grid-corner corner-tr"></div>
          <div className="grid-corner corner-bl"></div>
          <div className="grid-corner corner-br"></div>

          {/* Simple header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--card-border)", padding: "12px 1.5rem" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--fg-color)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              WebMCP Console
            </span>
            <span style={{ fontSize: "0.65rem", color: "var(--success-color)", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="status-indicator"></span> ONLINE
            </span>
          </div>

          {/* Messages Console */}
          <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem", background: "var(--bg-color)" }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%"
              }}>
                {m.sender === "user" ? (
                  <div style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    color: "var(--fg-color)",
                    padding: "0.6rem 1rem",
                    borderRadius: "2px",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-mono)"
                  }}>
                    &gt; {m.text}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {m.logs && m.logs.length > 0 && (
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--fg-muted)", borderLeft: "1px solid var(--card-border)", paddingLeft: "8px" }}>
                        {m.logs.map((log, lIdx) => (
                          <div key={lIdx}>{log}</div>
                        ))}
                      </div>
                    )}
                    <div style={{
                      color: "var(--fg-muted)",
                      padding: "0.25rem 0",
                      fontSize: "0.88rem",
                      whiteSpace: "pre-line",
                      lineHeight: "1.5"
                    }}>
                      {m.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--fg-muted)" }}>[AGENT_PROCESSING]</span>
                <span className="typing-dot" style={{ width: "3px", height: "3px", background: "var(--fg-color)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out" }}></span>
                <span className="typing-dot" style={{ width: "3px", height: "3px", background: "var(--fg-color)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out 0.2s" }}></span>
                <span className="typing-dot" style={{ width: "3px", height: "3px", background: "var(--fg-color)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out 0.4s" }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ borderTop: "1px solid var(--card-border)", padding: "12px 1.5rem", display: "flex", gap: "0.5rem", background: "var(--card-bg)" }}>
            <span style={{ color: "var(--fg-color)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>&gt;</span>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask agent..."
              disabled={isTyping}
              style={{
                flexGrow: 1,
                background: "transparent",
                border: "none",
                color: "var(--fg-color)",
                fontSize: "0.85rem",
                outline: "none",
                fontFamily: "var(--font-mono)",
                padding: 0
              }}
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={isTyping || !input.trim()}
              style={{
                background: "transparent",
                border: "none",
                color: input.trim() ? "var(--fg-color)" : "var(--fg-muted)",
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0
              }}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        .quick-prompt-btn:hover {
          background: var(--btn-secondary-hover-bg) !important;
          border-color: var(--primary-color) !important;
          color: var(--fg-color) !important;
        }
      `}</style>
    </section>
  );
}
