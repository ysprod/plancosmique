
export interface Offering {
    _id: string;
    id: string;
    name: string;
    price: number;
    priceUSD: number;
    category: 'animal' | 'vegetal' | 'beverage';
    icon: string;
    description: string;
}

export interface CartItem extends Offering {
    _id: any;
    quantity: number;
}

export type Category = 'all' | 'animal' | 'vegetal' | 'beverage';
