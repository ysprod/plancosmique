import { memo } from 'react';
import { motion } from 'framer-motion';
import { Stars } from 'lucide-react';

const MasterAssignmentNotice = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 dark:from-purple-950/50 dark:via-pink-950/50 dark:to-purple-950/50 border-2 border-purple-300/60 dark:border-purple-600/50 shadow-xl"
    role="status"
    aria-live="polite"
  >
    {/* Sparkle effect */}
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:from-transparent dark:via-purple-400/20 dark:to-transparent"
    />
    
    <div className="relative flex items-start gap-3 sm:gap-4">
      <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 flex items-center justify-center shadow-xl">
        <Stars className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
          Nous transmettons actuellement votre requête à un{' '}
          <strong className="font-extrabold bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700 bg-clip-text text-transparent dark:from-purple-300 dark:via-pink-300 dark:to-purple-300">
            ✨ Maître spirituel qualifié
          </strong>{' '}
          et disponible, qui procédera à l'étude de votre situation avec la plus grande attention et discernement.
        </p>
      </div>
    </div>
  </motion.div>
));

MasterAssignmentNotice.displayName = 'MasterAssignmentNotice';

export default MasterAssignmentNotice;
