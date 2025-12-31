import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';

export interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  description: string;
  detailedGuide?: string;
  benefits?: string[];
  practicalSteps?: string[];
  category?: string;
  readTime?: number;
  publishedAt?: string;
  author?: string;
  views?: number;
  likes?: number;
  comments?: number;
  featured?: boolean;
  trending?: boolean;
}

export function useSpiritualiteData(categories: { id: string; label: string; icon: any }[]) {
  const [practices, setPractices] = useState<SpiritualPractice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<{ success: boolean; data: SpiritualPractice[]; count: number }>('/spiritualite');
        const enrichedData = data.data.map((practice: SpiritualPractice, index: number) => ({
          ...practice,
          readTime: practice.readTime || Math.floor(Math.random() * 5) + 3,
          publishedAt: practice.publishedAt || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          author: practice.author || 'Équipe Mon Étoile',
          views: practice.views || Math.floor(Math.random() * 1000) + 100,
          likes: practice.likes || Math.floor(Math.random() * 100) + 10,
          comments: practice.comments || Math.floor(Math.random() * 50),
          featured: practice.featured || index === 0,
          trending: practice.trending || Math.random() > 0.7,
          category: practice.category || categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id
        }));
        setPractices(enrichedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchPractices();
  }, [categories]);

  return { practices, loading, error, setError };
}
