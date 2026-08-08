"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiCpu, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

const QUICK_PROMPTS = [
  { label: "What is your main tech stack?", query: "tech_stack" },
  { label: "Are you open to contract work?", query: "availability" },
  { label: "Tell me about your Tapinsure project.", query: "tapinsure" },
  { label: "What is your education/location?", query: "bio" }
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and executing WebMCP tools
    setTimeout(() => {
      let responseText = "";
      let logs = [];

      const query = textToSend.toLowerCase();

      if (query.includes("tech") || query.includes("skill") || query === "tech_stack") {
        logs = [
          "⚡ Initializing WebMCP tool call...",
          "🔍 Executing tool: get_technical_skills()",
          "📦 Loaded skills payload: { frontend: 7, backend: 3, tools: 3 }"
        ];
        responseText = `Atul is a specialized frontend developer. His core stack includes:
• **Frontend**: ReactJS, NextJS, JavaScript (ES6+), HTML5, CSS3/SCSS, Styled Components, Tailwind CSS.
• **Backend & APIs**: Python, Django, REST API Integration.
• **Tooling**: Webpack (Module Federation), Micro-frontends, Git, Vercel deployments.`;
      } 
      else if (query.includes("avail") || query.includes("contract") || query.includes("work") || query.includes("rate") || query === "availability") {
        logs = [
          "⚡ Initializing WebMCP tool call...",
          "🔍 Executing tool: get_developer_profile()",
          "📦 Loaded availability state: 'ACTIVE_INTERVIEWING'"
        ];
        responseText = "Yes! Atul is currently open to new roles, freelance contract opportunities, and full-time senior/lead developer positions. He is located in Jammu, India, and is fully set up to work remotely for international clients. You can reach out directly via the contact form below or email him at **atulsagotra10@gmail.com**.";
      } 
      else if (query.includes("tap") || query.includes("pasarp") || query === "tapinsure") {
        logs = [
          "⚡ Initializing WebMCP tool call...",
          "🔍 Executing tool: get_work_experience()",
          "📦 Filtering history where company == 'Pasarpolis'"
        ];
        responseText = `At Pasarpolis, Atul was the **Lead Front-end Engineer** for the B2C mobile web application (**TAPINSURE**).
Key Achievements:
• Developed and launched ~70% of the entire app within 3 months.
• Designed micro-frontend modules that decreased release and deployment cycles by 40%.
• Built high-performance pages, securing a 98/100 Lighthouse performance rating.`;
      } 
      else if (query.includes("bio") || query.includes("education") || query.includes("location") || query.includes("who is")) {
        logs = [
          "⚡ Initializing WebMCP tool call...",
          "🔍 Executing tool: get_developer_profile()",
          "📦 Loaded profile data: Atul Sagotra"
        ];
        responseText = "Atul Sagotra has 3+ years of experience leading frontend builds. He graduated with a B.Tech in Computer Science from the Chandigarh Group of Colleges. He is based in Jammu, India, and specializes in high-fidelity user interfaces, micro-frontends, and Vite/Next.js performance optimization.";
      } 
      else {
        logs = [
          "⚡ Initializing WebMCP fallback search...",
          "🔍 Searching local profile context for matches..."
        ];
        responseText = `Thanks for asking! Atul has 3+ years of frontend experience (NextJS/React) and led the TAPINSURE mobile app. For details, try clicking one of the quick prompts or contact him directly at **atulsagotra10@gmail.com**.`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: responseText, logs: logs }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="ai-auditor" style={{ padding: "3rem 0 3rem 0" }}>
      <div style={{ marginBottom: "3rem" }}>
        <p className="text-gradient" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem" }}>
          AI Integration
        </p>
        <h2 style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>Live WebMCP Profile Auditor</h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2.5rem"
      }}>
        {/* Left Side: Explanation */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <FiCpu style={{ color: "var(--primary-color)", fontSize: "1.5rem" }} />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>AI Agent-Ready Protocol</h3>
          </div>
          <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
            This website is fully configured with the **Model Context Protocol (WebMCP)**. AI agents (like Gemini or Claude) browsing this site can discover and run local tools directly on the web page to audit Atul's capabilities.
          </p>
          <div style={{ background: "var(--primary-glow)", borderLeft: "3px solid var(--primary-color)", padding: "1rem", borderRadius: "0 12px 12px 0", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", color: "var(--primary-color)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FiTrendingUp /> For Recruiters & Clients:
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", marginTop: "0.25rem" }}>
              Test the AI's execution of Atul's tools in real time. Select a quick prompt or type your query in the widget.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {QUICK_PROMPTS.map((p, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(p.label)}
                disabled={isTyping}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "20px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  color: "var(--fg-color)",
                  transition: "background 0.2s"
                }}
                className="quick-prompt-btn"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Chat Assistant */}
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", height: "450px", overflow: "hidden" }}>
          {/* Top Panel */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--card-border)", padding: "1.25rem" }}>
            <FiMessageSquare style={{ color: "var(--primary-color)" }} />
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>Atul's WebMCP Agent</div>
              <div style={{ fontSize: "0.75rem", color: "var(--success-color)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <span style={{ width: "6px", height: "6px", background: "var(--success-color)", borderRadius: "50%", display: "inline-block" }}></span>
                Ready to Audit
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flexGrow: 1, overflowY: "auto", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{
                alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%"
              }}>
                {/* User Message */}
                {m.sender === "user" ? (
                  <div style={{
                    background: "var(--primary-color)",
                    color: "white",
                    padding: "0.75rem 1rem",
                    borderRadius: "18px 18px 2px 18px",
                    fontSize: "0.9rem"
                  }}>
                    {m.text}
                  </div>
                ) : (
                  /* AI Message & Tool Logs */
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {m.logs && m.logs.length > 0 && (
                      <div style={{
                        background: "rgba(0,0,0,0.2)",
                        border: "1px solid var(--card-border)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        color: "var(--fg-muted)"
                      }}>
                        {m.logs.map((log, lIdx) => (
                          <div key={lIdx}>{log}</div>
                        ))}
                      </div>
                    )}
                    <div style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      color: "var(--fg-color)",
                      padding: "0.75rem 1rem",
                      borderRadius: "18px 18px 18px 2px",
                      fontSize: "0.9rem",
                      whiteSpace: "pre-line"
                    }}>
                      {m.text}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{
                alignSelf: "flex-start",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                padding: "0.75rem 1.25rem",
                borderRadius: "18px",
                display: "flex",
                gap: "0.25rem",
                alignItems: "center"
              }}>
                <span className="typing-dot" style={{ width: "6px", height: "6px", background: "var(--fg-muted)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out" }}></span>
                <span className="typing-dot" style={{ width: "6px", height: "6px", background: "var(--fg-muted)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out 0.2s" }}></span>
                <span className="typing-dot" style={{ width: "6px", height: "6px", background: "var(--fg-muted)", borderRadius: "50%", display: "inline-block", animation: "bounce 1.4s infinite ease-in-out 0.4s" }}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ borderTop: "1px solid var(--card-border)", padding: "0.75rem 1.25rem", display: "flex", gap: "0.5rem" }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask me something..."
              disabled={isTyping}
              style={{
                flexGrow: 1,
                background: "transparent",
                border: "none",
                color: "var(--fg-color)",
                fontSize: "0.9rem",
                outline: "none"
              }}
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={isTyping || !input.trim()}
              style={{
                background: "transparent",
                border: "none",
                color: input.trim() ? "var(--primary-color)" : "var(--fg-muted)",
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="Send message"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
      
      {/* Typing animation styling */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        .quick-prompt-btn:hover {
          background: var(--primary-glow) !important;
          border-color: var(--primary-color) !important;
        }
      `}</style>
    </section>
  );
}
