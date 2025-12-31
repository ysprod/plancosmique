import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const BooksDownloadInfo = () => (
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
);

export default BooksDownloadInfo;
