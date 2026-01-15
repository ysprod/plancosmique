'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';

interface CinqPortesFooterProps {
  delayIndex?: number;
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring', stiffness: 100 } }
};

const CinqPortesFooter = memo<CinqPortesFooterProps>(({ delayIndex = 0 }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-4"
    >
      <motion.p
        variants={itemVariants}
        className="text-[11px] sm:text-xs text-white/40 text-center font-medium tracking-wide"
      >
        Basé sur votre thème astral • Calculs astrologiques de précision
      </motion.p>
    </motion.div>
  );
});

CinqPortesFooter.displayName = 'CinqPortesFooter';

export default CinqPortesFooter;