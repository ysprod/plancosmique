import { Calendar, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

type HoroscopeTypeId = 'mensuel' | 'annuel';

interface Tab {
  id: HoroscopeTypeId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const useHoroscopeTabs = () => {
  return useMemo<Tab[]>(() => [
    { id: 'mensuel', icon: Calendar, title: 'Mensuel', subtitle: 'Ce mois' },
    { id: 'annuel', icon: TrendingUp, title: 'Annuel', subtitle: 'Cette année' }
  ], []);
};

export type { HoroscopeTypeId, Tab };

export default useHoroscopeTabs;
