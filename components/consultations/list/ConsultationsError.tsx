import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ConsultationsErrorProps {
  error: string | null;
}

export default function ConsultationsError({ error }: ConsultationsErrorProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-300 flex-shrink-0" />
            <p className="text-red-100">{error}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
