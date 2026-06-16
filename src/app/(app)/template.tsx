"use client";

/**
 * Template del grupo (app): se re-monta en cada navegación, así que es el
 * lugar correcto para la transición de página. Fade + leve slide hacia
 * arriba. Respeta prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "framer-motion";

export default function AppTemplate({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
