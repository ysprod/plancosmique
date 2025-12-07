import { Offering, Alternative } from './types';

// ==================== DONNÉES ====================

export const offerings: Offering[] = [
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

export const alternatives: Record<string, Alternative[]> = {
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
