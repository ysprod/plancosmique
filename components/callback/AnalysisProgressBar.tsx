 import { motion } from 'framer-motion';
import { AnalysisStage } from './types';
 
export type AnalysisProgressBarProps = {
  analysisProgress: number;
  currentStageIndex: number;
  currentStageMessage: string;
  analysisStages: AnalysisStage[];
};

const AnalysisProgressBar = ({ analysisProgress, currentStageIndex, currentStageMessage, analysisStages }: AnalysisProgressBarProps) => {
  const currentStage = analysisStages[currentStageIndex] || analysisStages[0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-8 relative">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-white/70 text-xs">Étape {currentStageIndex + 1}/{analysisStages.length}</p>
              <p className="text-white text-lg sm:text-xl font-semibold">{currentStage.label}</p>
            </div>
            <p className="text-white font-bold text-lg sm:text-xl">{analysisProgress}%</p>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 sm:h-5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${analysisProgress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <p className="text-white/80 text-sm mt-3 min-h-[32px]">{currentStageMessage}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisProgressBar;