'use client';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const BooksHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <BookOpen className="w-12 h-12 text-amber-600" />
      <h1 className="text-4xl font-black text-gray-900">
        Bibliothèque Sacrée
      </h1>
    </div>
    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
      Accédez instantanément à nos livres numériques en PDF. Téléchargez et conservez
      ces connaissances précieuses pour toujours.
    </p>
  </motion.div>
);

export default BooksHeader;