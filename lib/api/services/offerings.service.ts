import { ReactNode } from 'react';
import { api } from '../client';

export interface Offering {
  name: any;
  _id: string;
  price: number;
  icon: ReactNode;
  priceUSD: number;
  id: string;
  title: string;
  category: 'animal' | 'vegetal' | 'beverage';
  description?: string;
}

export const offeringsService = {
  list: async (): Promise<Offering[]> => {
    const response = await api.get<{ offerings: Offering[] }>('/offerings');
    return response.data.offerings;
  },
};

export default offeringsService;
