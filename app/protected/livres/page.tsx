'use client';

import { motion } from 'framer-motion';
import { BookOpen, Download, ShoppingCart, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import axios from 'axios';
import { api } from '@/lib/api/client';

interface Book {
  _id: string;
  bookId: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  pageCount: number;
  coverImage?: string;
  category: string;
  author: string;
  isActive?: boolean;
}

export default function LivresPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingBookId, setPurchasingBookId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Charger les livres depuis le backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        // Le backend peut retourner soit un tableau directement, soit un objet avec une propriété books
        const booksData = Array.isArray(response.data) ? response.data : (response.data?.books || []);
        setBooks(booksData);
      } catch (err) {
        console.error('Erreur chargement livres:', err);
        setError('Impossible de charger les livres');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handlePurchase = async (book: Book) => {
    setPurchasingBookId(book.bookId);
    setError(null);

    try {
      const phoneNumber = user?.phone || '0758385387';
      const clientName = user?.username || 'Client';

      const paymentData = {
        totalPrice: book.price,
        article: [{ livre: book.price }],
        personal_Info: [{
          bookId: book.bookId,
          bookTitle: book.title,
          productType: 'ebook_pdf',
          phone: phoneNumber,
        }],
        numeroSend: phoneNumber,
        nomclient: clientName,
        return_url: `'https://www.monetoile.org/callback?book_id=${book.bookId}&type=book&phone=${phoneNumber}`,
        webhook_url: `https://www.monetoile.org/api/webhooks/moneyfusion`,
      };

      const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
      const response = await axios.post(apiUrl, paymentData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.statut && response.data?.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error(response.data?.message || 'Erreur lors du paiement');
      }
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setError(error.response?.data?.message || error.message || 'Erreur lors du paiement');
      setPurchasingBookId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-semibold">Chargement des livres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">

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

        {/* Grille de livres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Aucun livre disponible pour le moment</p>
            </div>
          ) : (
            books.map((book, index) => (
              <motion.div
                key={book.bookId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all group"
              >
                {/* Couverture */}
                <div className="relative h-64 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-white opacity-50" />
                  <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {book.category}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm font-semibold text-amber-600 mb-3">
                    {book.subtitle}
                  </p>

                  {/* Author & Pages */}
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{book.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{book.pageCount} pages</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {book.description}
                  </p>

                  {/* Prix et CTA */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <p className="text-2xl font-black text-gray-900">
                        {book.price.toLocaleString('fr-FR')} <span className="text-sm font-normal">FCFA</span>
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePurchase(book)}
                      disabled={purchasingBookId === book.bookId}
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 
                               text-white px-4 py-2 rounded-xl font-bold text-sm 
                               hover:shadow-lg transition-all disabled:opacity-50"
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
            ))
          )}
        </div>

        {/* Info téléchargement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border-2 border-amber-200 text-center"
        >
          <Download className="w-12 h-12 text-amber-700 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Téléchargement instantané
          </h3>
          <p className="text-gray-700">
            Après paiement, vous recevrez un lien de téléchargement direct pour votre livre PDF. 
            Vous pourrez le télécharger et le conserver à vie sur tous vos appareils.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
