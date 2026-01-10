import React, { memo } from 'react';
import { motion } from 'framer-motion';

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

const floatingVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

interface InfoCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}

const InfoCard = memo<InfoCardProps>(({ icon: Icon, label, value, color }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    className="relative bg-white rounded-2xl p-4 border-2 border-gray-100 hover:border-gray-200 transition-all text-center overflow-hidden group cursor-pointer"
  >
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    <div className="relative z-10">
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="inline-block"
      >
        <Icon className={`w-6 h-6 mx-auto mb-2 text-${color.split('-')[1]}-600`} />
      </motion.div>
      <p className="text-xs text-gray-600 mb-1 font-medium">{label}</p>
      <p className="font-bold text-gray-900 text-sm leading-tight">{value}</p>
    </div>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ x: ['-100%', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
    />
  </motion.div>
));
InfoCard.displayName = 'InfoCard';
export default InfoCard;
