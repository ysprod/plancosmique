import { motion, Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type AnalysisPreviewProps = {
  consultationId: string | null;
  downloadUrl: string | null;
  itemVariants: Variants;
};

const AnalysisPreview = ({ consultationId, downloadUrl, itemVariants }: AnalysisPreviewProps) => {
  const cards = [
    {
      title: 'Consultation créée',
      description: consultationId ? `ID consultation: ${consultationId}` : 'Consultation prête',
      accent: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Téléchargement',
      description: downloadUrl ? 'Lien de téléchargement disponible' : 'Lien disponible après génération',
      accent: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-purple-200/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-3">
          <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Aperçu de votre analyse</h3>
          <p className="text-xs sm:text-sm text-gray-600">Votre rapport est prêt à être consulté</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-purple-100"
          >
            <div className={`h-1 w-12 rounded-full mb-2 bg-gradient-to-r ${card.accent}`} />
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{card.title}</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnalysisPreview;
