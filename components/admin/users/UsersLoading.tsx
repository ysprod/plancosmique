import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const UsersLoading = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="inline-block mb-4"
      >
        <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
      </motion.div>
      <p className="text-base text-gray-600 font-medium">
        Chargement des utilisateurs...
      </p>
    </motion.div>
  </div>
);

export default UsersLoading;
