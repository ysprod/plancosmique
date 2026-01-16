'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginFooter() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-center mt-6 text-xs text-gray-500 dark:text-gray-600"
    >
      En vous connectant, vous acceptez nos{' '}
      <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-400">
        conditions
      </Link>
    </motion.p>
  );
}
