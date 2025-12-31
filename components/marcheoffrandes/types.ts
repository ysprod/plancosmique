import { Offering } from "@/lib/interfaces";
export type { Offering };

export interface CartItem extends Offering {
    _id: any;
    quantity: number;
}

export type Category = 'all' | 'animal' | 'vegetal' | 'beverage';
