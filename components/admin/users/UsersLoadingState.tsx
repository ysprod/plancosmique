import { motion } from 'framer-motion';

const UsersLoadingState = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
      <p className="text-sm text-gray-900 font-semibold">Chargement des utilisateurs...</p>
      <p className="text-xs text-gray-500 mt-1">Veuillez patienter</p>
    </motion.div>
  </div>
);

export default UsersLoadingState;
