"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { memo } from "react";

const OrbitingSparkles = memo(() => (
  <div className="relative w-20 h-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <Sparkles className="w-5 h-5 text-purple-400 absolute top-0 left-1/2 -translate-x-1/2" />
      <Sparkles className="w-5 h-5 text-pink-400 absolute bottom-0 right-0" />
      <Sparkles className="w-5 h-5 text-blue-400 absolute bottom-0 left-0" />
    </motion.div>

    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute inset-1"
    >
      <div className="w-full h-full rounded-full border-2 border-transparent border-t-purple-500 border-r-pink-500" />
    </motion.div>

    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-3 rounded-full border border-purple-300/30"
    />
  </div>
));

OrbitingSparkles.displayName = "OrbitingSparkles";

export default OrbitingSparkles;