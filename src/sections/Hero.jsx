"use client";

import React, { useState, useEffect, useRef } from "react";
const profile_photo = "/profile_photo.png";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";
import Magnetic from "../components/Magnetic";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);
  
  // 3D Card Rotation State
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  const phrases = [
    "Engineering Team Lead.",
    "Full Stack Developer.",
    "AI Systems Builder.",
    "Frontend Architect."
  ];

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const currentIdx = loopNum % phrases.length;
      const fullPhrase = phrases[currentIdx];

      if (!isDeleting) {
        setText(fullPhrase.substring(0, text.length + 1));
        setTypingSpeed(90);

        if (text === fullPhrase) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Hold phrase longer
          return;
        }
      } else {
        setText(fullPhrase.substring(0, text.length - 1));
        setTypingSpeed(45);

        if (text === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // Handle 3D Perspective Rotation
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse relative X inside card
    const y = e.clientY - rect.top;  // Mouse relative Y inside card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt limit angles (degrees)
    const tiltX = ((centerY - y) / centerY) * 15; 
    const tiltY = ((x - centerX) / centerX) * 15; 

    setRotate({ x: tiltX, y: tiltY });
    
    // Counter-translate image for parallax depth
    setImageOffset({
      x: ((x - centerX) / centerX) * -8,
      y: ((y - centerY) / centerY) * -8,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setImageOffset({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="hero-section" style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="hero-content">
        
        {/* Left Column: Typography & Bio */}
        <div className="hero-text-block" style={{ textAlign: "left" }}>
          
          {/* Subtitle tag */}
          <div className="reveal-mask" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.72rem", fontWeight: "600", marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="status-indicator"></span>
            <span>[ DIGITAL PORTFOLIO / 2026 ]</span>
          </div>
          
          {/* Main Large Typography */}
          <h1 className="track-expand hero-title" style={{ color: "var(--fg-color)" }}>
            Atul Sagotra.
          </h1>
          
          <h2 style={{ fontSize: "1.65rem", fontWeight: "400", color: "var(--fg-muted)", marginBottom: "2rem", fontFamily: "var(--font-mono)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>//</span>
            <span className="typewriter" style={{ color: "var(--fg-color)", fontWeight: "600" }}>{text}</span>
          </h2>
          
          <p style={{ color: "var(--fg-muted)", fontSize: "1.08rem", lineHeight: "1.65", maxWidth: "620px", marginBottom: "3rem" }}>
            A results-driven Frontend Architect and Engineering Lead with 6+ years of professional experience. 
            I specialize in crafting high-performance React/Next.js systems, scaling micro-frontend architectures, 
            and delivering robust enterprise software solutions.
          </p>
  
          {/* Action buttons */}
          <div className="hero-actions" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Magnetic scale={0.25}>
              <a href="#contact" className="btn btn-primary">
                Inquire
              </a>
            </Magnetic>
            
            <Magnetic scale={0.3}>
              <a 
                href="https://drive.google.com/file/d/1SMWUJuDXfYiwqEbUkrsMZKpY7z_vnVUD/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Get Resume <FaFileDownload size={11} />
              </a>
            </Magnetic>
          </div>
  
          {/* Social connections */}
          <div className="hero-socials" style={{ marginTop: "3.5rem", display: "flex", gap: "1.75rem" }}>
            <Magnetic scale={0.45}>
              <a href="https://github.com/atulsagotra" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "var(--fg-muted)", fontSize: "1.25rem", transition: "color 0.3s", display: "inline-block" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-color)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}>
                <FaGithub />
              </a>
            </Magnetic>

            <Magnetic scale={0.45}>
              <a href="https://linkedin.com/in/atulsagotra" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--fg-muted)", fontSize: "1.25rem", transition: "color 0.3s", display: "inline-block" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-color)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}>
                <FaLinkedin />
              </a>
            </Magnetic>

            <Magnetic scale={0.45}>
              <a href="mailto:atulsagotra774@gmail.com" aria-label="Email" style={{ color: "var(--fg-muted)", fontSize: "1.25rem", transition: "color 0.3s", display: "inline-block" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--fg-color)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--fg-muted)"}>
                <FaEnvelope />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: 3D Perspective Portrait Card */}
        <div style={{ display: "flex", justifyContent: "center" }} className="tilt-wrapper">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card"
            style={{ 
              position: "relative", 
              width: "280px", 
              height: "360px", 
              borderRadius: "4px", 
              overflow: "hidden", 
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
              transition: "transform 0.15s ease-out, border-color 0.4s ease",
            }}
          >
            {/* Technical grid blueprint corner decorators */}
            <div className="grid-corner corner-tl"></div>
            <div className="grid-corner corner-tr"></div>
            <div className="grid-corner corner-bl"></div>
            <div className="grid-corner corner-br"></div>

            {/* Parallax Portrait Image */}
            <img 
              src={profile_photo} 
              alt="Atul Sagotra" 
              style={{ 
                width: "110%", 
                height: "110%", 
                objectFit: "cover", 
                opacity: 1, 
                filter: "brightness(1)", 
                transition: "filter 0.4s ease, opacity 0.4s ease, transform 0.15s ease-out",
                transform: `translate3d(${imageOffset.x}px, ${imageOffset.y}px, 0) scale(1.05)`,
                position: "absolute",
                top: "-5%",
                left: "-5%",
              }} 
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)";
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
