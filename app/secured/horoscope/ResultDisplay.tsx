import { motion } from "framer-motion";
import { Sparkles, Heart, Briefcase, Activity, Star, Moon } from "lucide-react";
import { memo } from "react";
import { HoroscopeResult } from "./page";

const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 }
    }
};
 
interface ResultDisplayProps {
    result: HoroscopeResult;
}

const ResultDisplay = memo<ResultDisplayProps>(({ result }) => (
    <motion.div
        variants={resultVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-5"
    >
        <div className="text-center pb-5 border-b border-gray-200">
            <motion.div
                className="text-5xl sm:text-6xl mb-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
                {result.symbol}
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                {result.zodiacSign}
            </h3>
            <p className="text-gray-600 font-medium text-sm mb-2">{result.period}</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-semibold">
                    {result.element}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
                    {result.horoscopeType}
                </span>
            </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-200">
            <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-900">Prévisions Générales</h4>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{result.generalForecast}</p>
        </div>

        <div className="grid gap-3">
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-rose-200 transition-colors"
            >
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">Amour & Relations</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{result.love}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-blue-200 transition-colors"
            >
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">Travail & Carrière</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{result.work}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-green-200 transition-colors"
            >
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1 text-sm">Santé & Bien-être</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{result.health}</p>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Sagesse africaine */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-amber-900 text-sm">Sagesse Ancestrale</h4>
            </div>
            <p className="text-amber-800 italic leading-relaxed text-xs sm:text-sm">
                "{result.spiritualAdvice}"
            </p>
        </div>

        {/* Informations astrologiques */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border-2 border-gray-100 text-center">
                <Moon className="w-5 h-5 mx-auto mb-2 text-purple-600" />
                <p className="text-xs text-gray-600 mb-1">Planète Dominante</p>
                <p className="font-bold text-gray-900 text-xs">{result.dominantPlanet}</p>
            </div>
            <div className="bg-white rounded-xl p-3 border-2 border-gray-100 text-center">
                <Sparkles className="w-5 h-5 mx-auto mb-2 text-amber-600" />
                <p className="text-xs text-gray-600 mb-1">Couleur Porte-bonheur</p>
                <p className="font-bold text-gray-900 text-xs">{result.luckyColor}</p>
            </div>
        </div>
    </motion.div>
), (prev, next) => prev.result === next.result);

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;