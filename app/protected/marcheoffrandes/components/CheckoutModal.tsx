'use client';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CreditCard, Package, X } from 'lucide-react';
import React from 'react';
import { slideFromBottom } from './animations';
import { CartItem } from './types';

interface CheckoutModalProps {
    showCheckout: boolean;
    cart: CartItem[];
    cartTotal: number;
    paymentLoading: boolean;
    paymentError: string | null;
    user: any;
    onClose: () => void;
    onBackToCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    showCheckout, cart, cartTotal, paymentLoading, user, onClose, onBackToCart
}) => {

    const handlePayment = async () => {
        try {
            const customerName = user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.email || 'Client MonÉtoile';

            const article = cart.map(item => ({
                [item.name]: item.price * item.quantity
            }));

            const articleObject = Object.assign({}, ...article);

            const personal_Info = [{
                userId: user?._id || 'guest',
                userEmail: user?.email || 'non-renseigné',
                type: 'OFFRANDES',
                orderDate: new Date().toISOString(),
                cart: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalPrice: item.price * item.quantity
                }))
            }];

            const paymentData = {
                totalPrice: cartTotal,
                article: [articleObject],
                personal_Info,
                numeroSend: "0758385387",
                nomclient: customerName,
                return_url: `${window.location.origin}/wallet`,
                webhook_url: `${window.location.origin}/api/webhooks/moneyfusion`,
            };

            console.log('[MoneyFusion] 📦 Envoi de la requête...');

            const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
            const response = await axios.post(apiUrl, paymentData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log('[MoneyFusion] ✅ Réponse reçue:', response.data);

            if (response.data?.statut && response.data?.url) {
                console.log('[MoneyFusion] ✅ URL de paiement reçue');

                localStorage.setItem('offrandes_cart', JSON.stringify(cart));
                localStorage.setItem('offrandes_total', cartTotal.toString());

                onClose();

                console.log('[MoneyFusion] 🔄 Redirection vers MoneyFusion...');
                window.location.href = response.data.url;

            } else {
                throw new Error(response.data?.message || 'URL de paiement non reçue');
            }

        } catch (err: any) {
            let errorMessage = 'Erreur lors du paiement';
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data?.error) {
                errorMessage = err.response.data.error;
            } else if (err.message) {
                errorMessage = err.message;
            }
        }
    };

    return (
        <AnimatePresence>
            {showCheckout && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal ultra-compact */}
                    <motion.div
                        variants={slideFromBottom}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 
                                 rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto shadow-2xl"
                    >
                        {/* Header minimaliste */}
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

                        {/* Contenu compact */}
                        <div className="px-4 py-5 sm:px-6 sm:py-6 space-y-4">

                            {/* Résumé commande compact */}
                            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 
                                          dark:from-amber-950/30 dark:to-orange-950/30 
                                          rounded-2xl border border-amber-200 dark:border-amber-800">
                                <h3 className="font-bold text-black dark:text-white mb-3 
                                             flex items-center gap-2 text-sm">
                                    <Package className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                                    Votre commande
                                </h3>

                                {/* Articles compacts */}
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

                                {/* Total proéminent */}
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


                            {/* Boutons action compacts */}
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
                                    {/* Effet brillance */}
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
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};