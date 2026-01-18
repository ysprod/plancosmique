'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun } from 'lucide-react';

const iconGroupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300 }
  }
};

const IconGroup = memo(() => (
  <motion.div
    variants={iconGroupVariants}
    initial="hidden"
    animate="visible"
    className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
  >
    <motion.div variants={iconVariants}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-300" />
      </motion.div>
    </motion.div>

    <motion.div variants={iconVariants}>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
      </motion.div>
    </motion.div>

    <motion.div variants={iconVariants}>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
      </motion.div>
    </motion.div>
  </motion.div>
));

IconGroup.displayName = 'IconGroup';

export default IconGroup;