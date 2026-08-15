"use client";

import React, { useEffect, useRef } from "react";

export default function CyberCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let time = 0;

    // Snake game variables
    const cellSize = 24;
    let snake = [];
    let food = { x: 0, y: 0 };
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let gameScore = 0;
    let lastGameTick = 0;
    const getGameSpeed = () => {
      // Start at a comfortable 180ms, accelerate by 10ms for every 10 points (1 apple eaten)
      // Clamp at 70ms maximum speed (very fast)
      return Math.max(70, 180 - Math.floor(gameScore / 10) * 10);
    };
    let wasGameActive = false;

    // Config manager
    const getConfig = () => {
      if (typeof window !== "undefined" && window.sandboxConfig) {
        return window.sandboxConfig;
      }
      return {
        gameActive: false,
        isPaused: false,
        gameState: "idle"
      };
    };

    // Dispatch game events
    const dispatchGameEvent = (type, detail) => {
      if (typeof window !== "undefined") {
        const event = new CustomEvent("webshooter-game-event", {
          detail: { type, ...detail }
        });
        window.dispatchEvent(event);
      }
    };

    const logDebug = (message, data = {}) => {
      fetch("/api/debug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, data })
      }).catch(() => {});
    };

    // Mouse positions for interactive background
    const mouse = {
      x: null,
      y: null,
      radius: 180
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth || 1024;
      canvas.height = window.innerHeight || 768;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Spawn food at random empty cell
    const spawnFood = (cols, rows) => {
      let attempts = 0;
      while (attempts < 100) {
        const fx = Math.floor(Math.random() * cols);
        const fy = Math.floor(Math.random() * rows);
        const onSnake = snake.some(segment => segment.x === fx && segment.y === fy);
        if (!onSnake) {
          food = { x: fx, y: fy };
          return;
        }
        attempts++;
      }
      food = { x: 5, y: 5 }; // fallback
    };

    // Reset snake game values
    const resetSnakeGame = () => {
      // Ensure dimensions are initialized
      if (canvas.width === 0 || canvas.height === 0) {
        resizeCanvas();
      }

      const cols = Math.max(15, Math.floor(canvas.width / cellSize));
      const rows = Math.max(15, Math.floor(canvas.height / cellSize));
      
      // Start in the center
      const startX = Math.floor(cols / 2);
      const startY = Math.floor(rows / 2);
      
      snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
      ];
      
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      gameScore = 0;
      lastGameTick = performance.now(); // Prevent immediate update ticks on start
      spawnFood(cols, rows);
      console.log("Snake initialized successfully. Grid cols:", cols, "rows:", rows, "startX:", startX, "startY:", startY, "head position:", snake[0]);
      logDebug("resetSnakeGame executed", {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        cols,
        rows,
        startX,
        startY,
        snakeLength: snake.length,
        config: getConfig()
      });
      
      dispatchGameEvent("score-change", { score: 0 });
      dispatchGameEvent("shield-change", { shields: 100 });
    };

    // Background Particle builder
    const createParticle = (isInitial = false) => {
      const w = canvas.width || 1024;
      const h = canvas.height || 768;
      const x = Math.random() * w;
      const y = isInitial ? Math.random() * h : h + 10;
      
      const schemes = [
        "rgba(99, 102, 241, ", // Indigo
        "rgba(168, 85, 247, ", // Purple
        "rgba(6, 182, 212, "   // Cyan
      ];
      const chosenColor = schemes[Math.floor(Math.random() * schemes.length)];

      return {
        x,
        y,
        size: Math.random() * 1.5 + 0.8,
        speedX: 0,
        speedY: 0,
        baseSpeed: Math.random() * 0.4 + 0.2,
        color: chosenColor,
        alpha: Math.random() * 0.4 + 0.1,
      };
    };

    // Initialize particles
    for (let i = 0; i < 90; i++) {
      particles.push(createParticle(true));
    }

    // Keyboard handlers
    const handleKeyDown = (e) => {
      const config = getConfig();
      if (!config.gameActive || config.isPaused) return;

      const key = e.key.toLowerCase();
      
      if ((key === "arrowup" || key === "w") && dir.y === 0) {
        nextDir = { x: 0, y: -1 };
        e.preventDefault();
      } else if ((key === "arrowdown" || key === "s") && dir.y === 0) {
        nextDir = { x: 0, y: 1 };
        e.preventDefault();
      } else if ((key === "arrowleft" || key === "a") && dir.x === 0) {
        nextDir = { x: -1, y: 0 };
        e.preventDefault();
      } else if ((key === "arrowright" || key === "d") && dir.x === 0) {
        nextDir = { x: 1, y: 0 };
        e.preventDefault();
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Listen to HUD buttons trigger
    const handleHUDTrigger = (e) => {
      if (e.detail && e.detail.action === "start-game") {
        resetSnakeGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("hud-game-trigger", handleHUDTrigger);

    // Animation Loop
    const animate = (timestamp) => {
      // Fallback if timestamp is not yet defined
      const currentTS = timestamp || performance.now();
      time += 1;
      
      const config = getConfig();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply foreground layer dynamically to play over portfolio cards
      const targetZ = (config.gameActive || config.gameState === "gameover") ? "998" : "0";
      if (canvas.style.zIndex !== targetZ) {
        canvas.style.zIndex = targetZ;
      }
      const targetPE = config.gameActive ? "auto" : "none";
      if (canvas.style.pointerEvents !== targetPE) {
        canvas.style.pointerEvents = targetPE;
      }

      // Track active transitions
      if (config.gameActive && !wasGameActive) {
        resetSnakeGame();
      }
      wasGameActive = config.gameActive;

      const isPaused = config.isPaused;

      // 1. RENDER BACKGROUND CONSTELLATION PARTICLES
      particles.forEach((p, idx) => {
        if (!isPaused) {
          const angle = (Math.sin(p.x * 0.003 + time * 0.001) + Math.cos(p.y * 0.003 + time * 0.001)) * Math.PI;
          p.speedX = Math.cos(angle) * p.baseSpeed;
          p.speedY = Math.sin(angle) * p.baseSpeed - 0.25;

          // Mouse push effect
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              const angleToMouse = Math.atan2(dy, dx);
              p.speedX += Math.cos(angleToMouse) * force * 0.3;
              p.speedY += Math.sin(angleToMouse) * force * 0.3;
            }
          }

          p.x += p.speedX;
          p.y += p.speedY;

          // Recycle
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;
          if (p.y < -10 || p.y > canvas.height + 20) {
            particles[idx] = createParticle(false);
            return;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        let alpha = p.alpha;
        if (config.gameActive) alpha *= 0.25; // fade backgrounds during gameplay
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
      });

      // 2. RENDER SNAKE GRID & GAMEPLAY (FULL SCREEN overlay)
      if (config.gameActive || config.gameState === "gameover") {
        const cols = Math.max(15, Math.floor(canvas.width / cellSize));
        const rows = Math.max(15, Math.floor(canvas.height / cellSize));

        // Draw background game grid
        ctx.strokeStyle = "rgba(99, 102, 241, 0.035)";
        ctx.lineWidth = 0.5;
        for (let c = 0; c <= cols; c++) {
          ctx.beginPath();
          ctx.moveTo(c * cellSize, 0);
          ctx.lineTo(c * cellSize, canvas.height);
          ctx.stroke();
        }
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          ctx.moveTo(0, r * cellSize);
          ctx.lineTo(canvas.width, r * cellSize);
          ctx.stroke();
        }

        // --- GAME UPDATE TICK (throttled by speed) ---
        if (!isPaused && config.gameActive && currentTS - lastGameTick > getGameSpeed()) {
          lastGameTick = currentTS;

          dir = nextDir;
          // Calculate new head
          const head = snake[0];
          
          if (head) {
            const newHead = { x: head.x + dir.x, y: head.y + dir.y };

            // Wall Collision check (Game Over)
            if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows) {
              console.warn("Snake Wall Crash:", newHead, "Grid dimensions:", cols, "x", rows);
              logDebug("Wall Collision Crash", { newHead, cols, rows, snake });
              dispatchGameEvent("shield-change", { shields: 0 });
              dispatchGameEvent("game-over", { score: gameScore });
            } else {
              // Self Collision check
              const selfCollide = snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
              if (selfCollide) {
                console.warn("Snake Tail Bite Crash:", newHead, "Body segment coordinates:", snake);
                logDebug("Self Collision Crash", { newHead, snake });
                dispatchGameEvent("shield-change", { shields: 0 });
                dispatchGameEvent("game-over", { score: gameScore });
              } else {
                // Add head
                snake.unshift(newHead);

                // Food check
                if (newHead.x === food.x && newHead.y === food.y) {
                  gameScore += 10;
                  dispatchGameEvent("score-change", { score: gameScore });
                  spawnFood(cols, rows);
                } else {
                  // Remove tail segment
                  snake.pop();
                }
              }
            }
          }
        }

        // --- RENDER FOOD APPLE ---
        const foodPulse = Math.sin(time * 0.15) * 1.5;
        const foodX = food.x * cellSize + cellSize / 2;
        const foodY = food.y * cellSize + cellSize / 2;
        const appleRadius = (cellSize / 2.5) + foodPulse;

        ctx.save();
        ctx.shadowColor = "rgba(239, 68, 68, 0.75)";
        ctx.shadowBlur = 8;

        // Draw Apple Body (Red)
        ctx.beginPath();
        ctx.arc(foodX, foodY, appleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(239, 68, 68, 1)"; 
        ctx.fill();

        // Draw Stem (Brown)
        ctx.beginPath();
        ctx.moveTo(foodX, foodY - appleRadius);
        ctx.quadraticCurveTo(foodX + 2, foodY - appleRadius - 5, foodX + 3, foodY - appleRadius - 7);
        ctx.strokeStyle = "rgba(180, 110, 50, 1)";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Draw Leaf (Green)
        ctx.beginPath();
        ctx.arc(foodX + 2, foodY - appleRadius - 5, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 197, 94, 1)";
        ctx.fill();

        ctx.restore();

        // --- RENDER SNAKE TILES (Tapering Body + Eyes + Tongue) ---
        snake.forEach((segment, index) => {
          const isHead = index === 0;
          ctx.save();

          // Body tapering (from 100% size down to 65% size at tail)
          const sizeFactor = 1 - (index / snake.length) * 0.35;
          const currentSize = (cellSize - 4) * sizeFactor;
          const offset = (cellSize - currentSize) / 2;

          const segX = segment.x * cellSize + offset;
          const segY = segment.y * cellSize + offset;

          ctx.shadowColor = isHead ? "rgba(6, 182, 212, 0.95)" : "rgba(6, 182, 212, 0.4)";
          ctx.shadowBlur = isHead ? 12 : 6;

          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(segX, segY, currentSize, currentSize, isHead ? 8 : 4);
          } else {
            ctx.rect(segX, segY, currentSize, currentSize);
          }
          
          ctx.fillStyle = isHead ? "rgba(6, 182, 212, 1)" : "rgba(14, 165, 233, 0.85)";
          ctx.fill();

          // Head Details: Eyes & Split Tongue
          if (isHead) {
            const centerX = segment.x * cellSize + cellSize / 2;
            const centerY = segment.y * cellSize + cellSize / 2;

            ctx.shadowBlur = 0; // Turn off shadows for precise facial features
            
            // Draw Split Tongue (Red)
            ctx.beginPath();
            ctx.strokeStyle = "rgba(239, 68, 68, 1)";
            ctx.lineWidth = 1.5;

            if (dir.x === 1) { // Right
              ctx.moveTo(centerX + 8, centerY);
              ctx.lineTo(centerX + 15, centerY);
              ctx.lineTo(centerX + 18, centerY - 2.5);
              ctx.moveTo(centerX + 15, centerY);
              ctx.lineTo(centerX + 18, centerY + 2.5);
            } else if (dir.x === -1) { // Left
              ctx.moveTo(centerX - 8, centerY);
              ctx.lineTo(centerX - 15, centerY);
              ctx.lineTo(centerX - 18, centerY - 2.5);
              ctx.moveTo(centerX - 15, centerY);
              ctx.lineTo(centerX - 18, centerY + 2.5);
            } else if (dir.y === 1) { // Down
              ctx.moveTo(centerX, centerY + 8);
              ctx.lineTo(centerX, centerY + 15);
              ctx.lineTo(centerX - 2.5, centerY + 18);
              ctx.moveTo(centerX, centerY + 15);
              ctx.lineTo(centerX + 2.5, centerY + 18);
            } else if (dir.y === -1) { // Up
              ctx.moveTo(centerX, centerY - 8);
              ctx.lineTo(centerX, centerY - 15);
              ctx.lineTo(centerX - 2.5, centerY - 18);
              ctx.moveTo(centerX, centerY - 15);
              ctx.lineTo(centerX + 2.5, centerY - 18);
            }
            ctx.stroke();

            // Draw Eyes (White sclera + Black pupils)
            ctx.fillStyle = "#ffffff";
            const eyeOffset = 3.5;
            const eyeSize = 2.5;
            const pupilSize = 1.0;

            let eye1 = { x: 0, y: 0 };
            let eye2 = { x: 0, y: 0 };

            if (dir.x !== 0) {
              eye1 = { x: centerX + dir.x * 3.5, y: centerY - eyeOffset };
              eye2 = { x: centerX + dir.x * 3.5, y: centerY + eyeOffset };
            } else {
              eye1 = { x: centerX - eyeOffset, y: centerY + dir.y * 3.5 };
              eye2 = { x: centerX + eyeOffset, y: centerY + dir.y * 3.5 };
            }

            ctx.beginPath();
            ctx.arc(eye1.x, eye1.y, eyeSize, 0, Math.PI * 2);
            ctx.arc(eye2.x, eye2.y, eyeSize, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(eye1.x + dir.x * 0.6, eye1.y + dir.y * 0.6, pupilSize, 0, Math.PI * 2);
            ctx.arc(eye2.x + dir.x * 0.6, eye2.y + dir.y * 0.6, pupilSize, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        });

        // --- PAUSED OVERLAY OVER CANVAS ---
        if (isPaused) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.font = "bold 28px monospace";
          ctx.textAlign = "center";
          ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 10);
          ctx.font = "14px monospace";
          ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
          ctx.fillText("Click 'Resume' in the HUD to continue", canvas.width / 2, canvas.height / 2 + 25);
          ctx.textAlign = "start";
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Use standard requestAnimationFrame from the start to prevent undefined timestamp
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("hud-game-trigger", handleHUDTrigger);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
