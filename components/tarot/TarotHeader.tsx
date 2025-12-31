import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TarotHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-12"
  >
    <div className="inline-block mb-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
        <Star className="w-12 h-12 text-white" />
      </div>
    </div>
    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 mb-4">
      Tarot Cosmique
    </h1>
    <p className="text-xl text-blue-200">
      Tirage des cartes guidé par l'univers
    </p>
  </motion.div>
);

export default TarotHeader;
