'use client';

import { motion } from 'framer-motion';
import { BookOpen, Plus, Edit, Trash2, Eye, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';

interface Book {
  _id: string;
  bookId: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  pageCount: number;
  category: string;
  author: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/books');
      const booksData = Array.isArray(response.data) ? response.data : (response.data?.books || []);
      setBooks(booksData);
      setError(null);
    } catch (err) {
      console.error('Erreur chargement livres:', err);
      setError('Impossible de charger les livres');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedBooks = async () => {
    if (!confirm('Voulez-vous initialiser les 4 livres par défaut ? Cette action ne peut être effectuée qu\'une seule fois.')) {
      return;
    }

    try {
      setSeeding(true);
      await api.post('/books/seed');
      alert('Livres initialisés avec succès !');
      fetchBooks();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const errorMsg = error.response?.data?.message || 'Erreur lors de l\'initialisation des livres';
      alert(errorMsg);
    } finally {
      setSeeding(false);
    }
  };

  const handleToggleActive = async (bookId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/books/${bookId}`, { isActive: !currentStatus });
      fetchBooks();
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              Gestion des Livres
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez votre catalogue de livres PDF
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchBooks}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                       text-gray-700 rounded-xl font-semibold transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser
            </motion.button>
            {books.length === 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSeedBooks}
                disabled={seeding}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                         text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {seeding ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Initialisation...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Initialiser les livres
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Message d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4"
        >
          <p className="text-red-700 font-semibold">{error}</p>
        </motion.div>
      )}

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Livres</p>
              <p className="text-3xl font-black text-gray-900 mt-1">{books.length}</p>
            </div>
            <BookOpen className="w-12 h-12 text-indigo-600 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Actifs</p>
              <p className="text-3xl font-black text-gray-900 mt-1">
                {books.filter(b => b.isActive).length}
              </p>
            </div>
            <Eye className="w-12 h-12 text-green-600 opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Revenu Total</p>
              <p className="text-2xl font-black text-gray-900 mt-1">
                {books.reduce((sum, b) => sum + b.price, 0).toLocaleString('fr-FR')} FCFA
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-semibold">Total Pages</p>
              <p className="text-3xl font-black text-gray-900 mt-1">
                {books.reduce((sum, b) => sum + b.pageCount, 0)}
              </p>
            </div>
            <div className="text-4xl">📄</div>
          </div>
        </motion.div>
      </div>

      {/* Liste des livres */}
      {books.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200"
        >
          <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Aucun livre disponible
          </h3>
          <p className="text-gray-600 mb-6">
            Cliquez sur "Initialiser les livres" pour ajouter les 4 livres par défaut
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-indigo-300 transition-all"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-indigo-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-gray-900 mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm font-semibold text-indigo-600 mb-2">
                        {book.subtitle}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          👤 {book.author}
                        </span>
                        <span>•</span>
                        <span>{book.pageCount} pages</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                          {book.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Statut */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleToggleActive(book.bookId, book.isActive)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      book.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {book.isActive ? '✓ Actif' : '✗ Inactif'}
                  </motion.button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {book.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Prix de vente</p>
                    <p className="text-2xl font-black text-gray-900">
                      {book.price.toLocaleString('fr-FR')} <span className="text-sm font-normal">FCFA</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* ID */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-mono">
                    ID: {book.bookId}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
