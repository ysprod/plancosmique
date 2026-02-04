'use client';
import SettingsLayout from '@/components/admin/settings/SettingsLayout';
import SettingsTabContent from '@/components/admin/settings/SettingsTabContent';
import { useSettingsView } from '@/hooks/commons/useSettingsView';
import { Bell, CreditCard, Database, Lock, Settings } from 'lucide-react';

export default function SettingsPageClient() {
  const { activeTab, setActiveTab, isSaving, saveSuccess, handleSave, tabProps, } = useSettingsView();

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'system', label: 'Système', icon: Database },
  ] as const;

  return (
    <SettingsLayout
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={(tab: string) => setActiveTab(tab as any)}
      isSaving={isSaving}
      saveSuccess={saveSuccess}
      onSave={handleSave}
    >
      <SettingsTabContent activeTab={activeTab} tabProps={tabProps} />
    </SettingsLayout>
  );
}