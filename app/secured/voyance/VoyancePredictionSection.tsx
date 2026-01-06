import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import VoyancePredictionCard from '@/components/voyance/VoyancePredictionCard';

export default function VoyancePredictionSection({
    prediction,
    selectedCategory,
    name,
    handleReset
}: {
    prediction: string;
    selectedCategory: string;
    name: string;
    handleReset: () => void;
}) {
    return (
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
    );
}
