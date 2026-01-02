"use client";
import { NumerologieConsultationSection } from '@/components/numerologie/NumerologieConsultationSection';
import { AnimatePresence, motion } from 'framer-motion';

const NombresPersonnelsPage = () => {
  return (
    <div className="text-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <br />     <br />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Vos Nombres Personnels
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Découvrez les nombres essentiels qui définissent votre identité profonde et votre direction de vie grâce à la numérologie.
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
            <NumerologieConsultationSection rubriqueId="69578c355ca5de1d4df13844" typeconsultation="NOMBRES_PERSONNELS" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NombresPersonnelsPage;
