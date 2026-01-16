'use client';

import React from 'react';
import { Bell } from 'lucide-react';

interface SettingsNotificationsTabProps {
  emailNotifications: boolean;
  setEmailNotifications: (v: boolean) => void;
  newUserNotif: boolean;
  setNewUserNotif: (v: boolean) => void;
  newConsultationNotif: boolean;
  setNewConsultationNotif: (v: boolean) => void;
  paymentNotif: boolean;
  setPaymentNotif: (v: boolean) => void;
}

export default function SettingsNotificationsTab({ emailNotifications, setEmailNotifications, newUserNotif, setNewUserNotif, newConsultationNotif, setNewConsultationNotif, paymentNotif, setPaymentNotif }: SettingsNotificationsTabProps) {
  return (
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
            <button onClick={() => setEmailNotifications(!emailNotifications)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Nouvel utilisateur</p>
              <p className="text-xs text-gray-500">Alert lors d'une inscription</p>
            </div>
            <button onClick={() => setNewUserNotif(!newUserNotif)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${newUserNotif ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${newUserNotif ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Nouvelle consultation</p>
              <p className="text-xs text-gray-500">Alert pour chaque commande</p>
            </div>
            <button onClick={() => setNewConsultationNotif(!newConsultationNotif)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${newConsultationNotif ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${newConsultationNotif ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Paiements</p>
              <p className="text-xs text-gray-500">Alert pour chaque transaction</p>
            </div>
            <button onClick={() => setPaymentNotif(!paymentNotif)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${paymentNotif ? 'bg-blue-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${paymentNotif ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
