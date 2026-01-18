'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CinqPortesHeaderProps {
  isPremium: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 100 } }
};

const CinqPortesHeader = memo<CinqPortesHeaderProps>(({ isPremium }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="text-center mb-8 w-full"
    >
      {/* Titre avec emojis rotatifs */}
      <div className="inline-flex items-center gap-3 mb-2">
        <motion.div 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="text-3xl sm:text-4xl"
        >
          ✨
        </motion.div>
        <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Les 5 Portes
        </h2>
        <motion.div 
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="text-3xl sm:text-4xl"
        >
          ✨
        </motion.div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed"
      >
        Explorez les 5 dimensions fondamentales de votre essence cosmique
      </motion.p>
      
      {isPremium && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-3 text-purple-300 text-xs sm:text-sm font-medium"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyse premium déverrouillée</span>
          <Sparkles className="w-4 h-4" />
        </motion.div>
      )}
    </motion.div>
  );
}, (prevProps, nextProps) => prevProps.isPremium === nextProps.isPremium);

CinqPortesHeader.displayName = 'CinqPortesHeader';

export default CinqPortesHeader;