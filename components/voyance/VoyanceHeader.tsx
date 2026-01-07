import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function VoyanceHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-block mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
          <Eye className="w-12 h-12 text-white" />
        </div>
      </motion.div>
      <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4">
        Voyance Personnelle
      </h1>
      <p className="text-xl text-purple-200">
        Laissez les astres révéler votre destinée
      </p>
    </motion.div>
  );
}
