import { motion } from 'framer-motion';
import { memo } from 'react';

const PageHeader = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-8 sm:mb-12"
  >
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 tracking-tight">
      Incantations & Rituels Magiques
    </h1>
    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      Connectez-vous aux forces cosmiques ancestrales à travers les cycles lunaires
    </p>
  </motion.div>
));
PageHeader.displayName = 'PageHeader';

export { PageHeader };
