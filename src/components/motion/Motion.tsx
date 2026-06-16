"use client";

/**
 * Utilidades de animación reutilizables (framer-motion).
 *
 * Principios aplicados (UI/UX Pro Max + Emil Kowalski):
 * - Duraciones 150–400ms, curvas spring/ease-out para entrada.
 * - Sólo transform/opacity (nunca width/height) → 60fps sin reflow.
 * - Stagger 40–60ms por item.
 * - Respeta prefers-reduced-motion: si está activo, todo aparece sin moverse.
 */

import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------- FadeIn */

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  once?: boolean;
}

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

/** Aparece con fundido + deslizamiento al entrar en viewport. */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 24,
  className,
  once = true,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const initial = reduce
    ? { opacity: 0 }
    : { opacity: 0, ...offsetFor(direction, distance) };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------- Stagger container */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  once?: boolean;
}

/** Contenedor que escalona la entrada de sus <StaggerItem> hijos. */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.06,
  once = true,
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: step, delayChildren: delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  distance = 22,
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, ...offsetFor(direction, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------- AnimatedNumber */

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

/** Cuenta de 0 → value cuando entra en pantalla (tabular para no saltar). */
export function AnimatedNumber({
  value,
  duration = 1.2,
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / (duration * 1000));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------- HoverCard wrap */

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  lift?: number;
}

/** Tarjeta con micro-elevación al hover (scale + translate, sin reflow). */
export function HoverCard({ children, className, lift = 4 }: HoverCardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -lift, scale: 1.012 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------- SpringValue (genérico) */

/** Devuelve un MotionValue que persigue `target` con física de muelle. */
export function useSpringNumber(target: number) {
  const mv = useMotionValue(target);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  useEffect(() => {
    mv.set(target);
  }, [target, mv]);
  return spring;
}
