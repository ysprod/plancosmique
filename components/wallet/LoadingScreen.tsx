import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className=" flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 rounded-full border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400"
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2"
    >
      <Sparkles className="w-4 h-4 text-purple-500" />
      <span>Chargement de vos transactions...</span>
    </motion.p>
  </motion.div>
);
export default LoadingScreen;
