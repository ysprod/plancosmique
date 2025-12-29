import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-base font-semibold text-gray-900 mb-1">Chargement du tableau de bord</p>
          <p className="text-sm text-gray-500">Veuillez patienter quelques instants...</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
