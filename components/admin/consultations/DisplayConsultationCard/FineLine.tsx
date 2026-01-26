import { motion } from "framer-motion";

export function FineLine() {
  return (
    <motion.div
      className="mx-auto mt-5 h-[2px] w-28 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/80"
      animate={{ opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
