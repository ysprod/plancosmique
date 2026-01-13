import { memo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface StatusBannerProps {
  hasSelection: boolean;
  isSufficient: boolean;
}

export const StatusBanner = memo(({ hasSelection, isSufficient }: StatusBannerProps) => {
  if (!hasSelection) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 \
                 border border-yellow-200 dark:border-yellow-800"
      >
        <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          Sélectionnez une alternative disponible pour continuer
        </p>
      </motion.div>
    );
  }
  if (!isSufficient) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 \
                 border border-red-200 dark:border-red-800"
      >
        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-red-700 dark:text-red-300">
          Quantité insuffisante. Rendez-vous au marché pour acquérir cette offrande.
        </p>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-start gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 \
               border border-green-200 dark:border-green-800"
    >
      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
      <p className="text-xs text-green-700 dark:text-green-300">
        Alternative sélectionnée et disponible. Prêt à continuer !
      </p>
    </motion.div>
  );
});

StatusBanner.displayName = "StatusBanner";
