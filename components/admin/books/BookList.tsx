import { Book } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { Edit, Trash2, BookOpen } from 'lucide-react';
import React from 'react';

interface BookListProps {
  books: Book[];
  onToggleActive: (bookId: string, isActive: boolean) => void;
  onDelete: (bookId: string) => void;
  onEdit?: (bookId: string) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, onToggleActive, onDelete, onEdit }) => {
  if (books.length === 0) return null;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {books.map((book, index) => (
        <motion.div
          key={book._id || book.bookId || index}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-indigo-300 hover:shadow-xl transition-all"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-8 h-8 text-indigo-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-black text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-sm font-semibold text-indigo-600 mb-2 line-clamp-1">{book.subtitle}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                    <span className="flex items-center gap-1">👤 {book.author}</span>
                    <span>•</span>
                    <span>{book.pageCount || 100} pages</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold">{book.category}</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleActive(book.bookId, book.isActive)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0 ${book.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {book.isActive ? '✓ Actif' : '✗ Inactif'}
              </motion.button>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{book.description}</p>
            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
              <div>
                <p className="text-xs text-gray-500 mb-1">Prix de vente</p>
                <p className="text-2xl font-black text-gray-900">
                  {book.price.toLocaleString('fr-FR')}
                  <span className="text-sm font-normal text-gray-600"> FCFA</span>
                </p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all"
                  title="Modifier"
                  onClick={() => onEdit?.(book.bookId)}
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all"
                  title="Supprimer"
                  onClick={() => onDelete(book.bookId)}
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
