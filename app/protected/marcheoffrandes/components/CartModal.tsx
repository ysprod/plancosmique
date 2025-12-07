import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, CreditCard, ChevronRight } from 'lucide-react';
import { CartItem } from './types';
import { slideFromBottom } from './animations';

interface CartModalProps {
    showCart: boolean;
    cart: CartItem[];
    cartTotal: number;
    cartCount: number;
    onClose: () => void;
    onProceedToCheckout: () => void;
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemoveFromCart: (id: string) => void;
    onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
    showCart,
    cart,
    cartTotal,
    cartCount,
    onClose,
    onProceedToCheckout,
    onUpdateQuantity,
    onRemoveFromCart,
    onClearCart
}) => {
    return (
        <AnimatePresence>
            {showCart && (
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
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
                                    <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
                                    Mon Panier
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 flex items-center justify-center transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            {cart.length > 0 && (
                                <p className="text-sm text-gray-600">
                                    {cartCount} article{cartCount > 1 ? 's' : ''} · {cartTotal.toLocaleString()} F
                                </p>
                            )}
                        </div>

                        {/* Contenu */}
                        <div className="p-4 sm:p-6">
                            {cart.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                        <ShoppingCart className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-lg font-medium mb-6">Votre panier est vide</p>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 active:scale-95 transition-all"
                                    >
                                        Continuer mes achats
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Articles */}
                                    <div className="space-y-3 mb-6">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
                                                <div className="text-3xl sm:text-4xl flex-shrink-0">{item.icon}</div>
                                                <div className="flex-grow min-w-0">
                                                    <h3 className="font-bold text-black text-sm sm:text-base truncate">{item.name}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-600">
                                                        {item.price.toLocaleString()} F × {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-gray-200 hover:border-amber-500 active:scale-90 flex items-center justify-center transition-all"
                                                    >
                                                        <Plus className="w-4 h-4 rotate-45" />
                                                    </button>
                                                    <span className="font-bold text-base sm:text-lg w-6 sm:w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-gray-200 hover:border-amber-500 active:scale-90 flex items-center justify-center transition-all"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => onRemoveFromCart(item.id)}
                                                    className="text-red-500 hover:text-red-700 active:scale-90 transition-all p-2"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className="border-t-2 border-gray-200 pt-4 mb-4">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-xl sm:text-2xl font-black text-black">Total</span>
                                            <div className="text-right">
                                                <p className="text-2xl sm:text-3xl font-black text-black">
                                                    {cartTotal.toLocaleString()} F
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    ≈ ${(cartTotal / 563.5).toFixed(2)} USD
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="space-y-2">
                                            <button
                                                onClick={onProceedToCheckout}
                                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3"
                                            >
                                                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                                                Procéder au paiement
                                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </button>

                                            <button
                                                onClick={onClearCart}
                                                className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl active:scale-95 transition-all"
                                            >
                                                Vider le panier
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
