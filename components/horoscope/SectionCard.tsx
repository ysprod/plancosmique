import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

interface SectionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  colors: {
    icon: string;
    bg: string;
    hover: string;
    gradient: string;
  };
}

const SectionCard = memo<SectionCardProps>(({ icon: Icon, title, content, colors }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={itemVariants}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02, y: -4, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
      whileTap={{ scale: 0.98 }}
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border-2 border-gray-100 ${colors.hover} transition-all duration-300 overflow-hidden cursor-pointer`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10 flex items-start gap-3 sm:gap-4">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base group-hover:text-gray-800 transition-colors">{title}</h4>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors">{content}</p>
        </div>
      </div>
      <motion.div
        className="absolute -top-1 -right-1 w-20 h-20 opacity-10"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Icon className={`w-full h-full ${colors.icon}`} />
      </motion.div>
    </motion.div>
  );
});
SectionCard.displayName = 'SectionCard';
export default SectionCard;
