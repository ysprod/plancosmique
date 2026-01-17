'use client';
import { motion } from 'framer-motion';

interface UsersPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  loading: boolean;
}

const UsersPagination = ({ totalPages, currentPage, setCurrentPage, loading }: UsersPaginationProps) => (
  totalPages > 1 ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm"
    >
      <p className="text-xs text-gray-600 font-medium">Page {currentPage} sur {totalPages}</p>
      <div className="flex gap-1.5">
        <motion.button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1 || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          ← Préc
        </motion.button>
        <motion.button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded font-medium hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Suiv →
        </motion.button>
      </div>
    </motion.div>
  ) : null
);

export default UsersPagination;