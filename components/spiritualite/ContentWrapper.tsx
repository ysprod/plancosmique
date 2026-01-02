import React from 'react';
import { motion, Variants } from 'framer-motion';

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const ContentWrapper = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <motion.div
    variants={contentVariants}
    initial="hidden"
    animate="visible"
    className="relative z-10"
  >
    {children}
  </motion.div>
));
ContentWrapper.displayName = 'ContentWrapper';

export default ContentWrapper;
