"use client";

import React, { useEffect, useState } from "react";
import { FiZap, FiActivity, FiTarget, FiTrendingUp } from "react-icons/fi";

const SCORES = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 }
];

const METRICS = [
  { label: "Largest Contentful Paint", value: "0.8s", threshold: "Optimal", desc: "Hero image loads instantly", icon: <FiZap /> },
  { label: "Interaction to Next Paint", value: "45ms", threshold: "Highly Responsive", desc: "No tap/scroll delays", icon: <FiActivity /> },
  { label: "Cumulative Layout Shift", value: "0.00", threshold: "Stable", desc: "No unexpected element jumps", icon: <FiTarget /> },
  { label: "Initial Micro-bundle Load", value: "180ms", threshold: "Federated", desc: "Optimal network parsing", icon: <FiTrendingUp /> }
];

export default function PerformanceStats() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="performance" className="scroll-reveal" style={{ padding: "6rem 0", position: "relative" }}>
      
      {/* Header */}
      <div style={{ textAlign: "left", marginBottom: "4rem" }}>
        <h2 className="reveal-mask" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: "600", marginBottom: "0.5rem" }}>
          <span>[ METRICS TELEMETRY ]</span>
        </h2>
        <h3 style={{ fontSize: "2.8rem", fontWeight: "800", color: "var(--fg-color)", letterSpacing: "-0.02em" }}>Vitals & Audits.</h3>
      </div>

      <div className="asymmetric-grid">
        
        {/* Left Column: Minimal Audits */}
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem", border: "1px solid var(--card-border)" }}>
          {/* Tech Corners */}
          <div className="grid-corner corner-tl"></div>
          <div className="grid-corner corner-tr"></div>
          <div className="grid-corner corner-bl"></div>
          <div className="grid-corner corner-br"></div>

          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--fg-color)", marginBottom: "0.75rem", fontFamily: "var(--font-mono)" }}>
              // LIGHTHOUSE_ENGINE
            </h4>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: "1.65", marginBottom: "3rem" }}>
              Standard Lighthouse audit results compiled in production using Server-Side rendering (SSR) and optimized bundle federation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {SCORES.map((score, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--fg-muted)", fontFamily: "var(--font-mono)" }}>
                    {score.label}
                  </span>
                  <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--fg-color)", fontFamily: "var(--font-mono)" }}>
                    {score.value} / 100
                  </span>
                </div>
                {/* Thin Linear Progress bar */}
                <div style={{ width: "100%", height: "1px", background: "var(--card-border)", position: "relative" }}>
                  <div 
                    style={{ 
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: animate ? "100%" : "0%",
                      background: "var(--primary-color)",
                      transition: "width 1.8s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Web Vitals Table list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {METRICS.map((metric, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                borderBottom: "1px solid var(--card-border)",
                paddingBottom: "1.5rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{ fontSize: "1.2rem", color: "var(--primary-color)" }}>
                  {metric.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "750", color: "var(--fg-color)" }}>
                    {metric.label}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: "0.25rem" }}>
                    {metric.desc}
                  </p>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--fg-color)", fontFamily: "var(--font-mono)" }}>
                  {metric.value}
                </span>
                <div style={{ fontSize: "0.65rem", color: "var(--fg-muted)", fontFamily: "var(--font-mono)", marginTop: "0.25rem", textTransform: "uppercase" }}>
                  // {metric.threshold}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
