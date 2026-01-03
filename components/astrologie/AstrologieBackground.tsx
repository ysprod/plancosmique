import { motion } from "framer-motion";

export default function AstrologieBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-pink-500 rounded-full blur-3xl"
      />
    </div>
  );
}
