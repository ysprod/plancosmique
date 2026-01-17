'use client';
import { motion } from "framer-motion";
import { Plus, RefreshCw } from "lucide-react";
import React from "react";

interface AdminBooksHeaderProps {
  booksCount: number;
  loading: boolean;
  fetchBooks: () => void;
  openAddModal: () => void;
}

export const AdminBooksHeader: React.FC<AdminBooksHeaderProps> = ({
  booksCount,
  loading,
  fetchBooks,
  openAddModal,
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
    <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
      <div>
        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 flex items-center gap-3">
          <span className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2">
            <Plus className="w-8 h-8 text-white" />
          </span>
          Gestion des Livres
        </h1>
        <p className="text-gray-600 mt-2">
          Gérez votre catalogue de {booksCount} livre{booksCount > 1 ? "s" : ""} PDF
        </p>
      </div>
      
      <div className="flex gap-3 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchBooks}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </motion.button>
        {booksCount > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Ajouter un livre
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>
);