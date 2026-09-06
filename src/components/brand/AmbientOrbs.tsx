"use client";

/**
 * Orbes de gradiente que flotan lentamente de fondo.
 * Aporta vida ambiental sin distraer. transform-only, GPU-friendly,
 * se apaga con prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "framer-motion";

interface Orb {
  size: number;
  color: string;
  top: string;
  left: string;
  drift: { x: number[]; y: number[] };
  dur: number;
}

const ORBS: Orb[] = [
  {
    size: 420,
    color: "rgba(20, 122, 255, 0.10)",
    top: "-8%",
    left: "60%",
    drift: { x: [0, 40, -20, 0], y: [0, -30, 20, 0] },
    dur: 22,
  },
  {
    size: 360,
    color: "rgba(0, 52, 120, 0.16)",
    top: "55%",
    left: "-6%",
    drift: { x: [0, 30, 10, 0], y: [0, 25, -15, 0] },
    dur: 26,
  },
  {
    size: 300,
    color: "rgba(127, 178, 255, 0.18)",
    top: "70%",
    left: "70%",
    drift: { x: [0, -30, 20, 0], y: [0, -20, 25, 0] },
    dur: 30,
  },
];

export function AmbientOrbs({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={
            reduce
              ? undefined
              : { x: orb.drift.x, y: orb.drift.y }
          }
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
