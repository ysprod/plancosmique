'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader, CheckCircle, Save, Settings, Bell, Lock, CreditCard, Database } from 'lucide-react';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';
import SettingsGeneralTab from '@/components/admin/settings/SettingsGeneralTab';
import SettingsNotificationsTab from '@/components/admin/settings/SettingsNotificationsTab';
import SettingsSecurityTab from '@/components/admin/settings/SettingsSecurityTab';
import SettingsPaymentTab from '@/components/admin/settings/SettingsPaymentTab';
import SettingsSystemTab from '@/components/admin/settings/SettingsSystemTab';
import useSettingsPage from '@/hooks/useSettingsPage';

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
  } = useSettingsPage();

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
    <div className=" bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-100 rounded-lg">
                <Settings className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Paramètres
                </h1>
                <p className="text-xs text-gray-500">Configuration système</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm rounded-lg 
                         font-semibold transition-all ${isSaving
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : saveSuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                }`}
            >
              {isSaving ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Enregistrement...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Enregistré !</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Enregistrer</span>
                </>
              )}
            </button>
          </div>
        </div>
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