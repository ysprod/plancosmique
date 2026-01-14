'use client';

import { useCart } from '@/hooks/marcheoffrandes/useCart';
import { useModals } from '@/hooks/marcheoffrandes/useModals';
import { useOfferings } from '@/hooks/marcheoffrandes/useOfferings';
import { useCallback, useMemo, useState } from 'react';
import type { Category } from '@/components/marcheoffrandes/types';

export function useMarcheOffrandesMain() {
  const { cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showCart, showCheckout, openCart, closeCart, openCheckout, closeCheckout, backToCart } = useModals();
  const { offerings, loading, error } = useOfferings();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const filteredOfferings = useMemo(
    () => selectedCategory === 'all'
      ? offerings
      : offerings.filter(o => o.category === selectedCategory),
    [selectedCategory, offerings]
  );
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
  return {
    cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart,
    showCart, showCheckout, openCart, closeCart, openCheckout, closeCheckout, backToCart,
    offerings, loading, error, selectedCategory, setSelectedCategory, filteredOfferings,
    handleProceedToCheckout, handleResetCategory, handleRetry
  };
}
