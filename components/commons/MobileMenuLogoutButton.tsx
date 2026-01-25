import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

export default function MobileMenuLogoutButton({ handleLogout }: { handleLogout: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      onClick={handleLogout}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-black shadow-xl hover:shadow-2xl hover:shadow-red-500/40 transition-all"
    >
      <LogOut className="w-5 h-5" />
      <span>Se déconnecter</span>
    </motion.button>
  );
}
