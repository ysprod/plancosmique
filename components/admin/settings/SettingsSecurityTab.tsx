import React from 'react';
import { Shield } from 'lucide-react';

interface SettingsSecurityTabProps {
  twoFactorAuth: boolean;
  setTwoFactorAuth: (v: boolean) => void;
  sessionTimeout: string;
  setSessionTimeout: (v: string) => void;
  passwordExpiry: string;
  setPasswordExpiry: (v: string) => void;
}

export default function SettingsSecurityTab({ twoFactorAuth, setTwoFactorAuth, sessionTimeout, setSessionTimeout, passwordExpiry, setPasswordExpiry }: SettingsSecurityTabProps) {
  return (
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
            <button onClick={() => setTwoFactorAuth(!twoFactorAuth)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorAuth ? 'bg-green-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeout de session (minutes)</label>
            <input type="number" value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiration mot de passe (jours)</label>
            <input type="number" value={passwordExpiry} onChange={e => setPasswordExpiry(e.target.value)} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
