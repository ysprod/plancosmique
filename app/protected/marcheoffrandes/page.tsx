'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useMoneyFusion } from '@/lib/hooks/useMoneyFusion';
import { useAuth } from '@/lib/auth/AuthContext';
import {
    type Offering,
    type CartItem,
    type Category,
    offerings,
    staggerContainer,
    OfferingCard,
    FloatingCart,
    CategoryFilters,
    Hero,
    InfoBox,
    CartModal,
    CheckoutModal,
    Header
} from './components';

// ==================== HOOKS PERSONNALISÉS ====================

/**
 * Hook pour gérer le panier d'offrandes
 */
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

/**
 * Hook pour gérer la validation du téléphone
 */
function usePhoneValidation() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const validatePhone = useCallback((phone: string): boolean => {
        const cleaned = phone.replace(/\s/g, '');

        if (cleaned.length < 8) {
            setPhoneError('Numéro trop court (min. 8 chiffres)');
            return false;
        }
        if (cleaned.length > 15) {
            setPhoneError('Numéro trop long (max. 15 chiffres)');
            return false;
        }
        if (!/^\+?[0-9]+$/.test(cleaned)) {
            setPhoneError('Format invalide (chiffres uniquement)');
            return false;
        }

        setPhoneError('');
        return true;
    }, []);

    const handlePhoneChange = useCallback((value: string) => {
        setPhoneNumber(value);
        if (phoneError) validatePhone(value);
    }, [phoneError, validatePhone]);

    const handlePhoneBlur = useCallback(() => {
        validatePhone(phoneNumber);
    }, [phoneNumber, validatePhone]);

    return {
        phoneNumber,
        phoneError,
        validatePhone,
        handlePhoneChange,
        handlePhoneBlur,
        setPhoneError
    };
}

/**
 * Hook pour gérer l'état des modals
 */
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

// ==================== COMPOSANT PRINCIPAL ====================

export default function MarcheOffrandes() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');

    const { user } = useAuth();
    const { initiatePayment, loading: paymentLoading, error: paymentError } = useMoneyFusion();

    // Hooks personnalisés
    const {
        cart,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    } = useCart();

    const {
        phoneNumber,
        phoneError,
        validatePhone,
        handlePhoneChange,
        handlePhoneBlur
    } = usePhoneValidation();

    const {
        showCart,
        showCheckout,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        backToCart
    } = useModals();

    // Offrandes filtrées
    const filteredOfferings = useMemo(() =>
        selectedCategory === 'all'
            ? offerings
            : offerings.filter(o => o.category === selectedCategory),
        [selectedCategory]
    );

    // Gestion du paiement
    const handleProceedToCheckout = useCallback(() => {
        if (cart.length === 0) return;
        openCheckout();
    }, [cart.length, openCheckout]);

    const handlePayment = useCallback(async () => {
        // Validation du numéro de téléphone
        if (!validatePhone(phoneNumber)) {
            console.log('[MoneyFusion] ❌ Validation du numéro échouée');
            return;
        }

        console.log('[MoneyFusion] ✅ Numéro validé, préparation du paiement...');

        // Préparation du nom du client
        const customerName = user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.email || 'Client MonÉtoile';

        // Préparation des items pour MoneyFusion
        const items = cart.map(item => ({
            [item.name]: item.price * item.quantity
        }));

        // Configuration du paiement
        const paymentConfig = {
            amount: cartTotal,
            items,
            phoneNumber: phoneNumber.replace(/\s/g, ''),
            customerName,
            metadata: {
                userId: user?._id || 'guest',
                userEmail: user?.email || 'non-renseigné',
                type: 'OFFRANDES',
                orderDate: new Date().toISOString(),
                cart: JSON.stringify(cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalPrice: item.price * item.quantity
                })))
            }
        };

        console.log('[MoneyFusion] 📦 Configuration du paiement:', {
            amount: paymentConfig.amount,
            phoneNumber: paymentConfig.phoneNumber,
            customerName: paymentConfig.customerName,
            itemsCount: items.length
        });

        try {
            console.log('[MoneyFusion] 🚀 Initiation du paiement...');

            const result = await initiatePayment(paymentConfig);

            console.log('[MoneyFusion] 📥 Résultat de l\'initiation:', result);

            // Vérification du succès et de l'URL de paiement
            if (result.success && result.paymentUrl) {
                console.log('[MoneyFusion] ✅ URL de paiement reçue:', result.paymentUrl);
                console.log('[MoneyFusion] 🔄 Redirection vers la page de paiement...');

                // Fermer le modal avant la redirection
                closeCheckout();

                // Redirection immédiate vers la page de paiement MoneyFusion
                window.location.href = result.paymentUrl;

            } else {
                console.error('[MoneyFusion] ❌ Échec de l\'initiation du paiement:', {
                    success: result.success,
                    error: result.error,
                });

                // Afficher un message d'erreur à l'utilisateur
                alert(`Erreur de paiement: ${result.error || 'Erreur inconnue'}`);
            }
        } catch (error) {
            console.error('[MoneyFusion] 💥 Exception lors du handlePayment:', error);

            // Message d'erreur détaillé
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            alert(`Une erreur est survenue lors de l'initiation du paiement: ${errorMessage}`);
        }
    }, [phoneNumber, validatePhone, cart, cartTotal, user, initiatePayment, closeCheckout]);

    return (
        <div className="relative min-h-screen     ">
            {/* Header minimaliste */}
            <Header cartCount={cartCount} cartTotal={cartTotal} />

            {/* Conteneur principal ultra-compact */}
            <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
                
                {/* Hero compact */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 sm:mb-8"
                >
                    <Hero />
                </motion.div>

                {/* Filtres modernes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 sm:mb-6"
                >
                    <CategoryFilters
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </motion.div>

                {/* Grille offrandes optimisée */}
                <motion.div
                    key={selectedCategory}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
                >
                    {filteredOfferings.map((offering, index) => (
                        <motion.div
                            key={offering.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <OfferingCard
                                offering={offering}
                                onAddToCart={addToCart}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Info box élégante */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <InfoBox />
                </motion.div>
            </div>

            {/* Panier flottant moderne */}
            {cartCount > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <FloatingCart count={cartCount} onClick={openCart} />
                </motion.div>
            )}

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
                paymentLoading={paymentLoading}
                paymentError={paymentError}
                onClose={closeCheckout}
                onBackToCart={backToCart}
                user={user}
            />
 
            {/* Espacement bottom pour mobile - réduit */}
            <div className="h-20 sm:h-24" />
        </div>
    );
}