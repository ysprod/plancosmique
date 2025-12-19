'use client';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, CreditCard, Package, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { slideFromBottom } from './animations';
import { CartItem } from './types';

interface CheckoutModalProps {
    showCheckout: boolean;
    cart: CartItem[];
    cartTotal: number;
    user: any;
    onClose: () => void;
    onBackToCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    showCheckout,
    cart,
    cartTotal,
    user,
    onClose,
    onBackToCart
}) => {
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    /**
     * ✅ Fonction de paiement optimisée selon la documentation MoneyFusion
     * @see https://docs.moneyfusion.net/fr/webapi
     */
    const handlePayment = async () => {
        console.log('[MoneyFusion] 🚀 Démarrage du paiement...');
        
        setPaymentLoading(true);
        setPaymentError(null);

        try {
            // 1. Préparation du nom du client
            const customerName = user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.email || 'Client MonÉtoile';

            console.log('[MoneyFusion] 👤 Client:', customerName);

            // 2. Préparation des articles (format MoneyFusion: Array<Object>)
            // ✅ Chaque objet contient des paires clé-valeur {nom_article: prix}
            const article = cart.map(item => ({
                [item.name]: item.price * item.quantity
            }));

            // ❌ NE PAS fusionner en un seul objet (ancienne méthode)
            // ✅ GARDER un tableau d'objets séparés (meilleure traçabilité)

            console.log('[MoneyFusion] 📦 Articles:', article);

            // 3. Informations personnelles (format MoneyFusion: Array<Object>)
            // ✅ Permet de stocker des métadonnées pour le webhook
            const personal_Info = [{
                userId: user?._id || 'guest',
                userEmail: user?.email || 'non-renseigné',
                type: 'OFFRANDES',
                orderDate: new Date().toISOString(),
                itemCount: cart.length,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    icon: item.icon,
                    category: item.category,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalPrice: item.price * item.quantity
                }))
            }];

            console.log('[MoneyFusion] 📋 Métadonnées:', {
                userId: personal_Info[0].userId,
                type: personal_Info[0].type,
                itemCount: personal_Info[0].itemCount
            });

            // 4. Configuration du paiement (conforme à la doc MoneyFusion)
            const paymentData = {
                // ✅ Montant total (requis)
                totalPrice: cartTotal,
                
                // ✅ Liste des articles (requis)
                article: article,
                
                // ✅ Numéro de téléphone (requis)
                numeroSend: "0758385387",
                
                // ✅ Nom du client (requis)
                nomclient: customerName,
                
                // ✅ Métadonnées personnalisées (optionnel)
                personal_Info: personal_Info,
                
                // ✅ URL de retour après paiement (optionnel)
                return_url: `https://www.monetoile.org/wallet`,
                
                // ✅ URL du webhook pour notifications (optionnel)
                webhook_url: `https://www.monetoile.org/api/webhooks/moneyfusion`,
            };

            console.log('[MoneyFusion] 💳 Configuration:', {
                totalPrice: paymentData.totalPrice,
                numeroSend: paymentData.numeroSend,
                nomclient: paymentData.nomclient,
                articleCount: paymentData.article.length,
                return_url: paymentData.return_url,
                webhook_url: paymentData.webhook_url
            });

            // 5. Appel à l'API MoneyFusion
            const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
            
            console.log('[MoneyFusion] 📡 Envoi de la requête...');
            
            const response = await axios.post(apiUrl, paymentData, {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 30000 // Timeout de 30 secondes
            });

            console.log('[MoneyFusion] ✅ Réponse reçue:', response.data);

            // 6. Validation de la réponse
            /**
             * Format attendu:
             * {
             *   "statut": true,
             *   "token": "5d58823b084564",
             *   "message": "paiement en cours",
             *   "url": "https://www.pay.moneyfusion.net/pay/6596aded36bd58823b084564"
             * }
             */
            if (response.data?.statut === true && response.data?.url) {
                const paymentToken = response.data.token;
                const paymentUrl = response.data.url;
                
                console.log('[MoneyFusion] ✅ Paiement initié avec succès');
                console.log('[MoneyFusion] 🎫 Token:', paymentToken);
                console.log('[MoneyFusion] 🔗 URL:', paymentUrl);

                // 7. Sauvegarde des données pour le callback
                localStorage.setItem('offrandes_cart', JSON.stringify(cart));
                localStorage.setItem('offrandes_total', cartTotal.toString());
                localStorage.setItem('offrandes_token', paymentToken);
                localStorage.setItem('offrandes_timestamp', new Date().toISOString());

                console.log('[MoneyFusion] 💾 Données sauvegardées dans localStorage');

                // 8. Fermeture du modal
                onClose();

                // 9. Redirection vers MoneyFusion
                console.log('[MoneyFusion] 🔄 Redirection vers la page de paiement...');
                
                // ✅ Redirection immédiate (pas de setTimeout)
                window.location.href = paymentUrl;

            } else {
                // ❌ Réponse invalide
                const errorMsg = response.data?.message || 'URL de paiement non reçue';
                console.error('[MoneyFusion] ❌ Réponse invalide:', response.data);
                throw new Error(errorMsg);
            }

        } catch (err: any) {
            // 10. Gestion des erreurs
            console.error('[MoneyFusion] 💥 Erreur lors du paiement:', err);

            let errorMessage = 'Erreur lors du paiement';

            if (err.response) {
                // Erreur de réponse du serveur
                console.error('[MoneyFusion] 📛 Réponse erreur:', err.response.data);
                console.error('[MoneyFusion] 📛 Status:', err.response.status);
                
                errorMessage = err.response.data?.message 
                    || err.response.data?.error 
                    || `Erreur serveur (${err.response.status})`;
                
            } else if (err.request) {
                // Aucune réponse reçue
                console.error('[MoneyFusion] 📛 Aucune réponse:', err.request);
                errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
                
            } else if (err.code === 'ECONNABORTED') {
                // Timeout
                console.error('[MoneyFusion] ⏱️ Timeout');
                errorMessage = 'La requête a pris trop de temps. Réessayez.';
                
            } else {
                // Autre erreur
                errorMessage = err.message || 'Erreur inconnue';
            }

            setPaymentError(errorMessage);
            setPaymentLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {showCheckout && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        variants={slideFromBottom}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 
                                 rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto shadow-2xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 
                                      px-4 py-3 sm:px-6 sm:py-4 
                                      border-b border-gray-200 dark:border-slate-700 
                                      rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-black text-black dark:text-white 
                                             flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-500" />
                                    Confirmation
                                </h2>
                                <button
                                    onClick={onClose}
                                    disabled={paymentLoading}
                                    className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 
                                             hover:bg-gray-200 dark:hover:bg-slate-700 
                                             active:scale-90 flex items-center justify-center 
                                             transition-all disabled:opacity-50"
                                >
                                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="px-4 py-5 sm:px-6 sm:py-6 space-y-4">

                            {/* Résumé commande */}
                            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 
                                          dark:from-amber-950/30 dark:to-orange-950/30 
                                          rounded-2xl border border-amber-200 dark:border-amber-800">
                                <h3 className="font-bold text-black dark:text-white mb-3 
                                             flex items-center gap-2 text-sm">
                                    <Package className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                                    Votre commande
                                </h3>

                                {/* Articles */}
                                <div className="space-y-2 mb-3">
                                    {cart.slice(0, 3).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm">
                                            <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                                <span className="text-base">{item.icon}</span>
                                                <span className="truncate max-w-[120px] sm:max-w-none">
                                                    {item.name} × {item.quantity}
                                                </span>
                                            </span>
                                            <span className="font-bold text-black dark:text-white whitespace-nowrap ml-2 text-xs sm:text-sm">
                                                {(item.price * item.quantity).toLocaleString()} F
                                            </span>
                                        </div>
                                    ))}
                                    {cart.length > 3 && (
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic">
                                            + {cart.length - 3} autre{cart.length - 3 > 1 ? 's' : ''} article{cart.length - 3 > 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="border-t border-amber-300 dark:border-amber-700 pt-3 
                                              flex items-center justify-between">
                                    <span className="font-bold text-black dark:text-white text-sm sm:text-base">
                                        Total
                                    </span>
                                    <div className="text-right">
                                        <p className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-500">
                                            {cartTotal.toLocaleString()} F
                                        </p>
                                        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                                            ≈ ${(cartTotal / 563.5).toFixed(2)} USD
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Message d'erreur */}
                            {paymentError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-50 dark:bg-red-950/30 
                                             border border-red-200 dark:border-red-800 
                                             rounded-xl flex items-start gap-2"
                                >
                                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs sm:text-sm font-semibold text-red-800 dark:text-red-400 mb-1">
                                            Erreur de paiement
                                        </p>
                                        <p className="text-xs text-red-700 dark:text-red-300">
                                            {paymentError}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Info paiement */}
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 
                                          border border-blue-200 dark:border-blue-800 
                                          rounded-xl">
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300">
                                        Vous allez être redirigé vers <strong>MoneyFusion</strong> pour finaliser 
                                        votre paiement en toute sécurité.
                                    </p>
                                </div>
                            </div>

                            {/* Boutons */}
                            <div className="space-y-2.5 pt-2">
                                <button
                                    onClick={handlePayment}
                                    disabled={paymentLoading}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 
                                             dark:from-amber-600 dark:to-orange-700
                                             text-white py-3.5 rounded-xl font-bold text-sm sm:text-base
                                             shadow-lg hover:shadow-xl active:scale-98 transition-all 
                                             disabled:opacity-50 disabled:cursor-not-allowed 
                                             flex items-center justify-center gap-2
                                             relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                                                  via-white/20 to-transparent translate-x-[-200%] 
                                                  group-hover:translate-x-[200%] transition-transform duration-700" />
                                    
                                    {paymentLoading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            <span>Redirection...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>Payer maintenant</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={onBackToCart}
                                    disabled={paymentLoading}
                                    className="w-full py-2.5 text-gray-600 dark:text-gray-400 
                                             font-semibold text-sm
                                             hover:text-gray-900 dark:hover:text-gray-200 
                                             active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Modifier le panier
                                </button>
                            </div>

                            {/* Badge sécurité */}
                            <div className="flex items-center justify-center gap-2 pt-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    Paiement 100% sécurisé par MoneyFusion
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};