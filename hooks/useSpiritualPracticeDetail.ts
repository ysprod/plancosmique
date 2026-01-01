import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import type { AxiosError } from 'axios';

export interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  iconName: string;
  category: string;
  published: boolean;
  order?: number;
  description: string;
  introduction: string;
  keyElements: string[];
  detailedGuide: string;
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  affirmation: string;
  materials?: string[];
  bestTiming?: string;
}

export function useSpiritualPracticeDetail(slug: string) {
  const [practice, setPractice] = useState<SpiritualPractice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchPractice = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/spiritualite');
        if (data?.data && Array.isArray(data.data)) {
          const found = data.data.find((p: SpiritualPractice) => p._id === slug || p.slug === slug);
          if (found) {
            setPractice(found);
          } else {
            setError('Pratique non trouvée');
          }
        }
      } catch (err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(axiosErr?.response?.data?.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchPractice();
  }, [slug]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return { practice, loading, error, expandedSections, toggleSection };
}
