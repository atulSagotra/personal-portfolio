"use client";

import React, { useRef, useState } from "react";

export default function Magnetic({ children, scale = 0.35 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const element = ref.current;
    if (!element) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = element.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const x = (clientX - centerX) * scale;
    const y = (clientY - centerY) * scale;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrap"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        display: "inline-block"
      }}
    >
      {children}
    </div>
  );
}
