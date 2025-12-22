'use client';
import { api } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type CartItem,
  CartModal,
  type Category,
  CategoryFilters,
  CheckoutModal,
  FloatingCart,
  Header,
  Hero,
  InfoBox,
  type Offering,
  OfferingCard,
  staggerContainer
} from './components';

function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addToCart = useCallback((offering: Offering) => {
    console.log("➕ [addToCart] Offrande reçue:", {
      _id: offering._id,
      id: offering.id,
      name: offering.name,
    });

    setCart(prev => {
      console.log("📦 [addToCart] Panier actuel:", prev.map(item => ({
        _id: item._id,
        id: item.id,
        name: item.name,
        quantity: item.quantity
      })));

      // ✅ Utiliser _id OU id comme clé unique
      const uniqueId = offering._id || offering.id;
      
      if (!uniqueId) {
        console.error("❌ [addToCart] ERREUR : Aucun ID trouvé pour l'offrande", offering);
        return prev;
      }

      const existingIndex = prev.findIndex(
        item => (item._id === uniqueId) || (item.id === uniqueId)
      );

      console.log("🔍 [addToCart] Index trouvé:", existingIndex, "pour ID:", uniqueId);

      if (existingIndex !== -1) {
        // Item existe déjà → incrémenter quantité
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        
        console.log("✏️ [addToCart] Quantité mise à jour:", {
          name: updated[existingIndex].name,
          quantity: updated[existingIndex].quantity
        });
        return updated;
      }

      // Item n'existe pas → ajouter nouveau
      const newItem = { 
        ...offering, 
        _id: uniqueId,
        id: uniqueId,
        quantity: 1 
      };

      console.log("🆕 [addToCart] Nouvel item ajouté:", {
        _id: newItem._id,
        name: newItem.name,
        quantity: newItem.quantity
      });
      
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    console.log("🗑️ [removeFromCart] Suppression ID:", id);
    setCart(prev => prev.filter(item => item._id !== id && item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    console.log("🔄 [updateQuantity] ID:", id, "Delta:", delta);
    
    setCart(prev => {
      const updated = prev
        .map(item => {
          if (item._id !== id && item.id !== id) return item;

          const newQuantity = Math.max(0, item.quantity + delta);
          console.log(`📊 [updateQuantity] ${item.name}: ${item.quantity} → ${newQuantity}`);
          
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        })
        .filter(Boolean) as CartItem[];

      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    console.log("🧹 [clearCart] Panier vidé");
    setCart([]);
  }, []);

  // Log du panier à chaque changement
  useEffect(() => {
    console.log("🛒 [useCart] État du panier mis à jour:", {
      items: cart.length,
      total: cartTotal,
      count: cartCount,
      details: cart.map(item => ({
        _id: item._id,
        id: item.id,
        name: item.name,
        quantity: item.quantity
      }))
    });
  }, [cart, cartTotal, cartCount]);

  return {
    cart,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}

/**
 * Hook de gestion des modales
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

/**
 * Hook de chargement des offrandes avec normalisation
 */
function useOfferings() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOfferings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get('/offerings');

        if (!isMounted) return;

        if (response.status === 200 && response.data?.offerings) {
          // ✅ NORMALISATION : Ajouter "id" comme alias de "_id"
          const normalizedOfferings = response.data.offerings.map((offering: any) => {
            const normalizedId = offering._id || offering.id;
            
            console.log("🔧 [Normalisation]", {
              original_id: offering._id,
              name: offering.name,
              normalized_id: normalizedId
            });

            return {
              ...offering,
              _id: normalizedId,
              id: normalizedId,
            };
          });

          console.log("✅ [useOfferings] Offrandes normalisées:", normalizedOfferings.length, "items");
          setOfferings(normalizedOfferings);
        } else {
          throw new Error('Format de réponse invalide');
        }
      } catch (err: any) {
        if (!isMounted) return;

        console.error('[Offerings] Erreur de chargement:', err);
        setError(
          err.response?.data?.message ||
          'Impossible de charger les offrandes. Veuillez réessayer.'
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOfferings();

    return () => {
      isMounted = false;
    };
  }, []);

  return { offerings, loading, error };
}

// =====================================================
// COMPOSANTS D'ÉTAT
// =====================================================

function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 sm:py-20"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="text-4xl mb-4"
      >
        🌀
      </motion.span>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Chargement des offrandes...
      </p>
    </motion.div>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 sm:py-20"
    >
      <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full 
                    flex items-center justify-center mb-4">
        <span className="text-3xl">❌</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Erreur de chargement
      </h3>
      <p className="text-sm text-red-600 dark:text-red-400 text-center max-w-md mb-4">
        {error}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white 
                   font-bold rounded-xl transition-colors active:scale-95"
        >
          Réessayer
        </button>
      )}
    </motion.div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 sm:py-20"
    >
      <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full 
                    flex items-center justify-center mb-4">
        <span className="text-4xl">🔍</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Aucune offrande trouvée
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm mb-4 px-4">
        Essayez une autre catégorie ou consultez toutes les offrandes disponibles
      </p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 
                 dark:bg-amber-600 dark:hover:bg-amber-700 
                 text-white font-bold rounded-xl transition-colors 
                 shadow-lg hover:shadow-xl active:scale-95"
      >
        Voir toutes les offrandes
      </button>
    </motion.div>
  );
}

function OfferingsGrid({
  offerings,
  selectedCategory,
  onAddToCart
}: {
  offerings: Offering[];
  selectedCategory: Category;
  onAddToCart: (offering: Offering) => void;
}) {
  return (
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
        {offerings.map((offering, index) => (
          <motion.div
            key={offering._id || offering.id}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{
              duration: 0.3,
              delay: Math.min(index * 0.03, 0.5),
              ease: 'easeOut'
            }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="h-full"
          >
            <OfferingCard offering={offering} onAddToCart={onAddToCart} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

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
    console.log("💳 [MarcheOffrandes] Procéder au checkout avec:", cart.length, "items");
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

      {/* Espacement bottom */}
      <div className="h-16 sm:h-20" />
    </div>
  );
}