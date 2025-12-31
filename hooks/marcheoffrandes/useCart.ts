import { useState, useMemo, useCallback } from 'react';
import { Offering } from '@/lib/interfaces';

export interface CartItem extends Offering {
  _id: string;
  quantity: number;
}

export function useCart() {
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
    setCart(prev => {
      const uniqueId = offering._id || offering.id;
      if (!uniqueId) return prev;
      const existingIndex = prev.findIndex(
        item => (item._id === uniqueId) || (item.id === uniqueId)
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }
      const newItem = {
        ...offering,
        _id: uniqueId as string,
        id: uniqueId,
        quantity: 1
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item._id !== id && item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => {
      const updated = prev
        .map(item => {
          if (item._id !== id && item.id !== id) return item;
          const newQuantity = Math.max(0, item.quantity + delta);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        })
        .filter(Boolean) as CartItem[];
      return updated;
    });
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
    clearCart
  };
}
