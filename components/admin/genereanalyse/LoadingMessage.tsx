"use client";
import { motion } from "framer-motion";
import AnimatedDot from "./AnimatedDot";

interface LoadingMessageProps {
  message: string;
  showDots?: boolean;
}

export default function LoadingMessage({ message, showDots = false }: LoadingMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center"
    >
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {message}
      </p>

      {showDots && (
        <div className="flex items-center justify-center gap-1 mt-3">
          <AnimatedDot delay={0} />
          <AnimatedDot delay={0.15} />
          <AnimatedDot delay={0.3} />
        </div>
      )}
    </motion.div>
  );
}