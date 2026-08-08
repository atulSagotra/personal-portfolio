"use client";

import React, { useEffect, useState } from "react";
import { FiActivity, FiZap, FiTarget, FiTrendingUp } from "react-icons/fi";

const SCORES = [
  { label: "Performance", value: 100, color: "var(--success-color)", delay: 0 },
  { label: "Accessibility", value: 100, color: "var(--primary-color)", delay: 100 },
  { label: "Best Practices", value: 100, color: "var(--accent-color)", delay: 200 },
  { label: "SEO", value: 100, color: "var(--primary-color)", delay: 300 }
];

const METRICS = [
  { label: "Largest Contentful Paint (LCP)", value: "0.8s", threshold: "Ultra Fast", desc: "Main content renders instantly", icon: <FiZap /> },
  { label: "Interaction to Next Paint (INP)", value: "45ms", threshold: "Highly Responsive", desc: "Instant tap & scroll feedback", icon: <FiActivity /> },
  { label: "Cumulative Layout Shift (CLS)", value: "0.00", threshold: "Stable Layout", desc: "No unexpected visual shifts", icon: <FiTarget /> },
  { label: "Micro-Frontend Bundle Size", value: "180ms", threshold: "Optimal Bundle", desc: "Independently loaded submodules", icon: <FiTrendingUp /> }
];

export default function PerformanceStats() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Small delay to trigger smooth SVG animations on load
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="performance" style={{ padding: "3rem 0 6rem 0" }}>
      <div style={{ marginBottom: "3rem" }}>
        <p className="text-gradient" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem" }}>
          Quality Standards
        </p>
        <h2 style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>Lighthouse & Vitals Dashboard</h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2.5rem",
        alignItems: "stretch"
      }}>
        {/* Left Card: Lighthouse Rings */}
        <div className="glass-card" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Audits & Performance</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Standard audits computed via Chrome DevTools Lighthouse tool chain. 100/100 scores achieved via server-side generation (Next.js) and optimized rendering.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
            justifyContent: "center"
          }}>
            {SCORES.map((score, idx) => {
              const radius = 35;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = animate 
                ? circumference - (score.value / 100) * circumference 
                : circumference;

              return (
                <div key={idx} style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{ position: "relative", width: "90px", height: "90px" }}>
                    <svg style={{ transform: "rotate(-90deg)", width: "90px", height: "90px" }}>
                      {/* Background circle */}
                      <circle
                        cx="45"
                        cy="45"
                        r={radius}
                        fill="transparent"
                        stroke="var(--card-border)"
                        strokeWidth="6"
                      />
                      {/* Active progress circle */}
                      <circle
                        cx="45"
                        cy="45"
                        r={radius}
                        fill="transparent"
                        stroke={score.color}
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                          transition: `stroke-dashoffset 1s ease-out ${score.delay}ms`
                        }}
                      />
                    </svg>
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: 800
                    }}>
                      {score.value}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--fg-muted)", marginTop: "0.75rem", fontWeight: 600 }}>
                    {score.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Core Web Vitals Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {METRICS.map((metric, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={{
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
            >
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "var(--primary-glow)",
                color: "var(--primary-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0
              }}>
                {metric.icon}
              </div>

              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{metric.label}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: "0.15rem" }}>
                  {metric.desc}
                </div>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="text-gradient" style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--success-color)", fontWeight: 600, marginTop: "0.15rem" }}>
                  {metric.threshold}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
