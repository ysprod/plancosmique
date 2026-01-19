import { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const ConfidentialityNotice = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.37 }}
    className="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-blue-950/40 dark:via-cyan-950/40 dark:to-blue-950/40 border border-blue-200/60 dark:border-blue-700/40 shadow-lg"
  >
    {/* Animated background */}
    <motion.div
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:from-transparent dark:via-cyan-500/10 dark:to-transparent"
      style={{ backgroundSize: '200% 100%' }}
    />
    
    <div className="relative flex items-start gap-3 sm:gap-3.5">
      <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
          <strong className="font-bold text-blue-700 dark:text-blue-300">🔒 Confidentialité garantie :</strong> Toutes vos informations et demandes sont strictement confidentielles et protégées. Elles ne seront jamais partagées avec des tiers.
        </p>
      </div>
    </div>
  </motion.div>
));

ConfidentialityNotice.displayName = 'ConfidentialityNotice';

export default ConfidentialityNotice;
