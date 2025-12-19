import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-2 mt-2 ml-2 "
  >
    <Link href="/">
      <motion.button
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour</span>
      </motion.button>
    </Link>
  </motion.div>
);

export default BackButton;
