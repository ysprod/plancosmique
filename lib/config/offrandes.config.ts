/**
 * Configuration complète du Marché des Offrandes
 * 
 * Ce fichier définit :
 * - Toutes les offrandes disponibles avec leurs prix
 * - Les catégories d'offrandes (Animal, Végétal, Boisson)
 * - Les associations entre consultations et offrandes
 * - La gestion du panier utilisateur
 */

import { Offering } from '@/lib/interfaces';

// =============================================================================
// TYPES
// =============================================================================

export type OfferingCategory = 'animal' | 'vegetal' | 'beverage';

export interface OfferingItem extends Offering {
  _id: string;
  id: string;
  name: string;
  price: number;
  priceUSD: number;
  category: OfferingCategory;
  icon: string;
  description: string;
  stock?: number; // Optionnel : gestion du stock
  isActive: boolean;
}

export interface CartItem {
  offeringId: string;
  quantity: number;
  name: string;
  price: number;
  category: OfferingCategory;
  icon: string;
}

export interface UserCart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

// =============================================================================
// OFFRANDES - CATÉGORIE ANIMAL
// =============================================================================

const OFFRANDES_ANIMAL: OfferingItem[] = [
  {
    _id: '6945ae01b8af14d5f56cec09',
    id: '6945ae01b8af14d5f56cec09',
    name: 'Poule',
    price: 5000, // CFA
    priceUSD: 8.5,
    category: 'animal',
    icon: '🐔',
    description: 'Offrande de poule pour les consultations de base',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec0a',
    id: '6945ae01b8af14d5f56cec0a',
    name: 'Coq',
    price: 7000,
    priceUSD: 12,
    category: 'animal',
    icon: '🐓',
    description: 'Offrande de coq pour les consultations importantes',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec0c',
    id: '6945ae01b8af14d5f56cec0c',
    name: 'Chèvre',
    price: 15000,
    priceUSD: 25,
    category: 'animal',
    icon: '🐐',
    description: 'Offrande de chèvre pour les consultations majeures',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec0d',
    id: '6945ae01b8af14d5f56cec0d',
    name: 'Mouton',
    price: 20000,
    priceUSD: 34,
    category: 'animal',
    icon: '🐑',
    description: 'Offrande de mouton pour les consultations de haut niveau',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec0e',
    id: '6945ae01b8af14d5f56cec0e',
    name: 'Bœuf',
    price: 150000,
    priceUSD: 255,
    category: 'animal',
    icon: '🐂',
    description: 'Offrande de bœuf pour les consultations exceptionnelles',
    isActive: true
  },
];

// =============================================================================
// OFFRANDES - CATÉGORIE VÉGÉTAL
// =============================================================================

const OFFRANDES_VEGETAL: OfferingItem[] = [
  {
    _id: '6945ae01b8af14d5f56cec10',
    id: '6945ae01b8af14d5f56cec10',
    name: 'Noix de Cola',
    price: 500,
    priceUSD: 0.85,
    category: 'vegetal',
    icon: '🌰',
    description: 'Offrande de noix de cola, symbole d\'hospitalité et de sagesse',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec12',
    id: '6945ae01b8af14d5f56cec12',
    name: 'Igname',
    price: 2000,
    priceUSD: 3.4,
    category: 'vegetal',
    icon: '🍠',
    description: 'Offrande d\'igname, symbole de prospérité',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec13',
    id: '6945ae01b8af14d5f56cec13',
    name: 'Banane Plantain',
    price: 1500,
    priceUSD: 2.5,
    category: 'vegetal',
    icon: '🍌',
    description: 'Offrande de banane plantain pour les consultations simples',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec14',
    id: '6945ae01b8af14d5f56cec14',
    name: 'Manioc',
    price: 1000,
    priceUSD: 1.7,
    category: 'vegetal',
    icon: '🥔',
    description: 'Offrande de manioc, aliment de base et symbole de subsistance',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec15',
    id: '6945ae01b8af14d5f56cec15',
    name: 'Arachide',
    price: 800,
    priceUSD: 1.35,
    category: 'vegetal',
    icon: '🥜',
    description: 'Offrande d\'arachide pour les consultations courantes',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec17',
    id: '6945ae01b8af14d5f56cec17',
    name: 'Maïs',
    price: 1200,
    priceUSD: 2,
    category: 'vegetal',
    icon: '🌽',
    description: 'Offrande de maïs, symbole d\'abondance',
    isActive: true
  },
];

// =============================================================================
// OFFRANDES - CATÉGORIE BOISSON
// =============================================================================

const OFFRANDES_BEVERAGE: OfferingItem[] = [
  {
    _id: '6945ae01b8af14d5f56cec11',
    id: '6945ae01b8af14d5f56cec11',
    name: 'Vin de Palme',
    price: 1500,
    priceUSD: 2.5,
    category: 'beverage',
    icon: '🍶',
    description: 'Offrande de vin de palme, boisson traditionnelle sacrée',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec0b',
    id: '6945ae01b8af14d5f56cec0b',
    name: 'Sodabi (Alcool local)',
    price: 2500,
    priceUSD: 4.25,
    category: 'beverage',
    icon: '🥃',
    description: 'Offrande de sodabi, alcool traditionnel puissant',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec15',
    id: '6945ae01b8af14d5f56cec15',
    name: 'Eau',
    price: 300,
    priceUSD: 0.5,
    category: 'beverage',
    icon: '💧',
    description: 'Offrande d\'eau pure, élément de purification',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec16',
    id: '6945ae01b8af14d5f56cec16',
    name: 'Tchoukoutou (Bière locale)',
    price: 1000,
    priceUSD: 1.7,
    category: 'beverage',
    icon: '🍺',
    description: 'Offrande de tchoukoutou, bière traditionnelle',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec18',
    id: '6945ae01b8af14d5f56cec18',
    name: 'Bissap (Jus d\'hibiscus)',
    price: 800,
    priceUSD: 1.35,
    category: 'beverage',
    icon: '🧃',
    description: 'Offrande de bissap, boisson rafraîchissante et sacrée',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec19',
    id: '6945ae01b8af14d5f56cec19',
    name: 'Gin (Spiritueux)',
    price: 3000,
    priceUSD: 5,
    category: 'beverage',
    icon: '🍸',
    description: 'Offrande de gin pour les rituels importants',
    isActive: true
  },
  {
    _id: '6945ae01b8af14d5f56cec1a',
    id: '6945ae01b8af14d5f56cec1a',
    name: 'Vin Rouge',
    price: 5000,
    priceUSD: 8.5,
    category: 'beverage',
    icon: '🍷',
    description: 'Offrande de vin rouge pour les cérémonies spéciales',
    isActive: true
  },
];

// =============================================================================
// CATALOGUE COMPLET
// =============================================================================

export const OFFRANDES_CATALOGUE: OfferingItem[] = [
  ...OFFRANDES_ANIMAL,
  ...OFFRANDES_VEGETAL,
  ...OFFRANDES_BEVERAGE,
];

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

/**
 * Récupère une offrande par son ID
 */
export function getOfferingById(offeringId: string): OfferingItem | undefined {
  return OFFRANDES_CATALOGUE.find(o => o.id === offeringId || o._id === offeringId);
}

/**
 * Récupère toutes les offrandes d'une catégorie
 */
export function getOfferingsByCategory(category: OfferingCategory): OfferingItem[] {
  return OFFRANDES_CATALOGUE.filter(o => o.category === category && o.isActive);
}

/**
 * Récupère toutes les offrandes actives
 */
export function getActiveOfferings(): OfferingItem[] {
  return OFFRANDES_CATALOGUE.filter(o => o.isActive);
}

/**
 * Calcule le prix total d'un panier
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Calcule le prix total d'un panier en USD
 */
export function calculateCartTotalUSD(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const offering = getOfferingById(item.offeringId);
    if (!offering) return total;
    return total + (offering.priceUSD * item.quantity);
  }, 0);
}

/**
 * Valide si une offrande existe et est active
 */
export function isOfferingAvailable(offeringId: string): boolean {
  const offering = getOfferingById(offeringId);
  return offering !== undefined && offering.isActive;
}

/**
 * Récupère les détails complets d'un ensemble d'alternatives d'offrandes
 */
export function getOfferingAlternativesDetails(alternatives: Array<{ offeringId: string, quantity: number, category: OfferingCategory }>) {
  return alternatives.map(alt => {
    const offering = getOfferingById(alt.offeringId);
    if (!offering) {
      return {
        ...alt,
        name: 'Offrande inconnue',
        price: 0,
        priceUSD: 0,
        icon: '❓',
        error: 'Offrande non trouvée'
      };
    }
    return {
      ...alt,
      name: offering.name,
      price: offering.price * alt.quantity,
      priceUSD: offering.priceUSD * alt.quantity,
      icon: offering.icon,
      description: offering.description
    };
  });
}

/**
 * Statistiques du marché des offrandes
 */
export function getMarketStats() {
  const activeOfferings = getActiveOfferings();
  
  return {
    totalOfferings: OFFRANDES_CATALOGUE.length,
    activeOfferings: activeOfferings.length,
    animalOfferings: getOfferingsByCategory('animal').length,
    vegetalOfferings: getOfferingsByCategory('vegetal').length,
    beverageOfferings: getOfferingsByCategory('beverage').length,
    priceRange: {
      min: Math.min(...activeOfferings.map(o => o.price)),
      max: Math.max(...activeOfferings.map(o => o.price)),
    },
    priceRangeUSD: {
      min: Math.min(...activeOfferings.map(o => o.priceUSD)),
      max: Math.max(...activeOfferings.map(o => o.priceUSD)),
    }
  };
}

/**
 * Vérifie si un utilisateur a les offrandes nécessaires pour une consultation
 */
export function hasRequiredOfferings(
  userWallet: Array<{ offeringId: string, quantity: number }>,
  requiredOfferings: Array<{ offeringId: string, quantity: number }>
): boolean {
  return requiredOfferings.every(required => {
    const userOffering = userWallet.find(w => w.offeringId === required.offeringId);
    return userOffering && userOffering.quantity >= required.quantity;
  });
}

/**
 * Déduit les offrandes du wallet utilisateur
 */
export function deductOfferings(
  userWallet: Array<{ offeringId: string, quantity: number }>,
  offeringsToDeduct: Array<{ offeringId: string, quantity: number }>
): Array<{ offeringId: string, quantity: number }> {
  const updatedWallet = [...userWallet];
  
  offeringsToDeduct.forEach(deduct => {
    const walletItem = updatedWallet.find(w => w.offeringId === deduct.offeringId);
    if (walletItem) {
      walletItem.quantity -= deduct.quantity;
      // Supprimer si quantité = 0
      if (walletItem.quantity <= 0) {
        const index = updatedWallet.indexOf(walletItem);
        updatedWallet.splice(index, 1);
      }
    }
  });
  
  return updatedWallet;
}

/**
 * Formate le prix en CFA
 */
export function formatPriceCFA(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Formate le prix en USD
 */
export function formatPriceUSD(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

// =============================================================================
// ASSOCIATIONS CONSULTATION → OFFRANDES
// =============================================================================

/**
 * Cette fonction récupère les offrandes associées à une consultation donnée
 * en utilisant la configuration des rubriques
 */
export function getConsultationOfferings(consultationId: string) {
  // Cette fonction sera implémentée en important la config des rubriques
  // et en récupérant les alternatives d'offrandes de la consultation
  // Voir: lib/config/rubriques.config.ts → getConsultationById()
}

// =============================================================================
// EXPORT DES CONSTANTES
// =============================================================================

export const CATEGORIES: Array<{ id: OfferingCategory, label: string, icon: string, color: string }> = [
  { id: 'animal', label: 'Animaux', icon: '🐔', color: 'bg-red-100 text-red-700' },
  { id: 'vegetal', label: 'Végétaux', icon: '🌿', color: 'bg-green-100 text-green-700' },
  { id: 'beverage', label: 'Boissons', icon: '🍶', color: 'bg-blue-100 text-blue-700' },
];

export const CURRENCY = {
  CFA: 'XOF',
  USD: 'USD',
  EXCHANGE_RATE: 588.5, // 1 USD = 588.5 CFA (taux indicatif)
};
