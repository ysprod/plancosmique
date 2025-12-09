'use client';

import { motion } from 'framer-motion';
import { BookOpen, Download, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  pages: number;
  coverImage: string;
  category: string;
  rating: number;
  preview?: string;
}

const BOOKS: Book[] = [
  {
    id: 'secrets-ancestraux',
    title: 'Les Secrets Ancestraux',
    subtitle: 'Sagesse Africaine et Spiritualité',
    description: 'Découvrez les enseignements sacrés transmis de génération en génération. Ce livre révèle les pratiques spirituelles, rituels et connaissances ésotériques de l\'Afrique traditionnelle.',
    price: 5000,
    pages: 250,
    coverImage: '/books/secrets-ancestraux.jpg',
    category: 'Spiritualité',
    rating: 4.9,
  },
  {
    id: 'astrologie-africaine',
    title: 'Astrologie Africaine',
    subtitle: 'Le Zodiaque Ancestral',
    description: 'Explorez le système astrologique africain unique qui relie les cycles cosmiques aux traditions ancestrales. Comprenez votre signe et votre destinée selon la sagesse des anciens.',
    price: 4500,
    pages: 180,
    coverImage: '/books/astrologie-africaine.jpg',
    category: 'Astrologie',
    rating: 4.8,
  },
  {
    id: 'numerologie-sacree',
    title: 'Numérologie Sacrée',
    subtitle: 'Les Nombres de Votre Destin',
    description: 'Les nombres révèlent votre mission de vie, vos talents cachés et vos cycles d\'évolution. Apprenez à décoder les messages numériques qui guident votre existence.',
    price: 3500,
    pages: 150,
    coverImage: '/books/numerologie-sacree.jpg',
    category: 'Numérologie',
    rating: 4.7,
  },
  {
    id: 'rituels-puissance',
    title: 'Rituels de Puissance',
    subtitle: 'Invocations et Pratiques Magiques',
    description: 'Guide pratique des rituels efficaces pour la protection, l\'abondance, l\'amour et la transformation. Chaque rituel est expliqué étape par étape avec les incantations authentiques.',
    price: 6000,
    pages: 300,
    coverImage: '/books/rituels-puissance.jpg',
    category: 'Pratiques',
    rating: 5.0,
  },
];

export default function LivresPage() {
  const [purchasingBookId, setPurchasingBookId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async (book: Book) => {
    setPurchasingBookId(book.id);
    setError(null);

    try {
      const paymentData = {
        totalPrice: book.price,
        article: [{ livre: book.price }],
        personal_Info: [{
          bookId: book.id,
          bookTitle: book.title,
          productType: 'ebook_pdf',
        }],
        numeroSend: '0758385387', // À remplacer par le numéro de l'utilisateur
        nomclient: 'Client', // À remplacer par le nom de l'utilisateur
        return_url: `${window.location.origin}/callback?book_id=${book.id}&type=book`,
        webhook_url: `${window.location.origin}/api/webhooks/moneyfusion`,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/protected/profil">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Retour au profil</span>
            </motion.button>
          </Link>

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
          {BOOKS.map((book, index) => (
            <motion.div
              key={book.id}
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

                {/* Rating & Pages */}
                <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{book.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{book.pages} pages</span>
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
                    disabled={purchasingBookId === book.id}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 
                             text-white px-4 py-2 rounded-xl font-bold text-sm 
                             hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {purchasingBookId === book.id ? (
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
