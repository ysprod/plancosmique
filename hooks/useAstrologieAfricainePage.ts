import { useCallback, useMemo, useState } from 'react';
import { Calendar, Moon, Sparkles } from 'lucide-react';

export type TabId = 'calendrier' | 'rituels' | 'incantations';

export interface Tab {
  id: TabId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export function useAstrologieAfricainePage() {
  const [activeTab, setActiveTab] = useState<TabId>('calendrier');
  const handleTabChange = useCallback((tabId: TabId) => setActiveTab(tabId), []);
  const tabs = useMemo<Tab[]>(
    () => [
      {
        id: 'calendrier',
        icon: Moon,
        title: 'Calendrier Lunaire',
        description: 'Cycles et phases de la Lune'
      },
      {
        id: 'rituels',
        icon: Calendar,
        title: 'Rituels',
        description: 'Cérémonies sacrées'
      },
      {
        id: 'incantations',
        icon: Sparkles,
        title: 'Incantations',
        description: 'Invocations magiques'
      }
    ],
    []
  );
  return { activeTab, setActiveTab, handleTabChange, tabs };
}
