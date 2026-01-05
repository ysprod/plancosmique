'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Lock, CreditCard, Database, Settings, Loader } from 'lucide-react';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';
import SettingsGeneralTab from '@/components/admin/settings/SettingsGeneralTab';
import SettingsNotificationsTab from '@/components/admin/settings/SettingsNotificationsTab';
import SettingsSecurityTab from '@/components/admin/settings/SettingsSecurityTab';
import SettingsPaymentTab from '@/components/admin/settings/SettingsPaymentTab';
import SettingsSystemTab from '@/components/admin/settings/SettingsSystemTab';
import SettingsHeader from './SettingsHeader';
import SettingsSaveButton from './SettingsSaveButton';
import { useSettingsView } from './useSettingsView';

export default function SettingsPage() {
  const {
    activeTab, setActiveTab, isSaving, setIsSaving,
    saveSuccess, setSaveSuccess, showApiKey, setShowApiKey,
    siteName, setSiteName, siteEmail, setSiteEmail,
    sitePhone, setSitePhone, maintenanceMode, setMaintenanceMode,
    emailNotifications, setEmailNotifications,
    newUserNotif, setNewUserNotif, newConsultationNotif, setNewConsultationNotif,
    paymentNotif, setPaymentNotif, twoFactorAuth, setTwoFactorAuth,
    sessionTimeout, setSessionTimeout, passwordExpiry, setPasswordExpiry,
    moneyFusionApiKey, setMoneyFusionApiKey, paymentMethods, setPaymentMethods,
    maxUploadSize, setMaxUploadSize, backupFrequency, setBackupFrequency,
    logLevel, setLogLevel,
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

  return (
    <div className="bg-gray-50">
      <SettingsHeader />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex justify-end">
        <SettingsSaveButton isSaving={isSaving} saveSuccess={saveSuccess} onClick={handleSave} />
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-64 flex-shrink-0">
            <SettingsTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
              >
                {activeTab === 'general' && (
                  <SettingsGeneralTab
                    siteName={siteName}
                    setSiteName={setSiteName}
                    siteEmail={siteEmail}
                    setSiteEmail={setSiteEmail}
                    sitePhone={sitePhone}
                    setSitePhone={setSitePhone}
                    maintenanceMode={maintenanceMode}
                    setMaintenanceMode={setMaintenanceMode}
                  />
                )}
                {activeTab === 'notifications' && (
                  <SettingsNotificationsTab
                    emailNotifications={emailNotifications}
                    setEmailNotifications={setEmailNotifications}
                    newUserNotif={newUserNotif}
                    setNewUserNotif={setNewUserNotif}
                    newConsultationNotif={newConsultationNotif}
                    setNewConsultationNotif={setNewConsultationNotif}
                    paymentNotif={paymentNotif}
                    setPaymentNotif={setPaymentNotif}
                  />
                )}
                {activeTab === 'security' && (
                  <SettingsSecurityTab
                    twoFactorAuth={twoFactorAuth}
                    setTwoFactorAuth={setTwoFactorAuth}
                    sessionTimeout={sessionTimeout}
                    setSessionTimeout={setSessionTimeout}
                    passwordExpiry={passwordExpiry}
                    setPasswordExpiry={setPasswordExpiry}
                  />
                )}
                {activeTab === 'payment' && (
                  <SettingsPaymentTab
                    moneyFusionApiKey={moneyFusionApiKey}
                    setMoneyFusionApiKey={setMoneyFusionApiKey}
                    showApiKey={showApiKey}
                    setShowApiKey={setShowApiKey}
                    paymentMethods={paymentMethods}
                    setPaymentMethods={setPaymentMethods}
                  />
                )}
                {activeTab === 'system' && (
                  <SettingsSystemTab
                    maxUploadSize={maxUploadSize}
                    setMaxUploadSize={setMaxUploadSize}
                    backupFrequency={backupFrequency}
                    setBackupFrequency={setBackupFrequency}
                    logLevel={logLevel}
                    setLogLevel={setLogLevel}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}