'use client';
import { countries } from '@/components/auth/countries';
import { api } from '@/lib/api/client';
import { UserData } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Globe,
  Loader2,
  Phone,
  Save,
  Shield,
  Star,
  User,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<Partial<UserData>>({
    username: '',
    phone: '',
    country: '',
    gender: 'Other',
    role: 'USER',
    isActive: true,
    emailVerified: false,
    credits: 0,
    preferences: {
      notifications: true,
      newsletter: false,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/admin/users/${userId}`);
        setFormData(data);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.patch(`/admin/users/${userId}`, formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/users');
      }, 1500);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement de l'utilisateur...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux utilisateurs
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <User className="w-8 h-8 text-violet-600" />
            Modifier l'utilisateur
          </h1>
          <p className="text-slate-600 mt-2">
            Modifiez les informations de l'utilisateur
          </p>
        </motion.div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-900 font-semibold">Modifications enregistrées</p>
              <p className="text-green-700 text-sm">Redirection en cours...</p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div className="flex-1">
              <p className="text-red-900 font-semibold">Erreur</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 space-y-6"
        >
          {/* Informations de base */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-violet-600" />
              Informations de base
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nom d'utilisateur *
                </label>
                <input
                  type="text"
                  value={formData.username || ''}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 
                           focus:ring-violet-500 focus:border-transparent transition-all"
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
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg 
                             focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
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
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg 
                             focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
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
                  value={formData.gender || 'Other'}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'M' | 'F' | 'Other' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg 
                           focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
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
                  value={formData.role || 'USER'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as 'USER' | 'ADMIN' | 'SUPER_ADMIN' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg 
                           focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                >
                  <option value="USER">Utilisateur</option>
                  <option value="ADMIN">Administrateur</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>              
            </div>
          </div>         

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Link
              href="/admin/users"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                       bg-slate-100 text-slate-700 rounded-xl font-semibold 
                       hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
              Annuler
            </Link>

            <button
              type="submit"
              disabled={saving || success}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl 
                       font-semibold hover:from-violet-700 hover:to-purple-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
      </div>
    </div>
  );
}