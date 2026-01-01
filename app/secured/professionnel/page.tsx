'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Slide4Section from '@/components/vie-personnelle/Slide4Section';

const ProfessionnelPage = () => {
  return (
    <div className=" text-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Ma Vie Professionnelle
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Découvrez votre potentiel de carrière, vos talents cachés et votre mission professionnelle à travers l'astrologie.
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
            <Slide4Section rubriqueId="694d32075b9d9dfa00bed231" typeconsultation="PROFESSIONNEL" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionnelPage;