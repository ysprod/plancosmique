"use client";
import { motion } from "framer-motion";
import React, { memo } from "react";

const PorteItem = memo(({ label, index }: { label: string; index: number }) => (
  <motion.li
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className="w-full max-w-xs relative px-3 py-2 rounded-lg
             bg-gradient-to-r from-purple-900/30 to-pink-900/20
             backdrop-blur-sm border border-purple-500/20
             flex items-center gap-2 shadow-sm hover:shadow-md
             hover:from-purple-900/40 hover:to-pink-900/30
             transition-all duration-200"
  >
    <motion.span
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center justify-center w-6 h-6 
               rounded-full bg-gradient-to-br from-purple-500 to-pink-500 
               text-white font-bold text-xs shadow-lg flex-shrink-0"
    >
      {index + 1}
    </motion.span>
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {label}
    </span>
  </motion.li>
));
PorteItem.displayName = 'PorteItem';

export default PorteItem;
