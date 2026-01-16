'use client';
import { NumerologyFormData } from '@/hooks/numerologie/useNumerologyForm';
import { Calculator, Calendar, Loader2, Sparkles, User } from 'lucide-react';

interface NumerologyFormProps {
  formData: NumerologyFormData;
  setFormData: (data: NumerologyFormData) => void;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

export function NumerologyForm({ formData, setFormData, loading, error, onSubmit }: NumerologyFormProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-amber-600" />
        <h2 className="text-2xl font-bold text-gray-900">Calculez votre profil numérologique</h2>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4" />
            Prénom
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
            placeholder="Votre prénom"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4" />
            Nom
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
            placeholder="Votre nom"
            required
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            Date de naissance
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
            required
          />
        </div>
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Calcul en cours...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Découvrir mon profil
            </>
          )}
        </button>
      </form>
    </div>
  );
}
