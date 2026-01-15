"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const ActionButton = memo(({ icon: Icon, label, variant = 'outline' }: { icon: any, label: string, variant?: 'outline' | 'primary' }) => (
  <motion.button
    variants={itemVariants}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`
      group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm
      transition-all duration-300 shadow-lg backdrop-blur-sm overflow-hidden
      ${variant === 'primary' 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/40 hover:shadow-blue-500/60' 
        : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
      }
    `}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    <Icon className="w-4 h-4 relative z-10" />
    <span className="relative z-10 hidden sm:inline">{label}</span>
  </motion.button>
));

ActionButton.displayName = 'ActionButton';

export default ActionButton;
