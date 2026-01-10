import { motion } from 'framer-motion';

export default function HoroscopeHeader() {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-6"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
        HOROSCOPE
      </h1>
      <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
        Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines
      </p>
    </motion.div>
  );
}