'use client';
import { useAuth } from '@/lib/auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    type CartItem, CartModal,
    type Category, CategoryFilters, CheckoutModal, FloatingCart, Header, Hero, InfoBox,
    type Offering, OfferingCard, staggerContainer
} from './components';
import { api } from '@/lib/api/client';

function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const cartTotal = useMemo(() =>
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        [cart]
    );

    const cartCount = useMemo(() =>
        cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    const addToCart = useCallback((offering: Offering) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === offering.id);
            if (existing) {
                return prev.map(item =>
                    item.id === offering.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...offering, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCart(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(0, item.quantity + delta);
                    return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean) as CartItem[]
        );
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    return {
        cart,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCart
    };
}

function useModals() {
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);

    const openCart = useCallback(() => setShowCart(true), []);
    const closeCart = useCallback(() => setShowCart(false), []);

    const openCheckout = useCallback(() => {
        setShowCart(false);
        setShowCheckout(true);
    }, []);

    const closeCheckout = useCallback(() => setShowCheckout(false), []);

    const backToCart = useCallback(() => {
        setShowCheckout(false);
        setShowCart(true);
    }, []);

    return {
        showCart,
        showCheckout,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        backToCart
    };
}


export default function MarcheOffrandes() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const { user } = useAuth();
    const { cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
    const { showCart, showCheckout, openCart, closeCart, openCheckout, closeCheckout, backToCart } = useModals();

    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOfferings = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get('/offerings');
                if (response.status === 200 && response.data?.offerings) {
                    setOfferings(response.data.offerings);
                } else {
                    setError('Erreur lors du chargement des offrandes');
                }
            } catch (err: any) {
                setError('Erreur lors du chargement des offrandes');
            } finally {
                setLoading(false);
            }
        };
        fetchOfferings();
    }, []);

    const filteredOfferings = useMemo(() =>
        selectedCategory === 'all'
            ? offerings
            : offerings.filter(o => o.category === selectedCategory),
        [selectedCategory, offerings]
    );

    const handleProceedToCheckout = useCallback(() => {
        if (cart.length === 0) return;
        openCheckout();
    }, [cart.length, openCheckout]);

    return (
        <div className="relative min-h-screen bg-white">
            {/* Header avec ombre subtile */}
            <div className="sticky top-0 z-40 bg-white/95  backdrop-blur-md border-b border-gray-100 shadow-sm">
                <Header cartCount={cartCount} cartTotal={cartTotal} />
            </div>

            {/* Container principal ultra-compact */}
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 max-w-7xl">

                {/* Hero section élégante */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mb-4 sm:mb-6"
                >
                    <Hero />
                </motion.div>

                {/* Filtres modernes avec scroll horizontal sur mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                    className="mb-4 sm:mb-5"
                >
                    <div className="relative">
                        {/* Gradient fade sur les bords (mobile) */}
                        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none sm:hidden" />
                        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none sm:hidden" />

                        <CategoryFilters
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            offerings={offerings}
                        />
                    </div>
                </motion.div>

                {/* Compteur d'articles */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedCategory}-${filteredOfferings.length}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="mb-3 sm:mb-4"
                    >
                        <div className="flex items-center justify-between px-1">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                {filteredOfferings.length} offrande{filteredOfferings.length > 1 ? 's' : ''} disponible{filteredOfferings.length > 1 ? 's' : ''}
                            </p>
                            {selectedCategory !== 'all' && (
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className="text-xs text-amber-600 dark:text-amber-500 hover:text-amber-700 
                                             dark:hover:text-amber-400 font-semibold transition-colors
                                             hover:underline underline-offset-2"
                                >
                                    Voir tout
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Grille offrandes avec animations séquentielles ou loader/erreur */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                        <span className="text-3xl animate-spin mb-4">🌀</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Chargement des offrandes...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20">
                        <span className="text-3xl mb-4">❌</span>
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                ) : (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory}
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                                         gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 mb-6 sm:mb-8"
                            >
                                {filteredOfferings.map((offering, index) => (
                                    <motion.div
                                        key={offering.id}
                                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.92, y: -20 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.03,
                                            ease: "easeOut"
                                        }}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="h-full"
                                    >
                                        <OfferingCard
                                            offering={offering}
                                            onAddToCart={addToCart}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Message si aucune offrande */}
                        {filteredOfferings.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-16 sm:py-20"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-slate-800 
                                              rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl sm:text-4xl">🔍</span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    Aucune offrande trouvée
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm mb-4">
                                    Essayez une autre catégorie ou consultez toutes les offrandes disponibles
                                </p>
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 
                                             dark:hover:bg-amber-700 text-white text-sm font-semibold 
                                             rounded-lg transition-colors"
                                >
                                    Voir toutes les offrandes
                                </button>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Info box élégante */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                    <InfoBox />
                </motion.div>
            </div>

            {/* Panier flottant avec badge animé */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                        }}
                    >
                        <FloatingCart count={cartCount} onClick={openCart} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <CartModal
                showCart={showCart}
                cart={cart}
                cartTotal={cartTotal}
                cartCount={cartCount}
                onClose={closeCart}
                onProceedToCheckout={handleProceedToCheckout}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
            />

            <CheckoutModal
                showCheckout={showCheckout}
                cart={cart}
                cartTotal={cartTotal}
                onClose={closeCheckout}
                onBackToCart={backToCart}
                user={user}
            />

            {/* Espacement bottom optimisé */}
            <div className="h-16 sm:h-20" />
        </div>
    );
}