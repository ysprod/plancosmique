'use client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function NumerologieLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <Loader2 className="mx-auto h-16 w-16 animate-spin text-purple-300" />
        <p className="mt-4 text-lg text-purple-200">Chargement de votre consultation...</p>
      </motion.div>
    </div>
  );
}
