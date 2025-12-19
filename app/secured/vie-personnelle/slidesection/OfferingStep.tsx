/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { useAuth } from "@/lib/auth/AuthContext";
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  Package,
  ShoppingBag,
  Wallet,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { offerings, type ConsultationChoice } from './consultation.constants';

interface OfferingStepProps {
  selected: ConsultationChoice;
  consultationId: string;
  paymentLoading: boolean;
  onBackToForm: () => void;
}

interface WalletOffering {
  offeringId: string;
  quantity: number;
}

export default function OfferingStep({ 
  selected,
  consultationId,
  paymentLoading, 
  onBackToForm 
}: OfferingStepProps) {
  const router = useRouter();
    const { user } = useAuth();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletOfferings, setWalletOfferings] = useState<WalletOffering[]>([]);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [validatingOffering, setValidatingOffering] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

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

  // Vérifier si l'utilisateur possède les offrandes requises
  const checkWalletAvailability = useMemo(() => {
    if (walletOfferings.length === 0) return { hasAll: false, missing: [] };

    const missing: Array<{ id: string; name: string; needed: number; available: number }> = [];
    
    for (const required of selected.requiredOfferings) {
      const walletItem = walletOfferings.find(w => w.offeringId === required.offeringId);
      const available = walletItem?.quantity || 0;
      
      if (available < required.quantity) {
        const offering = offerings.find(o => o.id === required.offeringId);
        missing.push({
          id: required.offeringId,
          name: offering?.name || 'Inconnu',
          needed: required.quantity,
          available
        });
      }
    }

    return { hasAll: missing.length === 0, missing };
  }, [walletOfferings, selected.requiredOfferings]);

  // Charger le wallet au clic sur "Faire l'offrande"
  // Récupérer l'utilisateur courant (ex: depuis le localStorage ou un contexte)
 
  const handleOpenWalletModal = async () => {
    setShowWalletModal(true);
    setLoadingWallet(true);
    setWalletError(null);

    try {
      const response = await api.get(`/wallet/transactions?userId=${user!._id}`);
      if (response.status === 200 && Array.isArray(response.data?.transactions)) {
        // Agréger les quantités d'offrandes à partir des items de chaque transaction complétée
        const transactions = response.data.transactions.filter((t: any) => t.status === 'completed');
        const offeringMap = new Map();
        for (const tx of transactions) {
          if (Array.isArray(tx.items)) {
            for (const item of tx.items) {
              if (!item.id || typeof item.quantity !== 'number') continue;
              const prev = offeringMap.get(item.id) || 0;
              offeringMap.set(item.id, prev + item.quantity);
            }
          }
        }
        const offeringsArray = Array.from(offeringMap.entries()).map(([offeringId, quantity]) => ({ offeringId, quantity }));
        setWalletOfferings(offeringsArray);
        console.log('[Wallet] ✅ Offrandes chargées (via items transactions):', offeringsArray);
      } else {
        throw new Error('Impossible de charger le portefeuille');
      }
    } catch (err: any) {
      console.error('[Wallet] ❌ Erreur:', err);
      setWalletError(err.response?.data?.message || 'Erreur lors du chargement du portefeuille');
    } finally {
      setLoadingWallet(false);
    }
  };

  // Valider l'offrande avec le wallet
  const handleValidateWithWallet = async () => {
    if (!checkWalletAvailability.hasAll) {
      setWalletError('Vous ne possédez pas toutes les offrandes requises');
      return;
    }

    setValidatingOffering(true);
    setWalletError(null);

    try {
      console.log('[Wallet] 🔄 Consommation des offrandes...');

      // 1. Consommer les offrandes du wallet
      const consumeRes = await api.post('/wallet/consume-offerings', {
        consultationId,
        offerings: selected.requiredOfferings
      });

      if (consumeRes.status !== 200) {
        throw new Error(consumeRes.data?.message || 'Erreur lors de la consommation des offrandes');
      }

      console.log('[Wallet] ✅ Offrandes consommées');

      // 2. Mettre à jour le statut de la consultation
      const updateRes = await api.patch(`/consultations/${consultationId}`, {
        status: 'paid',
        paymentMethod: 'wallet_offerings'
      });

      if (updateRes.status !== 200) {
        throw new Error('Erreur lors de la mise à jour de la consultation');
      }

      console.log('[Consultation] ✅ Statut mis à jour : paid');

      // 3. Redirection vers la page de génération d'analyse
      setTimeout(() => {
        router.push(`/secured/genereanalyse?id=${consultationId}`);
      }, 1000);

    } catch (err: any) {
      console.error('[Wallet] ❌ Erreur:', err);
      setWalletError(err.response?.data?.message || err.message || 'Erreur lors de la validation');
      setValidatingOffering(false);
    }
  };

  const handleGoToMarket = () => {
    if (hasErrors) {
      console.error('[Offering] Certaines offrandes requises sont introuvables');
      return;
    }

    const consultationType = selected.id;
    const offeringType = selected.id;

    localStorage.setItem('pending_consultation', JSON.stringify({
      consultationId,
      consultationType,
      offeringType,
      requiredOfferings: selected.requiredOfferings,
      timestamp: new Date().toISOString()
    }));

    console.log('[Offering] 🛒 Navigation vers le marché');
    router.push('/protected/marcheoffrandes');
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
    <>
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
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 0.3, 0.6] }}
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
                    Vous pouvez utiliser votre portefeuille ou acquérir ces éléments au marché.
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
                      <div className="absolute -top-2 -right-2 w-8 h-8 
                                    bg-gradient-to-br from-amber-500 to-orange-500 
                                    dark:from-amber-600 dark:to-orange-600
                                    rounded-full flex items-center justify-center 
                                    text-white font-black text-sm shadow-lg z-10">
                        ×{offering.quantity}
                      </div>

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
                          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
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
                className="space-y-3"
              >
                {/* Bouton Faire l'offrande (prioritaire) */}
                <button
                  onClick={handleOpenWalletModal}
                  disabled={paymentLoading}
                  className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 
                           hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600
                           dark:from-violet-600 dark:via-purple-600 dark:to-fuchsia-600
                           dark:hover:from-violet-700 dark:hover:via-purple-700 dark:hover:to-fuchsia-700
                           text-white font-black h-14 px-6 rounded-xl 
                           flex items-center justify-center gap-3 
                           transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           shadow-xl hover:shadow-2xl 
                           active:scale-98
                           transform hover:-translate-y-1
                           relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                                translate-x-[-200%] group-hover:translate-x-[200%] 
                                transition-transform duration-700" />
                  
                  <span className="relative flex items-center gap-3">
                    <Wallet className="w-5 h-5" />
                    <span className="text-base">Faire l'offrande</span>
                    <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">OU</span>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Boutons retour + marché */}
                <div className="flex gap-3">
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
                  
                  <button
                    onClick={handleGoToMarket}
                    disabled={paymentLoading}
                    className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 
                             hover:from-amber-600 hover:via-orange-600 hover:to-rose-600
                             text-white font-bold h-14 px-6 rounded-xl 
                             flex items-center justify-center gap-3 
                             transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl 
                             active:scale-98
                             relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                  translate-x-[-200%] group-hover:translate-x-[200%] 
                                  transition-transform duration-700" />
                    
                    <span className="relative flex items-center gap-2 text-sm">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acheter au Marché</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Wallet - Positionné correctement */}
      <AnimatePresence>
        {showWalletModal && (
          <>
            {/* Overlay avec z-index élevé */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => !validatingOffering && setShowWalletModal(false)}
            />
            
            {/* Modal - Centré avec marges responsive */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl 
                         shadow-2xl overflow-hidden 
                         border-2 border-violet-200 dark:border-violet-800
                         max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header fixe */}
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 
                              dark:from-violet-600 dark:to-purple-600 
                              px-6 py-5 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl 
                                  flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white">
                        Faire l'offrande
                      </h2>
                      <p className="text-xs text-violet-100">
                        Depuis votre portefeuille
                      </p>
                    </div>
                  </div>
                  
                  {!validatingOffering && (
                    <button
                      onClick={() => setShowWalletModal(false)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 
                               flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>

                {/* Contenu scrollable */}
                <div className="p-6 overflow-y-auto flex-1">
                  {loadingWallet ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-12 h-12 text-violet-500 mx-auto mb-4 animate-spin" />
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Chargement de votre portefeuille...
                      </p>
                    </div>
                  ) : walletError ? (
                    <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 
                                  rounded-2xl p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-red-800 dark:text-red-400 mb-1">
                          Erreur
                        </p>
                        <p className="text-xs text-red-700 dark:text-red-300">
                          {walletError}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Statut de disponibilité */}
                      {checkWalletAvailability.hasAll ? (
                        <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 
                                      rounded-2xl p-4 flex items-start gap-3 mb-6">
                          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-green-900 dark:text-green-300 mb-1">
                              ✨ Toutes les offrandes sont disponibles !
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-400">
                              Vous pouvez valider votre consultation dès maintenant.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 
                                      rounded-2xl p-4 mb-6">
                          <p className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-3">
                            ⚠️ Offrandes manquantes
                          </p>
                          <div className="space-y-2">
                            {checkWalletAvailability.missing.map((item, idx) => (
                              <div key={idx} className="text-xs text-amber-700 dark:text-amber-400 flex items-center justify-between">
                                <span>{item.name}</span>
                                <span className="font-bold">
                                  {item.available}/{item.needed}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Liste des offrandes requises */}
                      <div className="space-y-2 mb-6">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                          Articles requis
                        </h3>
                        {offeringsDetails.map((offering: any, idx: number) => {
                          const walletItem = walletOfferings.find(w => w.offeringId === offering.id);
                          const available = walletItem?.quantity || 0;
                          const hasEnough = available >= offering.quantity;

                          return (
                            <div 
                              key={idx}
                              className={`flex items-center justify-between p-3 rounded-xl border-2 
                                        ${hasEnough 
                                          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                                        }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{offering.icon}</span>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                                    {offering.name}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Requis: {offering.quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                {hasEnough ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" />
                                ) : (
                                  <span className="text-xs font-bold text-red-600 dark:text-red-400">
                                    Manquant: {offering.quantity - available}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bouton de validation */}
                      <button
                        onClick={handleValidateWithWallet}
                        disabled={!checkWalletAvailability.hasAll || validatingOffering}
                        className="w-full bg-gradient-to-r from-violet-500 to-purple-500 
                                 hover:from-violet-600 hover:to-purple-600
                                 text-white font-black py-4 rounded-xl 
                                 flex items-center justify-center gap-3
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 shadow-xl hover:shadow-2xl transition-all
                                 active:scale-98"
                      >
                        {validatingOffering ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Validation en cours...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Valider l'offrande</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
