'use client';
import VoyanceFormSection from '@/components/voyance/VoyanceFormSection';
import VoyanceHeader from '@/components/voyance/VoyanceHeader';
import VoyancePredictionSection from '@/components/voyance/VoyancePredictionSection';
import { useVoyancePage } from '@/hooks/voyance/useVoyancePage';
import { AnimatePresence, motion } from 'framer-motion';

export default function VoyancePageClient() {
  const {
    question, isRevealing, prediction, name, birthDate, selectedCategory,
    setSelectedCategory, setName, setBirthDate, setQuestion, handleReveal, handleReset
  } = useVoyancePage();

  return (
    <div className="relative  bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
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
        <VoyanceHeader />
        <AnimatePresence mode="wait">
          {!prediction ? (
            <VoyanceFormSection
              selectedCategory={selectedCategory ?? ''}
              setSelectedCategory={setSelectedCategory}
              name={name}
              setName={setName}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              question={question}
              setQuestion={setQuestion}
              isRevealing={isRevealing}
              handleReveal={handleReveal}
            />
          ) : (
            <VoyancePredictionSection
              prediction={prediction}
              selectedCategory={selectedCategory ?? ''}
              name={name}
              handleReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
