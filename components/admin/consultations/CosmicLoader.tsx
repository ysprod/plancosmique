import { motion } from 'framer-motion';

export const CosmicLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 relative overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0 -z-10">
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.08, 0.15, 0.08], x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-500/20 rounded-full blur-3xl"
      />
    </div>
    <motion.div initial="hidden" animate="visible" className="text-center z-10">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-full blur-2xl" />
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 bg-purple-500 rounded-full blur-xl" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 rounded-full" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-2 border-4 border-indigo-500/30 border-b-indigo-500 rounded-full" />
      </div>
      <motion.h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2" animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #c4b5fd, #ddd6fe, #a78bfa)', backgroundSize: '200% 100%', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Chargement des consultations</motion.h2>
      <motion.p className="text-xs sm:text-sm text-purple-200/70 font-medium" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>Récupération des données en cours...</motion.p>
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-400" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} />
        ))}
      </div>
    </motion.div>
  </div>
);
