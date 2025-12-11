import { motion, type Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProcessingBannerProps {
  isProcessing: boolean;
  isGeneratingAnalysis: boolean;
  itemVariants: Variants | undefined;
}

export function ProcessingBanner({ isProcessing, isGeneratingAnalysis, itemVariants }: ProcessingBannerProps) {
  if (!isProcessing || isGeneratingAnalysis) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-3"
    >
      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 animate-spin flex-shrink-0" />
      <p className="text-blue-800 text-[10px] sm:text-sm">Traitement de votre commande en cours...</p>
    </motion.div>
  );
}
