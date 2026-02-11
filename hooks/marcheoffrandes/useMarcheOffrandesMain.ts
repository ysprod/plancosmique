import type { Category } from '@/components/marcheoffrandes/types';
import { useCart } from '@/hooks/marcheoffrandes/useCart';
import { useOfferings } from '@/hooks/marcheoffrandes/useOfferings';
import { useCallback, useMemo, useState } from 'react';

export function useMarcheOffrandesMain() {
  const { cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

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

  const { offerings, loading, error } = useOfferings();
  const filteredOfferings = useMemo(
    () => selectedCategory === 'all'
      ? offerings : offerings.filter(o => o.category === selectedCategory),
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
    window.location.href = `${window.location.href.split('?')[0]}?r=${Date.now()}`;
  }, []);

  return {
    cart, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, clearCart,
    showCart, showCheckout, openCart, closeCart, openCheckout, closeCheckout, backToCart,
    offerings, loading, error, selectedCategory, setSelectedCategory, filteredOfferings,
    handleProceedToCheckout, handleResetCategory, handleRetry
  };
}