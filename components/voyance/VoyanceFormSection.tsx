import VoyanceCategorySelector from '@/components/voyance/VoyanceCategorySelector';
import VoyanceFormFields from '@/components/voyance/VoyanceFormFields';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function VoyanceFormSection({
  selectedCategory,
  setSelectedCategory,
  name,
  setName,
  birthDate,
  setBirthDate,
  question,
  setQuestion,
  isRevealing,
  handleReveal
}: {
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  name: string;
  setName: (n: string) => void;
  birthDate: string;
  setBirthDate: (d: string) => void;
  question: string;
  setQuestion: (q: string) => void;
  isRevealing: boolean;
  handleReveal: (category: string, name: string) => void;
}) {
  return (
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
  );
}
