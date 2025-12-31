import { motion } from "framer-motion";

const AstrologieHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <motion.h1
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
    >
      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Astrologie
      </span>
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-lg sm:text-xl text-gray-700 mb-2 max-w-3xl mx-auto"
    >
      Découvre Ton Chemin de Vie
    </motion.p>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
    >
      Explore les influences cosmiques qui façonnent ta destinée à travers 4 domaines essentiels de ta vie.
      Laisse les astres te guider vers ton véritable potentiel.
    </motion.p>
  </motion.div>
);

export default AstrologieHeader;
