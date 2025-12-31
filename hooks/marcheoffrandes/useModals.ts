import { useState, useCallback } from 'react';

export function useModals() {
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
