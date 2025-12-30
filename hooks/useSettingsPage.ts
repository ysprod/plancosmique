import { useState } from 'react';

export default function useSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'payment' | 'system'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [siteName, setSiteName] = useState('Mon Étoile');
  const [siteEmail, setSiteEmail] = useState('contact@monetoile.com');
  const [sitePhone, setSitePhone] = useState('+225 07 00 00 00 00');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [newUserNotif, setNewUserNotif] = useState(true);
  const [newConsultationNotif, setNewConsultationNotif] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordExpiry, setPasswordExpiry] = useState('90');
  const [moneyFusionApiKey, setMoneyFusionApiKey] = useState('mf_test_xxxxxxxxxxxxx');
  const [paymentMethods, setPaymentMethods] = useState({ orangeMoney: true, mtnMoney: true, moovMoney: true, wave: false });
  const [maxUploadSize, setMaxUploadSize] = useState('10');
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [logLevel, setLogLevel] = useState('error');

  return {
    activeTab, setActiveTab,
    isSaving, setIsSaving,
    saveSuccess, setSaveSuccess,
    showApiKey, setShowApiKey,
    siteName, setSiteName,
    siteEmail, setSiteEmail,
    sitePhone, setSitePhone,
    maintenanceMode, setMaintenanceMode,
    emailNotifications, setEmailNotifications,
    newUserNotif, setNewUserNotif,
    newConsultationNotif, setNewConsultationNotif,
    paymentNotif, setPaymentNotif,
    twoFactorAuth, setTwoFactorAuth,
    sessionTimeout, setSessionTimeout,
    passwordExpiry, setPasswordExpiry,
    moneyFusionApiKey, setMoneyFusionApiKey,
    paymentMethods, setPaymentMethods,
    maxUploadSize, setMaxUploadSize,
    backupFrequency, setBackupFrequency,
    logLevel, setLogLevel,
  };
}
