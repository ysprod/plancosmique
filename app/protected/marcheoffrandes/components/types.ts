// ==================== TYPES ====================

export interface Offering {
    id: string;
    name: string;
    price: number;
    priceUSD: number;
    category: 'animal' | 'vegetal' | 'beverage';
    icon: string;
    description: string;
}

export interface Alternative {
    items: { name: string; quantity: number }[];
    total: number;
}

export interface CartItem extends Offering {
    quantity: number;
}

export type Category = 'all' | 'animal' | 'vegetal' | 'beverage';
