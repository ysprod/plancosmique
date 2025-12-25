'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Slide4Section from './Slide4Section';

const ViePersonnellePage = () => {
  return (
    <div className="min-h-screen text-center bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center"><br />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
              Ma Vie Personnelle
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explorez votre essence profonde, vos talents cachés et votre destinée.
            </p>
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="consultation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white"
          >
            <Slide4Section rubriqueId="694cde9bde3392d3751a0fe9" typeconsultation="VIE_PERSONNELLE" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViePersonnellePage;