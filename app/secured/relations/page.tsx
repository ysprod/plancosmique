'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Slide4Section from '../../../components/vie-personnelle/Slide4Section';

const RelationsPage = () => {
  return (
    <div className="min-h-screen text-center bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-700 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
              Mes Relations
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Découvrez la dynamique de vos relations amoureuses, familiales et amicales à travers l'astrologie.
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
            <Slide4Section rubriqueId="694d30245b9d9dfa00becfc2" typeconsultation="RELATIONS" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RelationsPage;
