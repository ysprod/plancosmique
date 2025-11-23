"use client";
import { motion } from "framer-motion";

export default function StarBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-400 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-violet-200/30 to-purple-200/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.22, 0.12],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-gradient-to-tl from-fuchsia-200/25 to-pink-200/15 rounded-full blur-3xl"
      />
    </div>
  );
}
