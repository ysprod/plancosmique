'use client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Bell,
  CheckCircle,
  CreditCard,
  Database,
  Eye, EyeOff,
  Globe,
  Loader,
  Lock,
  Save,
  Settings,
  Shield
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
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
  const [paymentMethods, setPaymentMethods] = useState({
    orangeMoney: true,
    mtnMoney: true,
    moovMoney: true,
    wave: false,
  });

  const [maxUploadSize, setMaxUploadSize] = useState('10');
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [logLevel, setLogLevel] = useState('error');

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
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'system', label: 'Système', icon: Database },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
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
          {/* Onglets - Version mobile/desktop */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Version mobile - Select */}
            <div className="lg:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}
                className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                           px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Version desktop - Tabs */}
            <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm 
                               rounded-lg transition-all mb-1 ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenu des onglets */}
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
                {/* Général */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Paramètres généraux
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom du site
                          </label>
                          <input
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email de contact
                          </label>
                          <input
                            type="email"
                            value={siteEmail}
                            onChange={(e) => setSiteEmail(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            value={sitePhone}
                            onChange={(e) => setSitePhone(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <label className="flex items-center justify-between cursor-pointer">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Mode maintenance</p>
                              <p className="text-xs text-gray-500">Désactiver temporairement le site</p>
                            </div>
                            <button
                              onClick={() => setMaintenanceMode(!maintenanceMode)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                         transition-colors ${maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                           transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                              />
                            </button>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-600" />
                        Notifications
                      </h2>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Notifications par email</p>
                            <p className="text-xs text-gray-500">Recevoir des alertes par email</p>
                          </div>
                          <button
                            onClick={() => setEmailNotifications(!emailNotifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                       transition-colors ${emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                         transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Nouvel utilisateur</p>
                            <p className="text-xs text-gray-500">Alert lors d'une inscription</p>
                          </div>
                          <button
                            onClick={() => setNewUserNotif(!newUserNotif)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                       transition-colors ${newUserNotif ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                         transition-transform ${newUserNotif ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Nouvelle consultation</p>
                            <p className="text-xs text-gray-500">Alert pour chaque commande</p>
                          </div>
                          <button
                            onClick={() => setNewConsultationNotif(!newConsultationNotif)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                       transition-colors ${newConsultationNotif ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                         transition-transform ${newConsultationNotif ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Paiements</p>
                            <p className="text-xs text-gray-500">Alert pour chaque transaction</p>
                          </div>
                          <button
                            onClick={() => setPaymentNotif(!paymentNotif)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                       transition-colors ${paymentNotif ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                         transition-transform ${paymentNotif ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sécurité */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        Sécurité
                      </h2>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Authentification 2FA</p>
                            <p className="text-xs text-gray-500">Double authentification requise</p>
                          </div>
                          <button
                            onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                       transition-colors ${twoFactorAuth ? 'bg-green-600' : 'bg-gray-200'
                              }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                         transition-transform ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Timeout de session (minutes)
                          </label>
                          <input
                            type="number"
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration mot de passe (jours)
                          </label>
                          <input
                            type="number"
                            value={passwordExpiry}
                            onChange={(e) => setPasswordExpiry(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paiement */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        Configuration paiement
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Clé API MoneyFusion
                          </label>
                          <div className="relative">
                            <input
                              type={showApiKey ? 'text' : 'password'}
                              value={moneyFusionApiKey}
                              onChange={(e) => setMoneyFusionApiKey(e.target.value)}
                              className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                         px-3 py-2 pr-10 rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 
                                         hover:text-gray-600"
                            >
                              {showApiKey ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm font-medium text-gray-900 mb-3">
                            Méthodes de paiement actives
                          </p>

                          <div className="space-y-3">
                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-sm text-gray-700">Orange Money</span>
                              <button
                                onClick={() => setPaymentMethods(prev => ({
                                  ...prev,
                                  orangeMoney: !prev.orangeMoney
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                           transition-colors ${paymentMethods.orangeMoney ? 'bg-orange-600' : 'bg-gray-200'
                                  }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                             transition-transform ${paymentMethods.orangeMoney ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                              </button>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-sm text-gray-700">MTN Money</span>
                              <button
                                onClick={() => setPaymentMethods(prev => ({
                                  ...prev,
                                  mtnMoney: !prev.mtnMoney
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                           transition-colors ${paymentMethods.mtnMoney ? 'bg-yellow-600' : 'bg-gray-200'
                                  }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                             transition-transform ${paymentMethods.mtnMoney ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                              </button>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-sm text-gray-700">Moov Money</span>
                              <button
                                onClick={() => setPaymentMethods(prev => ({
                                  ...prev,
                                  moovMoney: !prev.moovMoney
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                           transition-colors ${paymentMethods.moovMoney ? 'bg-blue-600' : 'bg-gray-200'
                                  }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                             transition-transform ${paymentMethods.moovMoney ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                              </button>
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                              <span className="text-sm text-gray-700">Wave</span>
                              <button
                                onClick={() => setPaymentMethods(prev => ({
                                  ...prev,
                                  wave: !prev.wave
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full 
                                           transition-colors ${paymentMethods.wave ? 'bg-pink-600' : 'bg-gray-200'
                                  }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white 
                                             transition-transform ${paymentMethods.wave ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                              </button>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Système */}
                {activeTab === 'system' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        Paramètres système
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Taille max upload (MB)
                          </label>
                          <input
                            type="number"
                            value={maxUploadSize}
                            onChange={(e) => setMaxUploadSize(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fréquence de sauvegarde
                          </label>
                          <select
                            value={backupFrequency}
                            onChange={(e) => setBackupFrequency(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          >
                            <option value="daily">Quotidienne</option>
                            <option value="weekly">Hebdomadaire</option>
                            <option value="monthly">Mensuelle</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Niveau de logs
                          </label>
                          <select
                            value={logLevel}
                            onChange={(e) => setLogLevel(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                       px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                          >
                            <option value="error">Erreurs uniquement</option>
                            <option value="warning">Avertissements</option>
                            <option value="info">Informations</option>
                            <option value="debug">Debug</option>
                          </select>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <button
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                                       bg-red-50 text-red-700 rounded-lg font-medium 
                                       hover:bg-red-100 transition-colors border border-red-200"
                          >
                            <AlertCircle className="w-4 h-4" />
                            Vider le cache
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
