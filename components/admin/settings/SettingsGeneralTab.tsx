'use client';

import React from 'react';
import { Globe } from 'lucide-react';

interface SettingsGeneralTabProps {
  siteName: string;
  setSiteName: (v: string) => void;
  siteEmail: string;
  setSiteEmail: (v: string) => void;
  sitePhone: string;
  setSitePhone: (v: string) => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (v: boolean) => void;
}

export default function SettingsGeneralTab({ siteName, setSiteName, siteEmail, setSiteEmail, sitePhone, setSitePhone, maintenanceMode, setMaintenanceMode }: SettingsGeneralTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Paramètres généraux
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du site</label>
            <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email de contact</label>
            <input type="email" value={siteEmail} onChange={e => setSiteEmail(e.target.value)} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" value={sitePhone} onChange={e => setSitePhone(e.target.value)} className="w-full bg-white border border-gray-300 text-sm text-gray-900 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-medium text-gray-900">Mode maintenance</p>
                <p className="text-xs text-gray-500">Désactiver temporairement le site</p>
              </div>
              <button onClick={() => setMaintenanceMode(!maintenanceMode)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-red-600' : 'bg-gray-200'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
