"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";

const ConsultationCardBorder = memo(function ConsultationCardBorder() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-r from-violet-600/50 via-indigo-600/45 to-sky-500/45 opacity-60"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: "200% 200%" }}
    />
  );
});

ConsultationCardBorder.displayName = "ConsultationCardBorder";

export default ConsultationCardBorder;
