'use client';
import { BookOpen, Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PurchaseInfo {
  downloadUrl: string;
  token: string;
  bookTitle: string;
  expiresAt?: string;
}

export default function BookSuccessMain({ purchaseInfo, onDownload }: { purchaseInfo: PurchaseInfo; onDownload: () => void }) {
  return (
    <div className=" bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center border-2 border-green-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
          >
            <CheckCircle2 className="w-14 h-14 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
          >
            Paiement Réussi ! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-700 mb-2"
          >
            Merci pour votre achat de <strong>{purchaseInfo?.bookTitle || 'ce livre'}</strong> !
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-base text-gray-600 mb-8"
          >
            Votre livre PDF est maintenant disponible.
          </motion.p>

          <motion.button
            onClick={onDownload}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all mb-6"
          >
            <Download className="w-6 h-6" />
            Télécharger votre livre
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 text-left">
                Votre livre sera également disponible dans votre espace personnel.
                Vous pourrez le télécharger à nouveau à tout moment depuis votre profil.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/star/livres">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Voir plus de livres
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}