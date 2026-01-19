import { memo } from 'react';
import { motion } from 'framer-motion';

const ThankYouMessage = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.58 }}
    className="text-center py-4 sm:py-5 border-t border-slate-200/50 dark:border-slate-700/50"
  >
    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
      Nous vous remercions pour votre confiance. 🙏
    </p>
  </motion.div>
));

ThankYouMessage.displayName = 'ThankYouMessage';

export default ThankYouMessage;
