'use client';
import { motion } from 'framer-motion';
import { memo } from 'react';

const PageHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-8 sm:mb-12"
  >
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
   Rituels Magiques
    </h1> 
  </motion.div>
));

PageHeader.displayName = 'PageHeader';

export { PageHeader };