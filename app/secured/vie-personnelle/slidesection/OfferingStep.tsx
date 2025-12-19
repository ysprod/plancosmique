/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  Package,
  AlertCircle,
  BadgeCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
 
import { offerings, type ConsultationChoice } from './consultation.constants';

interface OfferingStepProps {
  selected: ConsultationChoice;
  consultationId: string; // Nouveau prop
  paymentLoading: boolean;
  onBackToForm: () => void;
}

export default function OfferingStep({ 
  selected,
  consultationId,
  paymentLoading, 
  onBackToForm 
}: OfferingStepProps) {
  const router = useRouter();

  // Calcul optimisé du total et validation des offrandes
  const { offeringsDetails, totalPrice, hasErrors } = useMemo(() => {
    let total = 0;
    let errors = false;
    const details = selected.requiredOfferings.map((req) => {
      const offering = offerings.find((o) => o.id === req.offeringId);
      if (!offering) {
        errors = true;
        return null;
      }
      total += offering.price * req.quantity;
      return { ...offering, quantity: req.quantity };
    }).filter(Boolean);

    return { offeringsDetails: details, totalPrice: total, hasErrors: errors };
  }, [selected.requiredOfferings]);

  const handleGoToMarket = () => {
    if (hasErrors) {
      console.error('[Offering] Certaines offrandes requises sont introuvables');
      return;
    }

    const consultationType = selected.id;
    const offeringType = selected.id;

    // Sauvegarder toutes les informations nécessaires
    localStorage.setItem('pending_consultation', JSON.stringify({
      consultationId,
      consultationType,
      offeringType,
      requiredOfferings: selected.requiredOfferings,
      timestamp: new Date().toISOString()
    }));

    console.log('[Offering] 🛒 Navigation vers le marché avec:', {
      consultationId,
      consultationType,
      requiredOfferings: selected.requiredOfferings
    });

    router.push('/secured/marcheoffrandes');
  };

  // Gestion des erreurs
  if (hasErrors) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 
                   dark:from-red-950/20 dark:via-orange-950/20 dark:to-pink-950/20 
                   p-4 flex items-center justify-center"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md border-2 border-red-200 dark:border-red-800">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-red-600 dark:text-red-400 text-center mb-3">
            Erreur de configuration
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Certaines offrandes requises pour cette consultation sont introuvables. 
            Veuillez contacter l'administrateur.
          </p>
          <button
            onClick={onBackToForm}
            className="w-full py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                     rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
          >
            Retour au formulaire
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 
                    dark:from-gray-950 dark:via-amber-950/20 dark:to-orange-950/20 
                    p-4 sm:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        {/* Card principale */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl 
                      shadow-2xl overflow-hidden border-2 border-amber-200/50 dark:border-amber-800/50">
          
          {/* Header élégant avec gradient */}
          <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 
                        dark:from-amber-600 dark:via-orange-600 dark:to-rose-600 
                        px-6 py-10 text-center overflow-hidden">
            {/* Effet de particules animé */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl"
              />
            </div>
            
            
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
              Offrandes Spirituelles
            </h1>
            <p className="text-amber-50 text-base font-semibold">
              {selected.title}
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 h-1 w-24 bg-white/50 mx-auto rounded-full"
            />
          </div>

          {/* Contenu principal */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Message d'introduction */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 
                       rounded-2xl border-2 border-blue-200 dark:border-blue-800"
            >
              <BadgeCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">
                  Offrandes requises pour cette consultation
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Ces éléments spirituels sont nécessaires pour réaliser votre consultation. 
                  Vous pourrez les acquérir au marché.
                </p>
              </div>
            </motion.div>

            {/* Liste des offrandes requises */}
            <div className="space-y-3">
              <h3 className="font-black text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                Articles nécessaires
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {offeringsDetails.map((offering: any, index: number) => (
                  <motion.div
                    key={offering.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="relative bg-gradient-to-br from-white to-gray-50 
                             dark:from-gray-800 dark:to-gray-850
                             rounded-2xl p-4 border-2 border-gray-200 dark:border-gray-700
                             hover:border-amber-300 dark:hover:border-amber-600
                             hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Badge quantité */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 
                                  bg-gradient-to-br from-amber-500 to-orange-500 
                                  dark:from-amber-600 dark:to-orange-600
                                  rounded-full flex items-center justify-center 
                                  text-white font-black text-sm shadow-lg z-10">
                      ×{offering.quantity}
                    </div>

                    {/* Icône et contenu */}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 
                                    dark:from-amber-950/50 dark:to-orange-950/50 
                                    rounded-xl flex items-center justify-center text-3xl
                                    group-hover:scale-110 transition-transform duration-300">
                        {offering.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 truncate">
                          {offering.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {offering.description}
                        </p> 
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div> 
        

            {/* Boutons d'action */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-3"
            >
              {/* Bouton retour */}
              <button
                onClick={onBackToForm}
                disabled={paymentLoading}
                className="flex-shrink-0 w-14 h-14 rounded-xl border-2 
                         border-gray-300 dark:border-gray-700 
                         text-gray-600 dark:text-gray-400 
                         hover:bg-gray-50 dark:hover:bg-gray-800 
                         hover:border-gray-400 dark:hover:border-gray-600
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200
                         active:scale-95
                         flex items-center justify-center
                         shadow-md hover:shadow-lg"
                aria-label="Retour"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {/* Bouton CTA principal */}
              <button
                onClick={handleGoToMarket}
                disabled={paymentLoading}
                className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 
                         hover:from-amber-600 hover:via-orange-600 hover:to-rose-600
                         dark:from-amber-600 dark:via-orange-600 dark:to-rose-600
                         dark:hover:from-amber-700 dark:hover:via-orange-700 dark:hover:to-rose-700
                         text-white font-black h-14 px-6 rounded-xl 
                         flex items-center justify-center gap-3 
                         transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-xl hover:shadow-2xl 
                         active:scale-98
                         transform hover:-translate-y-1
                         relative overflow-hidden group"
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                              translate-x-[-200%] group-hover:translate-x-[200%] 
                              transition-transform duration-700" />
                
                <span className="relative flex items-center gap-3">
                  {paymentLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span className="text-base">Chargement...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span className="text-base">Accéder au Marché</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </motion.div>
 
          </div>
        </div>
 
      </motion.div>
    </div>
  );
}
