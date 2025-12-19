'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CONSULTATION_OFFERINGS } from './offrandes.constants';
import { CONSULTATION_TYPE_MAP } from './consultation.constants';

interface OfferingPageProps {
  consultationType: string;
  onConfirm: () => void;
  loading: boolean;
  onBack: () => void;
}

export default function OfferingPage({
  consultationType,
  onConfirm,
  loading,
  onBack,
}: OfferingPageProps) {
  const router = useRouter();
  
  const offeringType = CONSULTATION_TYPE_MAP[consultationType];
  const offering = CONSULTATION_OFFERINGS[offeringType];

  if (!offering) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 max-w-md">
          <p className="text-red-600 dark:text-red-400 font-semibold text-center">
            Type de consultation non trouvé
          </p>
        </div>
      </div>
    );
  }

  const handleGoToMarket = () => {
    localStorage.setItem('pending_consultation', JSON.stringify({
      consultationType,
      offeringType,
      timestamp: new Date().toISOString()
    }));
    router.push('/secured/marcheoffrandes');
  };

  return (
    <div className="min-h-screen    p-4 sm:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        {/* Card principale */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-amber-200/50 dark:border-amber-800/50">
          
          {/* Header compact avec gradient */}
          <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 px-6 py-8 text-center overflow-hidden">
            {/* Effet de particules */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-3">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight">
              Offrande Spirituelle
            </h1>
            <p className="text-amber-50 text-sm font-medium">
              Honorez votre consultation
            </p>
          </div>

          {/* Contenu ultra-compact */}
          <div className="p-6 space-y-4">
            
            {/* Card marché avec design moderne */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-5 border border-indigo-200/50 dark:border-indigo-800/50 overflow-hidden"
            >
              {/* Icon badge */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                      Marché des Offrandes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                      Choisissez parmi nos offrandes spirituelles sacrées
                    </p>
                  </div>
                </div>

                {/* Badges catégories compacts */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {[
                    { icon: '🐓', label: 'Animaux' },
                    { icon: '🌾', label: 'Végétaux' },
                    { icon: '🍷', label: 'Boissons' }
                  ].map((cat, i) => (
                    <motion.span
                      key={cat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-[10px] font-semibold text-gray-700 dark:text-gray-300 border border-indigo-200/50 dark:border-indigo-700/50"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </motion.span>
                  ))}
                </div>

                {/* Badge sécurité */}
                
              </div>
            </motion.div>

            {/* Boutons compacts et modernes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              {/* Bouton retour minimaliste */}
              <button
                onClick={onBack}
                disabled={loading}
                className="flex-shrink-0 w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                         text-gray-600 dark:text-gray-400 
                         hover:bg-gray-50 dark:hover:bg-gray-800 
                         hover:border-gray-300 dark:hover:border-gray-600
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200
                         active:scale-95
                         flex items-center justify-center"
                aria-label="Retour"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Bouton CTA principal */}
              <button
                onClick={handleGoToMarket}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 
                         hover:from-amber-600 hover:via-orange-600 hover:to-rose-600
                         dark:from-amber-600 dark:via-orange-600 dark:to-rose-600
                         dark:hover:from-amber-700 dark:hover:via-orange-700 dark:hover:to-rose-700
                         text-white font-bold h-12 px-5 rounded-xl 
                         flex items-center justify-center gap-2 
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl 
                         active:scale-95
                         transform hover:-translate-y-0.5
                         relative overflow-hidden group"
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span className="text-sm">Chargement...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-sm font-bold">Voir le Marché</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>

            {/* Note discrète et compacte */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-[10px] text-gray-500 dark:text-gray-500 leading-relaxed">
                💡 Accédez à notre sélection spirituelle en un clic
              </p>
            </motion.div>
          </div>
        </div>

        {/* Indicateur de sécurité en bas */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-800/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Connexion sécurisée
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
