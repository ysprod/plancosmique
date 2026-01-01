import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function SpiritualiteHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8 sm:mb-12"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="inline-block mb-4"
      >
        <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600" />
      </motion.div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
          SPIRITUALITE AFRICAINE
        </span>
      </h1>
      <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
        Découvrez nos articles sur la spiritualité, la méditation et le développement personnel
      </p>
    </motion.div>
  );
}
