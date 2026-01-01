'use client';
import VoyanceCategorySelector from '@/components/voyance/VoyanceCategorySelector';
import VoyanceFormFields from '@/components/voyance/VoyanceFormFields';
import VoyancePredictionCard from '@/components/voyance/VoyancePredictionCard';
import { predictions } from '@/components/voyance/voyanceData';
import { useVoyanceForm } from '@/hooks/voyance/useVoyanceForm';
import { useVoyancePrediction } from '@/hooks/voyance/useVoyancePrediction';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Eye, Loader2 } from 'lucide-react';

export default function VoyancePage() {
  const {
    selectedCategory,
    setSelectedCategory,
    name,
    setName,
    birthDate,
    setBirthDate,
    question,
    setQuestion,
    isRevealing,
    setIsRevealing,
    prediction,
    setPrediction,
    resetForm
  } = useVoyanceForm();
  const handleReveal = useVoyancePrediction(predictions, setPrediction, setIsRevealing);
  const handleReset = resetForm;

  return (
    <div className="relative  bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">


        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
              <Eye className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-4">
            Voyance Personnelle
          </h1>
          <p className="text-xl text-purple-200">
            Laissez les astres révéler votre destinée
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!prediction ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500/30 shadow-2xl"
            >
              <VoyanceCategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <VoyanceFormFields name={name} setName={setName} birthDate={birthDate} setBirthDate={setBirthDate} question={question} setQuestion={setQuestion} />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleReveal(selectedCategory, name)}
                disabled={!selectedCategory || !name || isRevealing}
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-black text-lg rounded-2xl shadow-xl disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {isRevealing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Consultation des astres...
                  </>
                ) : (
                  <>Révéler ma destinée</>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="text-xl font-black text-green-300">Prédiction Révélée</h3>
                    <p className="text-green-200">Les astres ont parlé pour vous, {name}</p>
                  </div>
                </div>
              </motion.div>
              <VoyancePredictionCard prediction={prediction} selectedCategory={selectedCategory} name={name} />
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all"
                >
                  Nouvelle prédiction
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
