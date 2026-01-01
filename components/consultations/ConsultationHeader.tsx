import { ArrowLeft, Download, Star } from 'lucide-react';

interface ConsultationHeaderProps {
  onBack: () => void;
  onDownloadPDF: () => void;
}

export default function ConsultationHeader({ onBack, onDownloadPDF }: ConsultationHeaderProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={onBack}
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
            onClick={onDownloadPDF}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg rounded-xl text-white font-semibold transition-all active:scale-95 text-sm sm:text-base"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
