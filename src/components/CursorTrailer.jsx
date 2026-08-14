"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CursorTrailer() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  // Real mouse coordinates
  const mouse = useRef({ x: 0, y: 0 });
  // Damped coordinates for outer ring (LERP)
  const ringPos = useRef({ x: 0, y: 0 });
  
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState(""); // "", "view", "link", "send", "click"
  
  // Snapping state
  const [isSnapped, setIsSnapped] = useState(false);
  const [snapRect, setSnapRect] = useState({ left: 0, top: 0, width: 0, height: 0, borderRadius: "4px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return; // Disable custom cursor on mobile

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Watch hovered elements to apply snappiness or badges
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Find closest anchor or button or custom nodes
      const interactiveEl = target.closest("a") || target.closest("button") || target.closest(".interactive-node");
      const projectCard = target.closest(".glass-card") && target.closest("#projects");
      const contactSubmit = target.closest(".btn-submit");

      if (interactiveEl) {
        // Snap configuration
        const rect = interactiveEl.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(interactiveEl);
        const borderRadius = computedStyle.borderRadius || "4px";
        
        setIsSnapped(true);
        setSnapRect({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          borderRadius: borderRadius,
        });

        if (interactiveEl.tagName === "A" && !interactiveEl.href.includes("#")) {
          setHoverType("link");
        } else {
          setHoverType("click");
        }
      } else if (projectCard) {
        setIsSnapped(false);
        setHoverType("view");
      } else if (contactSubmit) {
        // Already snapped through button, but set type to send
        setHoverType("send");
      } else {
        setIsSnapped(false);
        setHoverType("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Inner dot follows mouse with zero delay
        dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
        dot.style.opacity = isVisible ? "1" : "0";

        if (isSnapped) {
          // Snapped state: outer ring wraps the element perfectly
          // Calculate center of element
          const targetX = snapRect.left + snapRect.width / 2;
          const targetY = snapRect.top + snapRect.height / 2;

          // Slide snap frame to target center using LERP
          ringPos.current.x += (targetX - ringPos.current.x) * 0.25;
          ringPos.current.y += (targetY - ringPos.current.y) * 0.25;

          ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
          ring.style.width = `${snapRect.width + 10}px`;
          ring.style.height = `${snapRect.height + 10}px`;
          ring.style.borderRadius = snapRect.borderRadius;
          ring.style.backgroundColor = "var(--cursor-bg)";
          ring.style.borderColor = "var(--cursor-border)";
          ring.style.opacity = isVisible ? "1" : "0";
        } else {
          // Normal state: outer ring trails mouse
          ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12;
          ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12;

          ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
          ring.style.borderRadius = "50%";
          ring.style.backgroundColor = "transparent";
          ring.style.borderColor = "var(--cursor-border-inactive)";
          ring.style.opacity = isVisible ? "1" : "0";

          if (hoverType === "view") {
            ring.style.width = "60px";
            ring.style.height = "60px";
            ring.style.backgroundColor = "rgba(99, 102, 241, 0.15)";
            ring.style.borderColor = "var(--primary-color)";
          } else {
            ring.style.width = "26px";
            ring.style.height = "26px";
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isSnapped, snapRect, hoverType]);

  // Contextual text badge helper
  const renderBadgeText = () => {
    switch (hoverType) {
      case "view":
        return "VIEW";
      case "link":
        return "GO";
      case "send":
        return "SEND";
      default:
        return null;
    }
  };

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "var(--cursor-color)",
          pointerEvents: "none",
          zIndex: 10001,
          opacity: 0,
          transition: "opacity 0.2s ease, width 0.2s ease, height 0.2s ease",
        }}
      />

      {/* Outer Snapping Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "26px",
          height: "26px",
          border: "1px solid var(--cursor-border-inactive)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, border-radius 0.3s ease",
        }}
      >
        {/* Hover action text */}
        {renderBadgeText() && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              fontWeight: 800,
              color: "var(--cursor-color)",
              letterSpacing: "0.08em",
              position: "absolute",
              animation: "fadeIn 0.2s ease forwards",
            }}
          >
            {renderBadgeText()}
          </span>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
