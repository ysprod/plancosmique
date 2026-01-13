import { motion } from 'framer-motion';
import { containerVariants } from '@/lib/animation.constants';
import { itemVariants } from './constants';

const AnalyseHoroscopeHeader = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-7xl mx-auto"
  >
    <motion.div
      variants={itemVariants}
      className="text-center mb-4 sm:mb-6"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
        HOROSCOPE
      </h1>
      <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
        Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines
      </p>
      <div className="mt-3 h-1 w-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
    </motion.div>
  </motion.div>
);

export { AnalyseHoroscopeHeader };