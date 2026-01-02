import { motion } from 'framer-motion';
import { Loader2, Save, User, Phone, Globe, Shield } from 'lucide-react';
import { countries } from '@/components/auth/countries';
import React from 'react';

interface NewUserFormProps {
  formData: Partial<{
    name: string;
    email: string;
    phone: string;
    country: string;
    role: string;
  }>;
  errors: Partial<Record<'name' | 'email' | 'phone' | 'country' | 'role', string>>;
  saving: boolean;
  isFormValid: boolean;
  handleChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const roles = [
  { value: 'USER', label: 'Utilisateur' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
];

export function NewUserForm({ formData, errors, saving, isFormValid, handleChange, handleSubmit }: NewUserFormProps) {
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <User className="w-5 h-5 text-purple-500" /> Nouvel utilisateur
      </h2>
      <div>
        <label className="block text-sm font-medium mb-1">Nom</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => handleChange('name', e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-purple-400"
          required
        />
        {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-purple-400"
          required
        />
        {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Téléphone</label>
        <div className="flex gap-2">
          <input
            type="tel"
            value={formData.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-purple-400"
          />
        </div>
        {errors.phone && <div className="text-xs text-red-600 mt-1">{errors.phone}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Pays</label>
        <select
          value={formData.country}
          onChange={e => handleChange('country', e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-purple-400"
          required
        >
          <option value="">Sélectionner un pays</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.country && <div className="text-xs text-red-600 mt-1">{errors.country}</div>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rôle</label>
        <select
          value={formData.role}
          onChange={e => handleChange('role', e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-purple-400"
          required
        >
          {roles.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        {errors.role && <div className="text-xs text-red-600 mt-1">{errors.role}</div>}
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 rounded-lg shadow hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        disabled={saving || !isFormValid}
      >
        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {saving ? 'Création...' : 'Créer'}
      </button>
    </motion.form>
  );
}
