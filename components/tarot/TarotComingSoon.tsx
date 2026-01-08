import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TarotComingSoon = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-500/30 shadow-2xl text-blue-100"
  >
    <div className="flex items-center gap-2 text-blue-300 mb-4">
      <Sparkles className="w-5 h-5" />
      <span className="font-bold">Bientôt disponible</span>
    </div>
    <p>
      Cette section proposera un tirage interactif en 3 cartes
      avec interprétations cosmiques. Revenez très bientôt ✨
    </p>
  </motion.div>
);

export default TarotComingSoon;