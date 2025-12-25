'use client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Sparkles,
  Moon,
  Star,
  Heart,
  Briefcase,
  Coins,
  Users,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

// Prediction categories
const categories = [
  { id: 'amour', icon: Heart, label: 'Amour', color: 'from-pink-500 to-rose-600' },
  { id: 'carriere', icon: Briefcase, label: 'Carrière', color: 'from-blue-500 to-indigo-600' },
  { id: 'finances', icon: Coins, label: 'Finances', color: 'from-yellow-500 to-amber-600' },
  { id: 'famille', icon: Users, label: 'Famille', color: 'from-green-500 to-emerald-600' }
];

const predictions: Record<string, string[]> = {
  amour: [
    "Les étoiles s'alignent en votre faveur. Une rencontre marquante se profile à l'horizon dans les 3 prochaines semaines.",
    "Votre âme sœur est plus proche que vous ne le pensez. Ouvrez votre cœur aux nouvelles opportunités.",
    "Une relation passée cherche à se manifester. Le cosmos vous guide vers une réconciliation ou une fermeture nécessaire.",
    "L'énergie de Vénus vous entoure. C'est le moment idéal pour raviver la flamme dans votre relation actuelle.",
    "Un voyage inattendu vous mènera vers l'amour. Restez ouvert aux signes de l'univers."
  ],
  carriere: [
    "Une opportunité professionnelle majeure se présente dans les 2 prochains mois. Saisissez-la sans hésitation.",
    "Votre travail acharné sera bientôt récompensé. Les astres indiquent une promotion ou reconnaissance imminente.",
    "Un changement de direction professionnelle est en cours. Faites confiance à votre intuition cosmique.",
    "Mercure rétrograde apporte des défis temporaires, mais ils révèlent votre vraie force et résilience.",
    "Une collaboration inattendue transformera votre trajectoire professionnelle de manière positive."
  ],
  finances: [
    "Jupiter entre dans votre maison financière. L'abondance et la prospérité sont en route.",
    "Un investissement réfléchi dans les 6 prochains mois portera ses fruits de manière inattendue.",
    "Attention aux dépenses impulsives ce mois-ci. Les astres conseillent la prudence et la réflexion.",
    "Une source de revenus supplémentaire se manifeste. Restez attentif aux opportunités cachées.",
    "Les cycles lunaires favorisent une période d'accumulation. C'est le moment de construire vos réserves."
  ],
  famille: [
    "L'harmonie familiale s'intensifie. C'est le moment idéal pour résoudre les conflits anciens.",
    "Un membre de la famille vous apporte une nouvelle joyeuse dans les semaines à venir.",
    "Les liens ancestraux se renforcent. Honorez vos racines et vos traditions familiales.",
    "Un enfant de la famille révèle un talent caché. Encouragez son développement avec amour.",
    "Les énergies cosmiques favorisent les réunions familiales. Organisez un rassemblement mémorable."
  ]
};

export default function VoyancePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [question, setQuestion] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleReveal = () => {
    if (!selectedCategory || !name) return;

    setIsRevealing(true);

    // Simulate cosmic revelation delay
    setTimeout(() => {
      const categoryPredictions = predictions[selectedCategory];
      const randomPrediction = categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)];
      setPrediction(randomPrediction);
      setIsRevealing(false);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setName('');
    setBirthDate('');
    setQuestion('');
    setPrediction(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
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
              {/* Category Selection */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-purple-200 mb-4">
                  <Star className="inline w-5 h-5 mr-2" />
                  Choisissez votre domaine de prédiction
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${selectedCategory === cat.id
                          ? 'border-purple-400 bg-purple-500/20'
                          : 'border-purple-500/30 bg-slate-700/30 hover:border-purple-400/60'
                        }`}
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                        <cat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-bold text-white">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-purple-200 font-bold mb-2">
                    Votre prénom *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez votre prénom"
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 font-bold mb-2">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 focus:border-purple-400 text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-purple-200 font-bold mb-2">
                    Votre question (optionnel)
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Posez votre question aux astres..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border-2 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50 resize-none transition-all"
                  />
                </div>
              </div>

              {/* Reveal Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReveal}
                disabled={!selectedCategory || !name || isRevealing}
                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-black text-lg rounded-2xl shadow-xl disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {isRevealing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Consultation des astres...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Révéler ma destinée
                    <Sparkles className="w-6 h-6" />
                  </>
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
              {/* Success Banner */}
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

              {/* Prediction Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-10 border-2 border-purple-400/50 shadow-2xl relative overflow-hidden"
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Moon className="w-8 h-8 text-purple-400" />
                    <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Votre Prédiction Cosmique
                    </h3>
                  </div>

                  <p className="text-xl leading-relaxed text-purple-100 font-medium mb-6">
                    {prediction}
                  </p>

                  <div className="flex items-center gap-2 text-purple-300 text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Guidance cosmique pour {categories.find(c => c.id === selectedCategory)?.label}</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
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
