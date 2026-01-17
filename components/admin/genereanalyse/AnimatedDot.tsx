"use client";
import { motion } from "framer-motion";
import { memo } from "react";

interface AnimatedDotProps {
  delay: number;
}

const AnimatedDot = memo(({ delay }: AnimatedDotProps) => (
  <motion.div
    animate={{ y: [-8, 0, -8] }}
    transition={{ duration: 1.2, repeat: Infinity, delay }}
    className="w-2 h-2 rounded-full bg-purple-500"
  />
));

AnimatedDot.displayName = "AnimatedDot";

export default AnimatedDot;