"use client";
import { NumerologieConsultationSection } from '@/components/numerologie/NumerologieConsultationSection';
import { AnimatePresence, motion } from 'framer-motion';

const CyclesPersonnelsPage = () => {
    return (
        <div className="text-center bg-gradient-to-br from-slate-50 via-yellow-50 to-amber-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-700 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                            Mes Cycles Personnels
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Comprenez les cycles du temps qui vous influencent actuellement et découvrez comment avancer au bon rythme grâce à la numérologie.
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
                        <NumerologieConsultationSection rubriqueId="69578d58386fb2c2bb3e70d7" typeconsultation="CYCLES_PERSONNELS" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CyclesPersonnelsPage;
