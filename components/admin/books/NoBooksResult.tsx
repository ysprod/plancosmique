'use client';
import { motion } from "framer-motion";

export function NoBooksResult() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucun résultat</h3>
     
      <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche ou vos filtres</p>
    </motion.div>
  );
}