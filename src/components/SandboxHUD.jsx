"use client";

import React, { useState, useEffect } from "react";
import { FiSliders, FiMinimize2, FiPlay, FiPause, FiLogOut } from "react-icons/fi";
import Magnetic from "./Magnetic";

export default function SandboxHUD() {
  const [isMinimized, setIsMinimized] = useState(false);

  // Game Mode States
  const [gameActive, setGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameState, setGameState] = useState("idle"); // "idle", "active", "gameover"
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Load High Score on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("snake-high-score");
      if (saved) setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Sync window configs for CyberCanvas to access
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sandboxConfig = {
        gameActive,
        isPaused,
        gameState
      };
    }
  }, [gameActive, isPaused, gameState]);

  // Listen to Snake Canvas events
  useEffect(() => {
    const handleGameEvent = (e) => {
      if (!e.detail) return;
      const { type, score: eventScore } = e.detail;

      if (type === "score-change") {
        setScore(eventScore);
      } else if (type === "game-over") {
        setGameState("gameover");
        setGameActive(false);

        // Save high score if beaten
        const savedHigh = parseInt(localStorage.getItem("snake-high-score") || "0", 10);
        if (eventScore > savedHigh) {
          localStorage.setItem("snake-high-score", eventScore.toString());
          setHighScore(eventScore);
        }
      }
    };

    window.addEventListener("webshooter-game-event", handleGameEvent);
    return () => window.removeEventListener("webshooter-game-event", handleGameEvent);
  }, []);

  const handleStartGame = () => {
    setScore(0);
    setGameState("active");
    setIsPaused(false);
    setGameActive(true);

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("hud-game-trigger", { detail: { action: "start-game" } }));
    }, 20);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleExitGame = () => {
    setGameState("idle");
    setGameActive(false);
    setIsPaused(false);
  };

  if (isMinimized) {
    return (
      <div style={{ position: "fixed", bottom: "1.25rem", left: "1.25rem", zIndex: 999 }}>
        <Magnetic scale={0.2}>
          <button
            onClick={() => setIsMinimized(false)}
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(10, 10, 15, 0.75)",
              border: "1px solid var(--card-border)",
              color: "var(--fg-color)",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "var(--glass-blur)",
              WebkitBackdropFilter: "var(--glass-blur)",
              fontSize: "0.95rem"
            }}
            title="Expand Snake Controller"
          >
            🐍
          </button>
        </Magnetic>
      </div>
    );
  }

  return (
    <div
      className="glass-card"
      style={{
        position: "fixed",
        bottom: "1.25rem",
        left: "1.25rem",
        width: "220px",
        padding: "10px 14px",
        zIndex: 999,
        border: "1px solid var(--card-border)",
        background: "rgba(10, 10, 15, 0.82)",
        boxShadow: "0 10px 30px var(--shadow-color)",
        fontFamily: "var(--font-mono)",
        color: "var(--fg-color)",
        fontSize: "0.75rem",
        borderRadius: "2px"
      }}
    >
      {/* Header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "6px", marginBottom: "8px" }}>
        <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.05em" }}>
          SYS // SNAKE_{gameState.toUpperCase()}
        </span>
        <button
          onClick={() => setIsMinimized(true)}
          style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "0.8rem", display: "flex", padding: 0 }}
          title="Minimize"
        >
          <FiMinimize2 />
        </button>
      </div>

      {/* RENDER ACTIVE GAME SCREEN */}
      {gameState === "active" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Stats Single Line */}
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#ffffff" }}>
            <span>SCORE: <span style={{ color: "var(--accent-color)" }}>{score}</span></span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>BEST: {highScore}</span>
          </div>

          {/* Action Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "4px" }}>
            <button
              onClick={handleTogglePause}
              style={{
                background: isPaused ? "var(--success-color)" : "transparent",
                border: "1px solid var(--card-border)",
                color: isPaused ? "#ffffff" : "rgba(255,255,255,0.8)",
                padding: "4px 6px",
                fontSize: "0.65rem",
                cursor: "pointer",
                borderRadius: "1px",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px"
              }}
            >
              {isPaused ? <FiPlay size={8} /> : <FiPause size={8} />}
              {isPaused ? "RESUME" : "PAUSE"}
            </button>

            <button
              onClick={handleExitGame}
              style={{
                background: "transparent",
                border: "1px solid rgba(239, 68, 68, 0.25)",
                color: "#ef4444",
                padding: "4px 6px",
                fontSize: "0.65rem",
                cursor: "pointer",
                borderRadius: "1px",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px"
              }}
            >
              <FiLogOut size={8} />
              EXIT
            </button>
          </div>
        </div>
      )}

      {/* RENDER GAME OVER SCREEN */}
      {gameState === "gameover" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "center" }}>
          <div style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.68rem" }}>
            COLLISION DETECTED
          </div>

          <div style={{ fontWeight: 800, color: "#ffffff", padding: "4px 0" }}>
            SCORE: <span style={{ color: "var(--accent-color)" }}>{score} pts</span>
            {score >= highScore && score > 0 && <span style={{ display: "block", fontSize: "0.55rem", color: "var(--success-color)", marginTop: "2px" }}>🏆 NEW BEST RECORD</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            <button
              onClick={handleStartGame}
              style={{
                background: "var(--primary-color)",
                border: "none",
                color: "#ffffff",
                padding: "4px 6px",
                fontSize: "0.65rem",
                cursor: "pointer",
                borderRadius: "1px",
                fontWeight: 700,
                fontFamily: "var(--font-mono)"
              }}
            >
              RESTART
            </button>
            <button
              onClick={() => setGameState("idle")}
              style={{
                background: "transparent",
                border: "1px solid var(--card-border)",
                color: "rgba(255,255,255,0.45)",
                padding: "4px 6px",
                fontSize: "0.65rem",
                cursor: "pointer",
                borderRadius: "1px",
                fontFamily: "var(--font-mono)"
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* RENDER IDLE VIEW */}
      {gameState === "idle" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>🐍 CYBER_SNAKE</span>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>BEST: {highScore}</span>
          </div>

          <button
            onClick={handleStartGame}
            style={{
              background: "var(--primary-color)",
              border: "none",
              color: "#ffffff",
              width: "100%",
              padding: "6px 8px",
              fontSize: "0.68rem",
              cursor: "pointer",
              borderRadius: "1px",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px"
            }}
          >
            <FiPlay size={8} /> PLAY SNAKE
          </button>
        </div>
      )}
    </div>
  );
}
