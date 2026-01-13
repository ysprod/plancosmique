"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import React, { memo } from "react";

const LoadingState = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="col-span-full flex flex-col items-center justify-center py-12"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className="mb-3"
    >
      <Loader2 className="w-10 h-10 text-purple-600" />
    </motion.div>
    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
      Chargement des consultations...
    </p>
  </motion.div>
));

LoadingState.displayName = 'LoadingState';

export default LoadingState;
