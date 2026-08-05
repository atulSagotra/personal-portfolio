import React, { useState, useEffect } from "react";
import profile_photo from "../Static/Images/profile_photo.png";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Software Engineer.",
    "Full Stack Developer.",
    "Micro-frontend Builder.",
    "Problem Solver."
  ];

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const currentIdx = loopNum % phrases.length;
      const fullPhrase = phrases[currentIdx];

      if (!isDeleting) {
        setText(fullPhrase.substring(0, text.length + 1));
        setTypingSpeed(100);

        if (text === fullPhrase) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
          return;
        }
      } else {
        setText(fullPhrase.substring(0, text.length - 1));
        setTypingSpeed(50);

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

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-avatar-wrapper">
          <img src={profile_photo} alt="Atul Sagotra" className="hero-avatar" />
          <div className="hero-avatar-glow"></div>
        </div>
        
        <div className="hero-text-block">
          <h2 className="hero-greeting">Hi, my name is</h2>
          <h1 className="hero-title text-gradient">Atul Sagotra.</h1>
          <h2 className="hero-subtitle">
            I am a <span className="typewriter">{text}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-desc">
            A results-driven Front-End / Full-Stack Engineer with 3+ years of professional experience. 
            I specialize in crafting high-performance, modular web applications and scaling micro-frontends 
            that deliver exceptional customer experiences.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a 
              href="https://drive.google.com/file/d/1SMWUJuDXfYiwqEbUkrsMZKpY7z_vnVUD/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              <FaFileDownload style={{ marginRight: "8px" }} /> Download CV
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/atulsagotra" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/atulsagotra" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:atulsagotra10@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
