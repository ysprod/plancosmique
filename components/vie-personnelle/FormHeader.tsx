import { memo } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

export const FormHeader = memo(function FormHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, type: 'spring' }}
      className="mx-auto mb-6 flex max-w-xl flex-col items-center justify-center text-center"
    >
      <motion.div
        className="mb-3 relative"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 rounded-2xl shadow-lg">
          <UserPlus className="w-7 h-7 text-white" />
        </div>
        <motion.div
          className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      <h2 className="text-xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent tracking-tight sm:text-2xl">
        Informations sur la personne tierce
      </h2>
      <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-300 font-medium">
        Remplis les champs pour une consultation personnalisée et précise
      </p>
    </motion.div>
  );
});