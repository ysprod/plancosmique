import { motion } from "framer-motion";
import { LogOut, Sparkles, Shield, Zap, Star } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 22, mass: 0.8 } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } }
};

const iconPulse = {
  scale: [1, 1.08, 1],
  transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
};

export const LoadingState = ({ progress }: { progress: number }) => (
  <motion.div
    key="loading"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-10 text-center"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 sm:mb-6 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-xl shadow-violet-500/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <LogOut className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-fuchsia-500" />
      </motion.div>
    </motion.div>
    <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Déconnexion en cours</motion.h2>
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-600 mb-5 sm:mb-7 text-sm sm:text-base">Sécurisation de votre session...</motion.p>
    <div className="mb-5 sm:mb-7">
      <div className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
        <motion.div className="h-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full relative" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.25, ease: "easeOut" }}>
          <motion.div className="absolute inset-0 bg-white/30" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </motion.div>
      </div>
      <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-xs sm:text-sm text-slate-500 mt-2 font-semibold">{progress}%</motion.p>
    </div>
    
    <div className="flex items-center justify-center gap-3 sm:gap-4 text-slate-400">
      {[
        { Icon: Shield, color: "text-blue-400" },
        { Icon: Zap, color: "text-yellow-400" },
        { Icon: Star, color: "text-purple-400" }
      ].map(({ Icon, color }, i) => (
        <motion.div key={i} animate={iconPulse} transition={{ ...iconPulse.transition, delay: i * 0.15 }} className={color}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);