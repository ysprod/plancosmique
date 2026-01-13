import { memo } from 'react';
import { motion } from 'framer-motion';

interface FormActionsProps {
  onSubmit: (e: any) => void;
  onCancel: () => void;
}

export const FormActions = memo<FormActionsProps>(function FormActions({
  onSubmit,
  onCancel,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: 'spring' }}
      className="pt-3"
    >
      <div className="flex flex-col items-stretch justify-center gap-2.5 sm:flex-row">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg overflow-hidden
                     bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:shadow-purple-500/50
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 dark:focus-visible:ring-purple-700/40 transition-all duration-300 sm:w-auto"
        >
          Valider et Continuer
        </motion.button>

        <motion.button
          type="button"
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex w-full items-center justify-center rounded-xl border-2 border-purple-200 dark:border-purple-700/50 bg-white dark:bg-gray-900 px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200
                     hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-300 dark:hover:border-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 dark:focus-visible:ring-purple-700/40 transition-all sm:w-auto"
        >
          Annuler
        </motion.button>
      </div>
    </motion.div>
  );
});
