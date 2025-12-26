import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const PageHeader = memo(({ onBack }: { onBack: () => void }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl"
  >
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition-all group border border-white/10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm font-semibold">Retour</span>
        </motion.button>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
        </motion.div>
      </div>
    </div>
  </motion.div>
));

PageHeader.displayName = 'PageHeader';

export default PageHeader;