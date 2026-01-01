import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Download, Star } from 'lucide-react';
import CosmicLoader from '../../app/secured/consultations/[id]/CosmicLoader';
import SubjectHeader from '../../app/secured/consultations/[id]/SubjectHeader';
import MarkdownContent from '../../app/secured/consultations/[id]/MarkdownContent';

interface ConsultationResultMainProps {
  loading: boolean;
  error: string | null;
  analyse: any;
  handleBack: () => void;
  handleDownloadPDF: () => void;
}

const ConsultationResultMain = ({ loading, error, analyse, handleBack, handleDownloadPDF }: ConsultationResultMainProps) => {
  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <CosmicLoader />
      </AnimatePresence>
    );
  }
  if (error || !analyse) {
    return (
      <div className=" bg-gradient-to-br from-red-900 via-orange-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 max-w-md w-full text-center border border-white/20 shadow-2xl"
        >
          <AlertCircle className="w-14 h-14 sm:w-16 sm:h-16 text-red-300 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Erreur</h2>
          <p className="text-sm sm:text-base text-red-200 mb-6">{error || 'Analyse non disponible'}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold text-white transition-all active:scale-95"
          >
            Retour aux consultations
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className=" bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline font-semibold text-sm sm:text-base">Retour</span>
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-base sm:text-lg md:text-xl font-black text-white flex items-center justify-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300" />
                <span>Analyse Astrologique</span>
              </h1>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg rounded-xl text-white font-semibold transition-all active:scale-95 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        <SubjectHeader sujet={analyse.carteDuCiel.sujet} />
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20"
        >
          <MarkdownContent content={analyse.missionDeVie.contenu} />
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationResultMain;
