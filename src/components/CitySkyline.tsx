"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WindowLight {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
  color: string;
}

const buildings = [
  { x: 0, width: 50, height: 110 },
  { x: 45, width: 38, height: 175 },
  { x: 78, width: 60, height: 135 },
  { x: 133, width: 32, height: 210 },
  { x: 160, width: 55, height: 155 },
  { x: 210, width: 42, height: 235 },
  { x: 247, width: 38, height: 125 },
  { x: 280, width: 65, height: 195 },
  { x: 340, width: 30, height: 145 },
  { x: 365, width: 50, height: 220 },
  { x: 410, width: 42, height: 165 },
  { x: 447, width: 58, height: 140 },
  { x: 500, width: 35, height: 245 },
  { x: 530, width: 52, height: 160 },
  { x: 577, width: 44, height: 190 },
  { x: 616, width: 60, height: 130 },
  { x: 671, width: 32, height: 215 },
  { x: 698, width: 48, height: 170 },
  { x: 741, width: 40, height: 140 },
  { x: 776, width: 55, height: 200 },
  { x: 826, width: 38, height: 155 },
  { x: 859, width: 62, height: 225 },
  { x: 916, width: 34, height: 135 },
  { x: 945, width: 50, height: 180 },
  { x: 990, width: 42, height: 150 },
  { x: 1027, width: 58, height: 210 },
  { x: 1080, width: 32, height: 165 },
  { x: 1107, width: 52, height: 235 },
  { x: 1154, width: 40, height: 140 },
  { x: 1189, width: 55, height: 195 },
  { x: 1239, width: 38, height: 155 },
  { x: 1272, width: 48, height: 220 },
  { x: 1315, width: 42, height: 130 },
  { x: 1352, width: 60, height: 190 },
  { x: 1407, width: 32, height: 145 },
  { x: 1434, width: 50, height: 215 },
  { x: 1479, width: 40, height: 170 },
];

const warmColors = [
  "rgba(255, 200, 80, 0.95)",
  "rgba(255, 180, 60, 0.9)",
  "rgba(255, 220, 120, 0.85)",
  "rgba(255, 160, 50, 0.95)",
  "rgba(220, 200, 255, 0.75)",
  "rgba(200, 210, 240, 0.7)",
];

function generateWindowLights(): WindowLight[] {
  const lights: WindowLight[] = [];
  let id = 0;

  buildings.forEach((b) => {
    const cols = Math.floor((b.width - 8) / 12);
    const rows = Math.floor((b.height - 10) / 16);

    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        if (Math.random() > 0.06) continue;

        const wx = b.x + 5 + col * 12;
        const wy = 260 - b.height + 7 + row * 16;

        lights.push({
          id: id++,
          x: wx,
          y: wy,
          width: 6,
          height: 9,
          delay: Math.random() * 12,
          duration: 4 + Math.random() * 10,
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
    <div className="fixed top-0 left-0 right-0 h-[260px] overflow-hidden pointer-events-none z-0">
      {/* Sky gradient - darker, more ominous */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #020205 0%, #060610 30%, #0a0a15 60%, transparent 100%)",
        }}
      />

      {/* Gloomy moon - larger, with eerie glow */}
      <div className="absolute top-[28px] right-[18%]">
        {/* Outer haze */}
        <div
          className="absolute -inset-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(180, 190, 220, 0.06) 0%, rgba(150, 160, 200, 0.03) 40%, transparent 70%)",
          }}
        />
        {/* Moon body */}
        <motion.div
          className="relative w-[36px] h-[36px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(200, 210, 230, 0.25) 0%, rgba(160, 170, 200, 0.15) 50%, rgba(120, 130, 170, 0.08) 100%)",
            boxShadow:
              "0 0 30px 10px rgba(180, 190, 220, 0.06), 0 0 60px 25px rgba(150, 160, 200, 0.03)",
          }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Moon craters - subtle */}
        <div
          className="absolute top-[8px] left-[10px] w-[6px] h-[6px] rounded-full"
          style={{ background: "rgba(140, 150, 180, 0.1)" }}
        />
        <div
          className="absolute top-[18px] left-[20px] w-[4px] h-[4px] rounded-full"
          style={{ background: "rgba(140, 150, 180, 0.08)" }}
        />
      </div>

      {/* Sparse stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${8 + Math.random() * 84}%`,
            top: `${5 + Math.random() * 35}%`,
            width: `${1 + Math.random() * 1}px`,
            height: `${1 + Math.random() * 1}px`,
          }}
          animate={{ opacity: [0.05, 0.35, 0.05] }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 6,
          }}
        />
      ))}

      {/* Buildings SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[260px]"
        viewBox="0 0 1560 260"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12121a" />
            <stop offset="100%" stopColor="#08080d" />
          </linearGradient>
        </defs>

        {/* Building silhouettes with stronger outlines */}
        {buildings.map((b, i) => (
          <g key={`b-${i}`}>
            <rect
              x={b.x}
              y={260 - b.height}
              width={b.width}
              height={b.height}
              fill={
                i % 4 === 0
                  ? "#0b0b11"
                  : i % 4 === 1
                  ? "#09090f"
                  : i % 4 === 2
                  ? "#0d0d14"
                  : "#0a0a10"
              }
            />
            {/* Building outline - visible edges */}
            <rect
              x={b.x}
              y={260 - b.height}
              width={b.width}
              height={b.height}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
            {/* Top edge highlight */}
            <line
              x1={b.x}
              y1={260 - b.height}
              x2={b.x + b.width}
              y2={260 - b.height}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.8"
            />
            {/* Antenna on tall buildings */}
            {b.height > 200 && (
              <line
                x1={b.x + b.width / 2}
                y1={260 - b.height - 15}
                x2={b.x + b.width / 2}
                y2={260 - b.height}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            )}
          </g>
        ))}

        {/* Window lights */}
        {windowLights.map((w) => (
          <g key={`w-${w.id}`}>
            {/* Glow behind window */}
            <rect
              x={w.x - 3}
              y={w.y - 3}
              width={w.width + 6}
              height={w.height + 6}
              rx="2"
              fill={w.color}
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0.2;0.15;0.2;0.1;0.2;0"
                dur={`${w.duration}s`}
                begin={`${w.delay}s`}
                repeatCount="indefinite"
              />
            </rect>
            {/* Window itself */}
            <rect
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
                values="0;0.95;0.8;0.95;0.7;0.95;0"
                dur={`${w.duration}s`}
                begin={`${w.delay}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}
      </svg>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-primary))",
        }}
      />
    </div>
  );
}
