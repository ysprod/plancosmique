'use client';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function NumerologieErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md rounded-2xl bg-red-500/10 p-8 text-center backdrop-blur-sm"
      >
        <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
        <h2 className="mt-4 text-2xl font-bold text-red-300">Erreur</h2>
        <p className="mt-2 text-red-200">{error}</p>
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Réessayer
        </button>
      </motion.div>
    </div>
  );
}
