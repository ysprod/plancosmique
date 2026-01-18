'use client';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KnowledgeNotFound() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Connaissance introuvable</h2>
        <a href="/secured/knowledge">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
          >
            Retour aux connaissances
          </motion.button>
        </a>
      </div>
    </div>
  );
}