import { motion } from 'framer-motion';
import { BookOpen, ShoppingCart } from 'lucide-react';
import { Book } from '@/lib/interfaces';
import React from 'react';

interface BooksGridProps {
  books: Book[];
  purchasingBookId: string | null;
  onPurchase: (book: Book) => void;
}

const BooksGrid = ({ books, purchasingBookId, onPurchase }: BooksGridProps) => {
  if (books.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Aucun livre disponible pour le moment</p>
      </div>
    );
  }
  return (
    <>
      {books.map((book, index) => (
        <motion.div
          key={book.bookId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all group"
        >
          <div className="relative h-64 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
            <BookOpen className="w-24 h-24 text-white opacity-50" />
            <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              {book.category}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-black text-gray-900 mb-1">{book.title}</h3>
            <p className="text-sm font-semibold text-amber-600 mb-3">{book.subtitle}</p>
            <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{book.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{book.pageCount} pages</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{book.description}</p>
            <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
              <div>
                <p className="text-2xl font-black text-gray-900">
                  {book.price.toLocaleString('fr-FR')} <span className="text-sm font-normal">FCFA</span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPurchase(book)}
                disabled={purchasingBookId === book.bookId}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50"
              >
                {purchasingBookId === book.bookId ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Paiement...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Acheter
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default BooksGrid;
