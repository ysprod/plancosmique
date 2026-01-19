import { memo } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = memo<BackButtonProps>(({ onClick }) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    onClick={onClick}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="w-full sm:w-auto sm:min-w-[240px] mx-auto flex items-center justify-center gap-2.5 h-12 sm:h-13 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl border border-slate-300/50 dark:border-slate-600/50 transition-all duration-300 group"
  >
    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
    <span>Retour à l'accueil</span>
  </motion.button>
));

BackButton.displayName = 'BackButton';

export default BackButton;
