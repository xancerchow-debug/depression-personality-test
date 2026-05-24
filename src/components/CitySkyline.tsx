"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WindowLight {
  id: number;
  buildingIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
  color: string;
}

const buildings = [
  { x: 0, width: 45, height: 120 },
  { x: 40, width: 35, height: 180 },
  { x: 70, width: 55, height: 140 },
  { x: 120, width: 30, height: 200 },
  { x: 145, width: 50, height: 160 },
  { x: 190, width: 40, height: 220 },
  { x: 225, width: 35, height: 130 },
  { x: 255, width: 60, height: 190 },
  { x: 310, width: 28, height: 150 },
  { x: 333, width: 45, height: 210 },
  { x: 373, width: 38, height: 170 },
  { x: 406, width: 52, height: 145 },
  { x: 453, width: 32, height: 230 },
  { x: 480, width: 48, height: 155 },
  { x: 523, width: 40, height: 185 },
  { x: 558, width: 55, height: 135 },
  { x: 608, width: 30, height: 205 },
  { x: 633, width: 45, height: 175 },
  { x: 673, width: 38, height: 145 },
  { x: 706, width: 50, height: 195 },
  { x: 751, width: 35, height: 160 },
  { x: 781, width: 58, height: 215 },
  { x: 834, width: 32, height: 140 },
  { x: 861, width: 45, height: 180 },
  { x: 901, width: 40, height: 155 },
  { x: 936, width: 55, height: 200 },
  { x: 986, width: 30, height: 170 },
  { x: 1011, width: 48, height: 225 },
  { x: 1054, width: 38, height: 145 },
  { x: 1087, width: 52, height: 190 },
  { x: 1134, width: 35, height: 160 },
  { x: 1164, width: 45, height: 210 },
  { x: 1204, width: 40, height: 135 },
  { x: 1239, width: 55, height: 185 },
  { x: 1289, width: 30, height: 150 },
  { x: 1314, width: 48, height: 220 },
  { x: 1357, width: 38, height: 175 },
  { x: 1390, width: 52, height: 140 },
  { x: 1437, width: 35, height: 195 },
];

const warmColors = [
  "rgba(255, 200, 80, 0.9)",
  "rgba(255, 180, 60, 0.85)",
  "rgba(255, 220, 120, 0.8)",
  "rgba(255, 160, 50, 0.9)",
  "rgba(200, 180, 255, 0.7)",
  "rgba(180, 200, 255, 0.6)",
];

function generateWindowLights(): WindowLight[] {
  const lights: WindowLight[] = [];
  let id = 0;

  buildings.forEach((b, buildingIndex) => {
    const cols = Math.floor(b.width / 10);
    const rows = Math.floor(b.height / 14);

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        // Only ~15% of windows are lit
        if (Math.random() > 0.15) continue;

        const wx = b.x + 4 + col * 10;
        const wy = 240 - b.height + 6 + row * 14;

        lights.push({
          id: id++,
          buildingIndex,
          x: wx,
          y: wy,
          width: 5,
          height: 8,
          delay: Math.random() * 10,
          duration: 3 + Math.random() * 8,
          color: warmColors[Math.floor(Math.random() * warmColors.length)],
        });
      }
    }
  });

  return lights;
}

export default function CitySkyline() {
  const [windowLights, setWindowLights] = useState<WindowLight[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWindowLights(generateWindowLights());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[240px] overflow-hidden pointer-events-none z-0">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #050508 0%, #0a0a12 40%, #0d0d18 70%, transparent 100%)",
        }}
      />

      {/* Moon */}
      <div
        className="absolute top-[20px] right-[15%] w-[30px] h-[30px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 210, 240, 0.6) 0%, rgba(200, 210, 240, 0.1) 50%, transparent 70%)",
          boxShadow: "0 0 40px 15px rgba(200, 210, 240, 0.05)",
        }}
      />

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 40}%`,
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
          }}
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Buildings SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[240px]"
        viewBox="0 0 1500 240"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Building gradient for subtle depth */}
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f0f14" />
            <stop offset="100%" stopColor="#08080c" />
          </linearGradient>
        </defs>

        {/* Building silhouettes */}
        {buildings.map((b, i) => (
          <rect
            key={`b-${i}`}
            x={b.x}
            y={240 - b.height}
            width={b.width}
            height={b.height}
            fill={i % 3 === 0 ? "#0c0c11" : i % 3 === 1 ? "#0a0a0f" : "#0e0e13"}
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="0.5"
          />
        ))}

        {/* Window lights with flicker */}
        {windowLights.map((w) => (
          <rect
            key={`w-${w.id}`}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            rx="0.5"
            fill={w.color}
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.9;0.8;0.9;0.7;0.9;0"
              dur={`${w.duration}s`}
              begin={`${w.delay}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}

        {/* Subtle glow on some windows */}
        {windowLights
          .filter((_, i) => i % 4 === 0)
          .map((w) => (
            <rect
              key={`glow-${w.id}`}
              x={w.x - 2}
              y={w.y - 2}
              width={w.width + 4}
              height={w.height + 4}
              rx="2"
              fill={w.color}
              opacity="0"
              filter="blur(3px)"
            >
              <animate
                attributeName="opacity"
                values="0;0.3;0.25;0.3;0.2;0.3;0"
                dur={`${w.duration}s`}
                begin={`${w.delay}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
      </svg>

      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[80px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-primary))",
        }}
      />
    </div>
  );
}
