'use client';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { Offering } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { useCart } from '@/hooks/marcheoffrandes/useCart';
import { useModals } from '@/hooks/marcheoffrandes/useModals';
import { useOfferings } from '@/hooks/marcheoffrandes/useOfferings';
import LoadingState from '@/components/marcheoffrandes/LoadingState';
import ErrorState from '@/components/marcheoffrandes/ErrorState';
import EmptyState from '@/components/marcheoffrandes/EmptyState';
import OfferingsGrid from '@/components/marcheoffrandes/OfferingsGrid';
import { Category, CartModal, CategoryFilters, CheckoutModal, FloatingCart, Header, Hero, InfoBox } from './components';


// =====================================================
// COMPOSANT PRINCIPAL
// =====================================================

export default function MarcheOffrandes() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // Hooks personnalisés
  const { cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showCart, showCheckout, openCart, closeCart, openCheckout, closeCheckout, backToCart } = useModals();
  const { offerings, loading, error } = useOfferings();

  // Offrandes filtrées avec mémorisation
  const filteredOfferings = useMemo(
    () => selectedCategory === 'all'
      ? offerings
      : offerings.filter(o => o.category === selectedCategory),
    [selectedCategory, offerings]
  );

  // Handlers
  const handleProceedToCheckout = useCallback(() => {
    if (cart.length === 0) return;
    openCheckout();
  }, [cart.length, openCheckout, cart]);

  const handleResetCategory = useCallback(() => {
    setSelectedCategory('all');
  }, []);

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950">
      {/* Header sticky avec backdrop blur */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 
                    backdrop-blur-md border-b border-gray-100 dark:border-gray-800 
                    shadow-sm">
        <Header cartCount={cartCount} cartTotal={cartTotal} />
      </div>

      {/* Container principal */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 max-w-7xl">

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 sm:mb-6"
        >
          <Hero />
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 sm:mb-5"
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-4 
                          bg-gradient-to-r from-white dark:from-gray-950 to-transparent 
                          z-10 pointer-events-none sm:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-4 
                          bg-gradient-to-l from-white dark:from-gray-950 to-transparent 
                          z-10 pointer-events-none sm:hidden" />

            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              offerings={offerings}
            />
          </div>
        </motion.div>

        {/* Compteur d'offrandes */}
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
                {filteredOfferings.length} offrande{filteredOfferings.length !== 1 ? 's' : ''}
                {' '}disponible{filteredOfferings.length !== 1 ? 's' : ''}
              </p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={handleResetCategory}
                  className="text-xs text-amber-600 dark:text-amber-500 
                           hover:text-amber-700 dark:hover:text-amber-400 
                           font-semibold transition-colors hover:underline underline-offset-2"
                >
                  Voir tout
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* États conditionnels : Loading, Error, Empty, Grid */}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState error={error} onRetry={handleRetry} />
        ) : filteredOfferings.length === 0 ? (
          <EmptyState onReset={handleResetCategory} />
        ) : (
          <OfferingsGrid
            offerings={filteredOfferings}
            selectedCategory={selectedCategory}
            onAddToCart={addToCart}
          />
        )}

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <InfoBox />
        </motion.div>
      </div>

      {/* Panier flottant */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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
        isOpen={showCheckout}
        cart={cart}
        totalAmount={cartTotal}
        onClearCart={clearCart}
        onClose={closeCheckout}
      />

      <div className="h-16 sm:h-20" />
    </div>
  );
}