'use client';

import { Loader2, Save, CheckCircle, X, Shield, Star, User as UserIcon, Phone, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
 import { User } from '@/lib/interfaces';
import { Role } from '@/lib/interfaces';
import React from 'react';
import { countries } from '@/components/auth/countries';

interface EditUserFormProps {
  formData: Partial<User>;
  setFormData: (data: Partial<User>) => void;
  saving: boolean;
  success: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function EditUserForm({ formData, setFormData, saving, success, onSubmit }: EditUserFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={onSubmit}
      className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-violet-600" />
          Informations de base
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nom d'utilisateur *
            </label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              placeholder="Entrez le nom d'utilisateur"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Téléphone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
          </div>
          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Pays
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={formData.country || ''}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              >
                <option value="">Sélectionner un pays</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Genre
            </label>
            <select
              value={formData.gender || ''}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' | undefined })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            >
              <option value="">Non spécifié</option>
              <option value="male">Masculin</option>
              <option value="female">Féminin</option>
            </select>
          </div>
        </div>
        {/* Premium */}
        <div>
          <label className="inline-flex items-center mt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!formData.premium}
              onChange={e => setFormData({ ...formData, premium: e.target.checked })}
              className="form-checkbox h-5 w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
            />
            <span className="ml-2 text-sm text-yellow-700 font-semibold flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> Premium
            </span>
          </label>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-600" />
          Rôle et permissions
        </h2>
        <div className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Rôle
            </label>
            <select
              value={formData.role || Role.USER}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            >
              <option value="USER">Utilisateur</option>
              <option value="ADMIN">Administrateur</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <Link
          href="/admin/users"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
          Annuler
        </Link>
        <button
          type="submit"
          disabled={saving || success}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enregistrement...
            </>
          ) : success ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Enregistré
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
