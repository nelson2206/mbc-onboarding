"use client";

/**
 * Gráfico de marca vectorial animado para MBC.
 * Una "constelación estratégica": nodos conectados que laten suavemente,
 * en paleta guinda/magenta sobre transparente. Reemplaza imágenes raster
 * (más nítido, ligero, themeable). Respeta prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  r: number;
}

// Nodos distribuidos de forma orgánica dentro de un viewBox 400x500.
const NODES: Node[] = [
  { x: 200, y: 90, r: 7 },
  { x: 110, y: 160, r: 5 },
  { x: 300, y: 150, r: 6 },
  { x: 70, y: 270, r: 4 },
  { x: 200, y: 250, r: 9 },
  { x: 330, y: 280, r: 5 },
  { x: 140, y: 360, r: 6 },
  { x: 270, y: 380, r: 7 },
  { x: 200, y: 440, r: 4 },
];

// Aristas (pares de índices) que dibujan la red.
const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 4],
  [2, 4],
  [1, 3],
  [4, 5],
  [3, 6],
  [4, 6],
  [4, 7],
  [5, 7],
  [6, 8],
  [7, 8],
  [2, 5],
];

export function BrandConstellation({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="bc-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff0054" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#480e2a" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="bc-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d86" />
          <stop offset="100%" stopColor="#ff0054" />
        </radialGradient>
        <filter id="bc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Aristas: se "dibujan" una a una al montar */}
      <g stroke="url(#bc-line)" strokeWidth="1.5" strokeLinecap="round">
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            initial={reduce ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{
              duration: 1.1,
              delay: reduce ? 0 : 0.3 + i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>

      {/* Nodos: aparecen con pop y laten en bucle */}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="url(#bc-node)"
          filter="url(#bc-glow)"
          initial={reduce ? { scale: 1, opacity: 0.9 } : { scale: 0, opacity: 0 }}
          animate={
            reduce
              ? { scale: 1, opacity: 0.9 }
              : {
                  scale: [0, 1.15, 1],
                  opacity: 1,
                }
          }
          transition={{
            duration: 0.6,
            delay: reduce ? 0 : 0.2 + i * 0.1,
            ease: "backOut",
          }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {!reduce && (
            <animate
              attributeName="opacity"
              values="1;0.6;1"
              dur={`${2.5 + (i % 4) * 0.6}s`}
              repeatCount="indefinite"
              begin={`${1 + i * 0.15}s`}
            />
          )}
        </motion.circle>
      ))}

      {/* Partícula viajera por una arista clave (pulso de "flujo") */}
      {!reduce && (
        <motion.circle r="3" fill="#ffb2b8" filter="url(#bc-glow)">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path={`M${NODES[0].x},${NODES[0].y} L${NODES[4].x},${NODES[4].y} L${NODES[7].x},${NODES[7].y}`}
          />
        </motion.circle>
      )}
    </svg>
  );
}
