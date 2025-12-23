import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { memo } from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = memo(({ onClick }: BackButtonProps) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={onClick}
    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
             hover:text-gray-900 dark:hover:text-gray-100 
             transition-colors mb-4 group"
  >
    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
    <span className="font-semibold text-sm">Retour</span>
  </motion.button>
));

BackButton.displayName = 'BackButton';

export default BackButton;
