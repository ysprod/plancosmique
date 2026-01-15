"use client";

import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import type { Star } from "./useConsultationCardStars";

interface ConsultationCardBackgroundProps {
  stars: Star[];
}

const ConsultationCardBackground = memo(function ConsultationCardBackground({ stars }: ConsultationCardBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {!reduceMotion && (
        <>
          {/* Ambient blobs */}
          <motion.div
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, -18, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-500/10 to-cyan-500/5 blur-3xl"
            animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Stars deterministes */}
          {stars.map((s, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-gradient-to-r from-white/65 to-yellow-200/60"
              style={{ left: s.left, top: s.top, opacity: s.opacity }}
              animate={{ scale: [1, s.scaleMax, 1], opacity: [s.opacity * 0.7, 1, s.opacity * 0.7] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      )}
    </div>
  );
});

ConsultationCardBackground.displayName = "ConsultationCardBackground";
export default ConsultationCardBackground;
