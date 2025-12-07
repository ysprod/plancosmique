import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, X, CheckCircle2, Package, AlertCircle, ChevronRight } from 'lucide-react';
import { CartItem } from './types';
import { slideFromBottom } from './animations';

interface CheckoutModalProps {
    showCheckout: boolean;
    cart: CartItem[];
    cartTotal: number;
    phoneNumber: string;
    phoneError: string;
    paymentLoading: boolean;
    paymentError: string | null;
    onClose: () => void;
    onPhoneChange: (phone: string) => void;
    onPhoneBlur: () => void;
    onPayment: () => void;
    onBackToCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    showCheckout,
    cart,
    cartTotal,
    phoneNumber,
    phoneError,
    paymentLoading,
    paymentError,
    onClose,
    onPhoneChange,
    onPhoneBlur,
    onPayment,
    onBackToCart
}) => {
    return (
        <AnimatePresence>
            {showCheckout && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        variants={slideFromBottom}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-200 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
                                    <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
                                    Paiement
                                </h2>
                                <button
                                    onClick={onClose}
                                    disabled={paymentLoading}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 flex items-center justify-center transition-all disabled:opacity-50"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-4 sm:p-6">
                            {/* Étapes */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-green-600">Panier validé</span>
                                </div>
                                <div className="flex-1 h-0.5 bg-gray-300 mx-2" />
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        2
                                    </div>
                                    <span className="text-sm font-bold text-amber-600">Paiement</span>
                                </div>
                            </div>

                            {/* Résumé commande */}
                            <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
                                <h3 className="font-black text-black mb-3 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-amber-600" />
                                    Résumé de votre commande
                                </h3>

                                {/* Articles (version compacte) */}
                                <div className="space-y-2 mb-3">
                                    {cart.slice(0, 3).map((item) => (
                                        <div key={item.id} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700 flex items-center gap-2">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="truncate max-w-[150px] sm:max-w-none">
                                                    {item.name} × {item.quantity}
                                                </span>
                                            </span>
                                            <span className="font-bold text-black whitespace-nowrap ml-2">
                                                {(item.price * item.quantity).toLocaleString()} F
                                            </span>
                                        </div>
                                    ))}
                                    {cart.length > 3 && (
                                        <p className="text-xs text-gray-500 italic">
                                            + {cart.length - 3} autre{cart.length - 3 > 1 ? 's' : ''} article{cart.length - 3 > 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>

                                {/* Total */}
                                <div className="border-t-2 border-amber-300 pt-3 flex items-center justify-between">
                                    <span className="font-black text-black text-base sm:text-lg">Total à payer</span>
                                    <div className="text-right">
                                        <p className="text-xl sm:text-2xl font-black text-amber-600">
                                            {cartTotal.toLocaleString()} F
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            ≈ ${(cartTotal / 563.5).toFixed(2)} USD
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Formulaire paiement */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Numéro de téléphone Mobile Money
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^0-9+\s]/g, '');
                                            onPhoneChange(value);
                                        }}
                                        onBlur={onPhoneBlur}
                                        disabled={paymentLoading}
                                        placeholder="Ex: 0758385387"
                                        className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-base ${phoneError
                                            ? 'border-red-300 focus:border-red-500 bg-red-50'
                                            : 'border-gray-300 focus:border-amber-500'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    />
                                    {phoneError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2 mt-2 text-red-600"
                                        >
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm">{phoneError}</span>
                                        </motion.div>
                                    )}
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <span className="text-xs text-gray-500">Opérateurs acceptés:</span>
                                    <div className="flex items-center gap-1.5">
                                        {['MTN', 'Moov', 'Orange', 'Wave'].map(op => (
                                            <span
                                                key={op}
                                                className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 font-semibold"
                                            >
                                                {op}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Message d'erreur paiement */}
                            {paymentError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-red-800 mb-1">Erreur de paiement</p>
                                        <p className="text-xs sm:text-sm text-red-700">{paymentError}</p>
                                        <p className="text-xs text-red-600 mt-2 italic">
                                            Si le problème persiste, vérifiez votre numéro de téléphone et votre solde Mobile Money.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Info sécurité */}
                            <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                                        <strong>Paiement 100% sécurisé</strong> par MoneyFusion.
                                        Vous recevrez une notification Mobile Money pour confirmer le paiement.
                                    </p>
                                </div>
                            </div>

                            {/* Boutons action */}
                            <div className="space-y-3">
                                <button
                                    onClick={onPayment}
                                    disabled={paymentLoading || !phoneNumber || !!phoneError}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-3"
                                >
                                    {paymentLoading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            <span>Traitement en cours...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                            <span>Confirmer le paiement</span>
                                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={onBackToCart}
                                    disabled={paymentLoading}
                                    className="w-full py-3 text-gray-600 font-semibold hover:text-gray-900 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Retour au panier
                                </button>
                            </div>

                            {/* Note de bas */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <p className="text-xs text-center text-gray-500 leading-relaxed">
                                    En confirmant, vous acceptez nos conditions d'utilisation.
                                    Un reçu vous sera envoyé par SMS après validation.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
