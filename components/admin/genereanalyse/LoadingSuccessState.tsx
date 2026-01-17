"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function LoadingSuccessState() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 
                    flex items-center justify-center shadow-2xl">
        <CheckCircle2 className="w-10 h-10 text-white" />
      </div>
    </motion.div>
  );
}