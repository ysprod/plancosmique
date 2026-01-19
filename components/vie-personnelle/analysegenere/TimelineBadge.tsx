import { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const TimelineBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ 
      delay: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 15
    }}
    className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-300"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
    </motion.div>
    <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
      Délai maximum : 1 heure
    </span>
  </motion.div>
));

TimelineBadge.displayName = 'TimelineBadge';

export default TimelineBadge;
