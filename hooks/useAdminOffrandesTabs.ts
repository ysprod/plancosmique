import { useState } from 'react';

export default function useAdminOffrandesTabs() {
  const [activeTab, setActiveTab] = useState<'gestion' | 'stats'>('gestion');
  return { activeTab, setActiveTab };
}
