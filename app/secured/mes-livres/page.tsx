'use client';
import { motion } from 'framer-motion';
import { BookOpen, Download, Calendar, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { api } from '@/lib/api/client';

interface BookPurchase {
  _id: string;
  bookId: string;
  bookTitle: string;
  price: number;
  purchaseDate: string;
  downloadToken: string;
  downloadCount: number;
}

export default function MesLivresPage() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<BookPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.phone) {
        setError('Numéro de téléphone non trouvé');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/books/user/purchases?phone=${user.phone}`);
        setPurchases(response.data || []);
      } catch (err) {
        console.error('Erreur chargement achats:', err);
        setError('Impossible de charger vos achats');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const handleDownload = (bookId: string, token: string) => {
    const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/books/${bookId}/download?token=${token}`;
    window.location.href = downloadUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-semibold">Chargement de vos livres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">       
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-12 h-12 text-purple-600" />
              <h1 className="text-4xl font-black text-gray-900">
                Mes Livres
              </h1>
            </div>
            <p className="text-lg text-gray-700">
              Retrouvez tous vos livres achetés et téléchargez-les à tout moment
            </p>
          </motion.div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center"
          >
            <p className="text-red-700 font-semibold">{error}</p>
          </motion.div>
        )}

        {/* Liste des achats */}
        {purchases.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Aucun livre acheté
            </h2>
            <p className="text-gray-600 mb-8">
              Découvrez notre collection de livres spirituels
            </p>
            <Link href="/secured/livres">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Parcourir la boutique
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((purchase, index) => (
              <motion.div
                key={purchase._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-purple-100 hover:border-purple-300 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-purple-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-gray-900 mb-1">
                        {purchase.bookTitle}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(purchase.purchaseDate).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">
                        {purchase.downloadCount} téléchargement{purchase.downloadCount > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {purchase.price.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(purchase.bookId, purchase.downloadToken)}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info */}
        {purchases.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border-2 border-blue-200 text-center"
          >
            <BookOpen className="w-12 h-12 text-blue-700 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Téléchargement illimité
            </h3>
            <p className="text-gray-700">
              Vous pouvez télécharger vos livres autant de fois que vous le souhaitez. 
              Ils sont accessibles à vie depuis cette page.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
