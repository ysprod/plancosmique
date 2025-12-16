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
                    // message: result.message
                });
                
                // Afficher un message d'erreur à l'utilisateur
                alert(`Erreur de paiement: ${result.error  || 'Erreur inconnue'}`);
            }
        } catch (error) {
            console.error('[MoneyFusion] 💥 Exception lors du handlePayment:', error);
            
            // Message d'erreur détaillé
            const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
            alert(`Une erreur est survenue lors de l'initiation du paiement: ${errorMessage}`);
        }
    }, [phoneNumber, validatePhone, cart, cartTotal, user, initiatePayment, closeCheckout]);

    return (
        <div className="relative min-h-screen bg-white dark:bg-slate-950 pb-20">
            {/* Header */}
            <Header cartCount={cartCount} cartTotal={cartTotal} />

            <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
                {/* Hero */}
                <Hero />

                {/* Filtres */}
                <CategoryFilters
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* Grille offrandes */}
                <motion.div
                    key={selectedCategory}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-8"
                >
                    {filteredOfferings.map((offering) => (
                        <OfferingCard
                            key={offering.id}
                            offering={offering}
                            onAddToCart={addToCart}
                        />
                    ))}
                </motion.div>

                                {/* Info box */}
                                <InfoBox />

                                {/* Bouton Aller à la page de paiement MoneyFusion */}
                                <div className="flex justify-center mt-8">
                                    <button
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white font-semibold shadow-lg hover:from-fuchsia-700 hover:to-violet-800 transition disabled:opacity-50"
                                        onClick={handlePayment}
                                        disabled={paymentLoading || cart.length === 0}
                                    >
                                        {paymentLoading ? 'Redirection en cours...' : 'Aller à la page de paiement MoneyFusion'}
                                    </button>
                                </div>
            </div>

            {/* Panier flottant */}
            {cartCount > 0 && <FloatingCart count={cartCount} onClick={openCart} />}

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
                phoneNumber={phoneNumber}
                phoneError={phoneError}
                paymentLoading={paymentLoading}
                paymentError={paymentError}
                onClose={closeCheckout}
                onPhoneChange={handlePhoneChange}
                onPhoneBlur={handlePhoneBlur}
                onPayment={handlePayment}
                onBackToCart={backToCart}
            />
            <br />   <br />   <br />   <br />   <br />   <br />   <br />   <br />
        </div>
    );
}
