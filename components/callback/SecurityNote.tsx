'use client';
import { motion, type Variants } from 'framer-motion';

interface SecurityNoteProps {
  itemVariants: Variants;
}
 
export function SecurityNote({ itemVariants }: SecurityNoteProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="mt-3 sm:mt-6 text-center text-[10px] sm:text-sm text-gray-600 px-4"
    >
      <p>
        💡 Ce paiement est sécurisé par{' '}
        <a
          href="https://moneyfusion.net"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline font-semibold transition-colors"
        >
          MoneyFusion
        </a>
      </p>
    </motion.div>
  );
}