'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Sparkles,
  Star,
  Package,
  Leaf,
  Wine,
  Plus,
  X,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoneyFusion } from '@/lib/hooks/useMoneyFusion';
import { useAuth } from '@/lib/auth/AuthContext';

// ==================== TYPES ====================

interface Offering {
  id: string;
  name: string;
  price: number;
  priceUSD: number;
  category: 'animal' | 'vegetal' | 'beverage';
  icon: string;
  description: string;
}

interface Alternative {
  items: { name: string; quantity: number }[];
  total: number;
}

interface CartItem extends Offering {
  quantity: number;
}

// ==================== DONNÉES ====================

const offerings: Offering[] = [
  // Animaux
  { 
    id: 'poulet-blanc', 
    name: 'Poulet blanc', 
    price: 5000, 
    priceUSD: 8.9, 
    category: 'animal', 
    icon: '🐓',
    description: 'Symbole de pureté et d\'harmonie'
  },
  { 
    id: 'poulet-noir', 
    name: 'Poulet noir', 
    price: 7000, 
    priceUSD: 12.4, 
    category: 'animal', 
    icon: '🐔',
    description: 'Pour éloigner les énergies négatives'
  },
  { 
    id: 'coq-rouge', 
    name: 'Coq rouge', 
    price: 9000, 
    priceUSD: 16.0, 
    category: 'animal', 
    icon: '🐓',
    description: 'Force et protection spirituelle'
  },
  { 
    id: 'mouton-blanc', 
    name: 'Mouton blanc', 
    price: 35000, 
    priceUSD: 62.1, 
    category: 'animal', 
    icon: '🐑',
    description: 'Paix et bénédictions familiales'
  },
  { 
    id: 'mouton-noir', 
    name: 'Mouton noir', 
    price: 40000, 
    priceUSD: 71.0, 
    category: 'animal', 
    icon: '🐑',
    description: 'Purification et renaissance'
  },
  { 
    id: 'boeuf', 
    name: 'Bœuf', 
    price: 350000, 
    priceUSD: 620.6, 
    category: 'animal', 
    icon: '🐂',
    description: 'Grande cérémonie et prospérité'
  },
  { 
    id: 'chameau', 
    name: 'Chameau', 
    price: 600000, 
    priceUSD: 1064.6, 
    category: 'animal', 
    icon: '🐪',
    description: 'Endurance et sagesse ancestrale'
  },
  
  // Végétaux
  { 
    id: 'bol-mil', 
    name: 'Bol de mil', 
    price: 2500, 
    priceUSD: 4.4, 
    category: 'vegetal', 
    icon: '🌾',
    description: 'Nourriture sacrée des ancêtres'
  },
  { 
    id: 'bol-mais', 
    name: 'Bol de maïs', 
    price: 2000, 
    priceUSD: 3.5, 
    category: 'vegetal', 
    icon: '🌽',
    description: 'Abondance et fertilité'
  },
  { 
    id: 'bol-riz', 
    name: 'Bol de riz', 
    price: 3000, 
    priceUSD: 5.3, 
    category: 'vegetal', 
    icon: '🍚',
    description: 'Richesse et satisfaction'
  },
  { 
    id: 'cola-rouge', 
    name: 'Cola rouge', 
    price: 1000, 
    priceUSD: 1.8, 
    category: 'vegetal', 
    icon: '🔴',
    description: 'Communication avec les esprits'
  },
  { 
    id: 'cola-blanche', 
    name: 'Cola blanche', 
    price: 1200, 
    priceUSD: 2.1, 
    category: 'vegetal', 
    icon: '⚪',
    description: 'Pureté et clarté spirituelle'
  },
  
  // Boissons
  { 
    id: 'vin-palme', 
    name: 'Vin de palme', 
    price: 1500, 
    priceUSD: 2.7, 
    category: 'beverage', 
    icon: '🍷',
    description: 'Libation traditionnelle'
  },
  { 
    id: 'liqueur', 
    name: 'Liqueur', 
    price: 3500, 
    priceUSD: 6.2, 
    category: 'beverage', 
    icon: '🥃',
    description: 'Offrande de prestige'
  },
];

const alternatives: Record<string, Alternative[]> = {
  'poulet-blanc': [
    { items: [{ name: 'Cola rouge', quantity: 5 }], total: 5000 },
    { items: [{ name: 'Liqueur', quantity: 1 }, { name: 'Vin de palme', quantity: 1 }], total: 5000 }
  ],
  'poulet-noir': [
    { items: [{ name: 'Cola rouge', quantity: 7 }], total: 7000 },
    { items: [{ name: 'Bol de mil', quantity: 2 }, { name: 'Cola rouge', quantity: 2 }], total: 7000 }
  ],
  'coq-rouge': [
    { items: [{ name: 'Cola rouge', quantity: 9 }], total: 9000 },
    { items: [{ name: 'Bol de mil', quantity: 2 }, { name: 'Bol de maïs', quantity: 2 }], total: 9000 }
  ],
  'mouton-blanc': [
    { items: [{ name: 'Cola rouge', quantity: 35 }], total: 35000 },
    { items: [{ name: 'Liqueur', quantity: 10 }], total: 35000 }
  ],
  'mouton-noir': [
    { items: [{ name: 'Cola rouge', quantity: 40 }], total: 40000 },
    { items: [{ name: 'Bol de riz', quantity: 13 }, { name: 'Cola rouge', quantity: 1 }], total: 40000 }
  ],
  'boeuf': [
    { items: [{ name: 'Cola rouge', quantity: 350 }], total: 350000 },
    { items: [{ name: 'Liqueur', quantity: 100 }], total: 350000 }
  ],
  'chameau': [
    { items: [{ name: 'Cola blanche', quantity: 500 }], total: 600000 },
    { items: [{ name: 'Bol de mil', quantity: 240 }], total: 600000 }
  ]
};

// ==================== ANIMATIONS ====================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const slideFromBottom = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { y: '100%', opacity: 0, transition: { duration: 0.2 } }
};

// ==================== COMPOSANTS ====================

// Carte d'offrande
interface OfferingCardProps {
  offering: Offering;
  onAddToCart: (offering: Offering) => void;
  onShowAlternatives: (offering: Offering) => void;
}

const OfferingCard: React.FC<OfferingCardProps> = ({ offering, onAddToCart, onShowAlternatives }) => {
  const hasAlternatives = offering.category === 'animal' && alternatives[offering.id];

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-gray-200 shadow-md hover:shadow-xl transition-all group"
    >
      {/* Icône */}
      <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 text-center group-hover:scale-110 transition-transform">
        {offering.icon}
      </div>

      {/* Nom */}
      <h3 className="text-lg sm:text-xl font-black text-black mb-1 text-center group-hover:text-amber-600 transition-colors">
        {offering.name}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4 min-h-[32px] sm:min-h-[40px] px-1">
        {offering.description}
      </p>

      {/* Prix */}
      <div className="text-center mb-3 sm:mb-4 py-2 bg-gray-50 rounded-xl">
        <p className="text-xl sm:text-2xl font-black text-gray-900">
          {offering.price.toLocaleString()} F
        </p>
        <p className="text-xs text-gray-500">
          ≈ ${offering.priceUSD.toFixed(1)} USD
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => onAddToCart(offering)}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 sm:py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Ajouter
        </button>

        {hasAlternatives && (
          <button
            onClick={() => onShowAlternatives(offering)}
            className="w-full bg-green-50 text-green-700 py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-green-100 active:scale-95 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm border border-green-200"
          >
            <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Alternatives
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Badge panier flottant
interface FloatingCartProps {
  count: number;
  onClick: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ count, onClick }) => (
  <motion.button
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white z-40 active:scale-90 transition-transform"
  >
    <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-black border-2 border-white">
      {count > 99 ? '99+' : count}
    </span>
  </motion.button>
);

// ==================== PAGE PRINCIPALE ====================

export default function MarcheOffrandes() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'animal' | 'vegetal' | 'beverage'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const { user } = useAuth();
  const { initiatePayment, loading: paymentLoading, error: paymentError } = useMoneyFusion();

  // Catégories
  const categories = [
    { id: 'all' as const, name: 'Tout', icon: Sparkles, count: offerings.length },
    { id: 'animal' as const, name: 'Animales', icon: Package, count: offerings.filter(o => o.category === 'animal').length },
    { id: 'vegetal' as const, name: 'Végétales', icon: Leaf, count: offerings.filter(o => o.category === 'vegetal').length },
    { id: 'beverage' as const, name: 'Boissons', icon: Wine, count: offerings.filter(o => o.category === 'beverage').length }
  ];

  // Offrandes filtrées
  const filteredOfferings = useMemo(() => 
    selectedCategory === 'all' 
      ? offerings 
      : offerings.filter(o => o.category === selectedCategory),
    [selectedCategory]
  );

  // Totaux panier
  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [cart]
  );

  const cartCount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Actions panier
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

  // Validation téléphone
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

  // Paiement
  const handleProceedToCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setShowCart(false);
    setShowCheckout(true);
  }, [cart.length]);

  const handlePayment = useCallback(async () => {
    if (!validatePhone(phoneNumber)) return;

    const customerName = user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}`
      : user?.email || 'Client';

    const items = cart.map(item => ({
      [item.name]: item.price * item.quantity
    }));

    const result = await initiatePayment({
      amount: cartTotal,
      items,
      phoneNumber: phoneNumber.replace(/\s/g, ''),
      customerName,
      metadata: {
        userId: user?._id || 'guest',
        type: 'OFFRANDES',
        cart: JSON.stringify(cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })))
      }
    });

    if (result.success && result.paymentUrl) {
      window.location.href = result.paymentUrl;
    }
  }, [phoneNumber, validatePhone, cart, cartTotal, user, initiatePayment]);

  return (
    <div className="relative min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mon Étoile"
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 hover:scale-105 transition-transform"
              priority
            />
          </Link>
          
          <div className="text-center flex-1 px-4">
            <h1 className="text-base sm:text-lg md:text-xl font-black text-black">
              MARCHÉ DES OFFRANDES
            </h1>
            {cartCount > 0 && (
              <p className="text-xs text-gray-600 mt-0.5">
                {cartCount} article{cartCount > 1 ? 's' : ''} · {cartTotal.toLocaleString()} F
              </p>
            )}
          </div>

          <div className="w-12 sm:w-14" /> {/* Spacer pour centrer */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-10"
        >
          <div className="inline-block mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-3 sm:mb-4 leading-tight">
            Offrandes Sacrées<br className="sm:hidden" /> Traditionnelles
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-2">
            Chaque offrande porte une <span className="font-bold text-black">signification spirituelle profonde</span> selon les traditions initiatiques africaines.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex overflow-x-auto gap-2 sm:gap-3 mb-6 sm:mb-8 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={fadeInUp}
              onClick={() => setSelectedCategory(cat.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full sm:rounded-2xl font-bold flex items-center gap-2 transition-all text-sm sm:text-base shadow-sm ${
                selectedCategory === cat.id
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
              }`}
            >
              <cat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{cat.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/20' : 'bg-gray-300'
              }`}>
                {cat.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

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
              onShowAlternatives={(o) => {
                setSelectedOffering(o);
                setShowAlternatives(true);
              }}
            />
          ))}
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-200"
        >
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <Info className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-2">
                Pourquoi des offrandes ?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Dans la tradition africaine, les offrandes établissent une connexion sacrée avec les ancêtres et les forces spirituelles. 
                Vous pouvez choisir des <strong>offrandes animales</strong> ou leurs <strong>équivalents végétaux et boissons</strong>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Panier flottant */}
      {cartCount > 0 && (
        <FloatingCart count={cartCount} onClick={() => setShowCart(true)} />
      )}

      {/* Modal Panier */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCart(false)}
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
                    onClick={() => setShowCart(false)}
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
                      onClick={() => setShowCart(false)}
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
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-gray-200 hover:border-amber-500 active:scale-90 flex items-center justify-center transition-all"
                            >
                              <Plus className="w-4 h-4 rotate-45" />
                            </button>
                            <span className="font-bold text-base sm:text-lg w-6 sm:w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-gray-200 hover:border-amber-500 active:scale-90 flex items-center justify-center transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
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
                          onClick={handleProceedToCheckout}
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-3"
                        >
                          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                          Procéder au paiement
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        
                        <button
                          onClick={clearCart}
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

      {/* Modal Alternatives */}
<AnimatePresence>
  {showAlternatives && selectedOffering && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setShowAlternatives(false)}
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              <span className="hidden sm:inline">Alternatives Non-Animales</span>
              <span className="sm:hidden">Alternatives</span>
            </h2>
            <button
              onClick={() => setShowAlternatives(false)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 sm:p-6">
          {/* Info offrande */}
          <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{selectedOffering.icon}</span>
              <div className="flex-1">
                <p className="text-sm sm:text-base text-gray-700">
                  Équivalences pour
                </p>
                <h3 className="text-lg sm:text-xl font-black text-black">
                  {selectedOffering.name}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-amber-300">
              <span className="text-sm text-gray-700">Prix de référence</span>
              <span className="text-xl sm:text-2xl font-black text-amber-600">
                {selectedOffering.price.toLocaleString()} F
              </span>
            </div>
          </div>

          {/* Message explicatif */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 leading-relaxed">
              Ces alternatives végétales et boissons ont la <strong>même valeur spirituelle</strong> que l'offrande animale selon la tradition.
            </p>
          </div>

          {/* Liste des alternatives */}
          <div className="space-y-4">
            {alternatives[selectedOffering.id]?.map((alt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-400 transition-colors shadow-sm"
              >
                {/* En-tête option */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-black flex items-center gap-2 text-base sm:text-lg">
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black text-sm">
                      {index + 1}
                    </span>
                    Option {index + 1}
                  </h3>
                  <span className="text-xs sm:text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                    = {alt.total.toLocaleString()} F
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {alt.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm sm:text-base text-gray-700 flex items-center gap-2">
                        <span className="text-xs text-gray-500">•</span>
                        {item.name}
                      </span>
                      <span className="font-bold text-black text-sm sm:text-base">
                        × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total option */}
                <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                  <span className="font-bold text-gray-700 text-sm sm:text-base">Total équivalent</span>
                  <span className="text-lg sm:text-xl font-black text-green-600">
                    {alt.total.toLocaleString()} F
                  </span>
                </div>

                {/* Bouton ajouter cette option */}
                <button
                  onClick={() => {
                    // Logique pour ajouter cette alternative au panier
                    alt.items.forEach(altItem => {
                      const offering = offerings.find(o => o.name === altItem.name);
                      if (offering) {
                        for (let i = 0; i < altItem.quantity; i++) {
                          addToCart(offering);
                        }
                      }
                    });
                    setShowAlternatives(false);
                    setShowCart(true);
                  }}
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter cette option au panier
                </button>
              </motion.div>
            ))}
          </div>

          {/* Note de bas */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs sm:text-sm text-blue-800 text-center leading-relaxed">
              💡 <strong>Conseil :</strong> Vous pouvez aussi composer votre propre combinaison en ajoutant les articles individuellement depuis le catalogue.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

{/* Modal Checkout */}
<AnimatePresence>
  {showCheckout && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setShowCheckout(false)}
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
              Paiement
            </h2>
            <button
              onClick={() => setShowCheckout(false)}
              disabled={paymentLoading}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 flex items-center justify-center transition-all disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 sm:p-6">
          {/* Étapes */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-green-600">Panier validé</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <span className="text-sm font-bold text-amber-600">Paiement</span>
            </div>
          </div>

          {/* Résumé commande */}
          <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
            <h3 className="font-black text-black mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              Résumé de votre commande
            </h3>
            
            {/* Articles (version compacte) */}
            <div className="space-y-2 mb-3">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {item.name} × {item.quantity}
                    </span>
                  </span>
                  <span className="font-bold text-black whitespace-nowrap ml-2">
                    {(item.price * item.quantity).toLocaleString()} F
                  </span>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-xs text-gray-500 italic">
                  + {cart.length - 3} autre{cart.length - 3 > 1 ? 's' : ''} article{cart.length - 3 > 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t-2 border-amber-300 pt-3 flex items-center justify-between">
              <span className="font-black text-black text-base sm:text-lg">Total à payer</span>
              <div className="text-right">
                <p className="text-xl sm:text-2xl font-black text-amber-600">
                  {cartTotal.toLocaleString()} F
                </p>
                <p className="text-xs text-gray-600">
                  ≈ ${(cartTotal / 563.5).toFixed(2)} USD
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire paiement */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Numéro de téléphone Mobile Money
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9+\s]/g, '');
                  setPhoneNumber(value);
                  if (phoneError) validatePhone(value);
                }}
                onBlur={() => validatePhone(phoneNumber)}
                disabled={paymentLoading}
                placeholder="Ex: 0758385387"
                className={`w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none transition-colors text-base ${
                  phoneError 
                    ? 'border-red-300 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-amber-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {phoneError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-600"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{phoneError}</span>
                </motion.div>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">Opérateurs acceptés:</span>
              <div className="flex items-center gap-1.5">
                {['MTN', 'Moov', 'Orange', 'Wave'].map(op => (
                  <span 
                    key={op} 
                    className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 font-semibold"
                  >
                    {op}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Message d'erreur paiement */}
          {paymentError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-800 mb-1">Erreur de paiement</p>
                <p className="text-xs sm:text-sm text-red-700">{paymentError}</p>
              </div>
            </motion.div>
          )}

          {/* Info sécurité */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
                <strong>Paiement 100% sécurisé</strong> par MoneyFusion. 
                Vous recevrez une notification Mobile Money pour confirmer le paiement.
              </p>
            </div>
          </div>

          {/* Boutons action */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={paymentLoading || !phoneNumber || !!phoneError}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-3"
            >
              {paymentLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Confirmer le paiement</span>
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </>
              )}
            </button>

            <button
              onClick={() => {
                setShowCheckout(false);
                setShowCart(true);
              }}
              disabled={paymentLoading}
              className="w-full py-3 text-gray-600 font-semibold hover:text-gray-900 active:scale-95 transition-all disabled:opacity-50"
            >
              Retour au panier
            </button>
          </div>

          {/* Note de bas */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500 leading-relaxed">
              En confirmant, vous acceptez nos conditions d'utilisation. 
              Un reçu vous sera envoyé par SMS après validation.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      {/* Modal Alternatives - À AJOUTER avec même pattern */}
      {/* Modal Checkout - À AJOUTER avec même pattern */}
    </div>
  );
}