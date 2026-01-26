'use client';
import SettingsLayout from '@/components/admin/settings/SettingsLayout';
import SettingsTabContent from '@/components/admin/settings/SettingsTabContent';
import { useSettingsView } from '@/hooks/commons/useSettingsView';
import { Bell, CreditCard, Database, Lock, Settings } from 'lucide-react';

export default function SettingsPageClient() {

  const {
    activeTab, setActiveTab, isSaving, logLevel, siteEmail, setSiteEmail,
    saveSuccess, setSaveSuccess, setShowApiKey, maintenanceMode,
    siteName, setSiteName, setLogLevel, setNewConsultationNotif, showApiKey,
    sitePhone, setMaintenanceMode, emailNotifications, newConsultationNotif,
    twoFactorAuth, setTwoFactorAuth, passwordExpiry, setPasswordExpiry, maxUploadSize,
    newUserNotif, setNewUserNotif, paymentMethods, setMaxUploadSize,
    paymentNotif, setPaymentNotif, backupFrequency, setBackupFrequency,
    sessionTimeout, setSessionTimeout, setMoneyFusionApiKey, moneyFusionApiKey,
    setEmailNotifications, setSitePhone, setIsSaving, setPaymentMethods,
  } = useSettingsView();

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'system', label: 'Système', icon: Database },
  ] as const;

  const tabProps = {
    general: {
      siteName, setSiteName, siteEmail, setSiteEmail, sitePhone, setSitePhone, maintenanceMode, setMaintenanceMode
    },
    notifications: {
      emailNotifications, setEmailNotifications, newUserNotif, setNewUserNotif, newConsultationNotif, setNewConsultationNotif, paymentNotif, setPaymentNotif
    },
    security: {
      twoFactorAuth, setTwoFactorAuth, sessionTimeout, setSessionTimeout, passwordExpiry, setPasswordExpiry
    },
    payment: {
      moneyFusionApiKey, setMoneyFusionApiKey, showApiKey, setShowApiKey, paymentMethods, setPaymentMethods
    },
    system: {
      maxUploadSize, setMaxUploadSize, backupFrequency, setBackupFrequency, logLevel, setLogLevel
    }
  };

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