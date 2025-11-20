'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Hash, 
  Award, 
  Target, 
  Compass, 
  Drama, 
  Heart, 
  Zap, 
  ArrowLeft,
  Sparkles,
  Calculator,
  User,
  Calendar,
  Loader2
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const services = [
  { 
    icon: Award, 
    title: "Nombre de naissance", 
    description: "Révèle votre personnalité profonde et vos talents innés",
    color: "from-violet-500 to-purple-500"
  },
  { 
    icon: Target, 
    title: "Nombre d'expression", 
    description: "Dévoile vos aspirations et votre potentiel créateur",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: Compass, 
    title: "Chemin de vie", 
    description: "Éclaire votre parcours et votre mission d'âme",
    color: "from-amber-500 to-orange-500"
  },
  { 
    icon: Drama, 
    title: "Nombre de personnalité", 
    description: "Analyse votre image sociale et votre rayonnement",
    color: "from-rose-500 to-pink-500"
  },
  { 
    icon: Heart, 
    title: "Nombre de l'âme", 
    description: "Révèle vos désirs les plus profonds et authentiques",
    color: "from-teal-500 to-emerald-500"
  }
];

interface NumerologyResult {
  lifePathNumber: number;
  expressionNumber: number;
  soulNumber: number;
  personalityNumber: number;
  interpretation: string;
}

export default function NumerologiePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState('');

  const calculateNumerology = (name: string, date: string): NumerologyResult => {
    // Fonction pour réduire un nombre à un seul chiffre
    const reduceToSingleDigit = (num: number): number => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
      }
      return num;
    };

    // Calculer le chemin de vie à partir de la date de naissance
    const dateDigits = date.replace(/-/g, '').split('').map(Number);
    const lifePathSum = dateDigits.reduce((acc, digit) => acc + digit, 0);
    const lifePathNumber = reduceToSingleDigit(lifePathSum);

    // Mapper les lettres aux nombres (A=1, B=2, etc.)
    const letterToNumber = (letter: string): number => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return alphabet.indexOf(letter.toUpperCase()) + 1;
    };

    // Calculer le nombre d'expression (nom complet)
    const fullName = name.replace(/\s/g, '').toUpperCase();
    const expressionSum = fullName.split('').reduce((acc, letter) => {
      return acc + letterToNumber(letter);
    }, 0);
    const expressionNumber = reduceToSingleDigit(expressionSum);

    // Calculer le nombre de l'âme (voyelles)
    const vowels = 'AEIOUY';
    const soulSum = fullName.split('').reduce((acc, letter) => {
      return vowels.includes(letter) ? acc + letterToNumber(letter) : acc;
    }, 0);
    const soulNumber = reduceToSingleDigit(soulSum);

    // Calculer le nombre de personnalité (consonnes)
    const personalitySum = fullName.split('').reduce((acc, letter) => {
      return !vowels.includes(letter) ? acc + letterToNumber(letter) : acc;
    }, 0);
    const personalityNumber = reduceToSingleDigit(personalitySum);

    // Interprétations simplifiées
    const interpretations: { [key: number]: string } = {
      1: "Leader naturel, indépendant et pionnier. Vous êtes destiné à ouvrir de nouvelles voies.",
      2: "Diplomate sensible, vous excellez dans la coopération et l'harmonie relationnelle.",
      3: "Créatif expressif, votre joie de vivre et votre communication inspirent les autres.",
      4: "Bâtisseur pragmatique, vous créez des fondations solides et durables.",
      5: "Esprit libre aventureux, vous êtes attiré par le changement et l'exploration.",
      6: "Âme nourricière, vous êtes guidé par l'amour, la famille et le service.",
      7: "Chercheur spirituel, vous êtes en quête de vérité et de sagesse intérieure.",
      8: "Manifesteur puissant, vous avez un don pour la réussite matérielle et l'autorité.",
      9: "Humaniste compassionnel, vous œuvrez pour le bien collectif et universel.",
      11: "Maître illuminateur, canal spirituel doté d'une intuition exceptionnelle.",
      22: "Maître bâtisseur, capable de matérialiser de grandes visions pour l'humanité.",
      33: "Maître guérisseur, incarnant l'amour universel et le sacrifice désintéressé."
    };

    return {
      lifePathNumber,
      expressionNumber,
      soulNumber,
      personalityNumber,
      interpretation: interpretations[lifePathNumber] || "Votre chemin unique révèle des potentiels extraordinaires."
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.firstName || !formData.lastName || !formData.birthDate) {
        throw new Error('Veuillez remplir tous les champs');
      }

      // Simuler un appel API (vous pouvez remplacer par un vrai appel API)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Calculer la numérologie
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const numerologyData = calculateNumerology(fullName, formData.birthDate);
      
      setResult(numerologyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f012_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f012_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Decorative orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/20 via-blue-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tl from-purple-200/20 via-pink-200/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Hash className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-4 tracking-tight">
            NUMÉROLOGIE
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Découvrez les secrets cachés dans vos nombres personnels
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">Calculez votre profil numérologique</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4" />
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    placeholder="Votre prénom"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <User className="w-4 h-4" />
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Calcul en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Découvrir mon profil
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Résultats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {result ? (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6">Votre Profil Numérologique</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-indigo-100">
                    <div className="flex items-center gap-3 mb-2">
                      <Compass className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-slate-700">Chemin de Vie</span>
                    </div>
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                      {result.lifePathNumber}
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{result.interpretation}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-slate-700 text-sm">Expression</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-600">{result.expressionNumber}</div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-rose-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <span className="font-semibold text-slate-700 text-sm">Âme</span>
                      </div>
                      <div className="text-3xl font-bold text-rose-600">{result.soulNumber}</div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-teal-100 col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Drama className="w-4 h-4 text-teal-600" />
                        <span className="font-semibold text-slate-700 text-sm">Personnalité</span>
                      </div>
                      <div className="text-3xl font-bold text-teal-600">{result.personalityNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200 flex flex-col items-center justify-center h-full min-h-[400px]">
                <Hash className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-slate-500 text-center">
                  Remplissez le formulaire pour découvrir<br />votre profil numérologique complet
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
            Les Nombres Sacrés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`bg-gradient-to-br ${service.color.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md mb-4`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
