'use client';

import { countries } from '@/components/auth/countries';
import { api } from '@/lib/api/client';
import { UserData } from '@/lib/interfaces';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Globe,
  Loader2,
  Mail,
  Phone,
  Save,
  Shield,
  User,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo, memo } from 'react';

// =====================================================
// TYPES
// =====================================================
type Gender = 'M' | 'F' | 'Other';
type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

interface FormErrors {
  username?: string;
  email?: string;
  phone?: string;
}

// =====================================================
// CONSTANTS
// =====================================================
const ROLE_OPTIONS: { value: Role; label: string; description: string }[] = [
  { value: 'USER', label: 'Utilisateur', description: 'Accès standard' },
  { value: 'ADMIN', label: 'Administrateur', description: 'Gestion de contenu' },
  { value: 'SUPER_ADMIN', label: 'Super Admin', description: 'Accès complet' }
];

const GENDER_OPTIONS: { value: Gender; label: string; icon: string }[] = [
  { value: 'M', label: 'Masculin', icon: '👨' },
  { value: 'F', label: 'Féminin', icon: '👩' },
  { value: 'Other', label: 'Autre', icon: '🧑' }
];

// =====================================================
// VALIDATION
// =====================================================
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^\+?[\d\s-()]+$/.test(phone);
};

// =====================================================
// TOAST NOTIFICATION
// =====================================================
const Toast = memo(({ 
  type, 
  message, 
  onClose 
}: { 
  type: 'success' | 'error'; 
  message: string; 
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl shadow-2xl border
              ${type === 'success' 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              }`}
  >
    <div className="flex items-start gap-3">
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${
          type === 'success' ? 'text-green-900' : 'text-red-900'
        }`}>
          {type === 'success' ? 'Succès' : 'Erreur'}
        </p>
        <p className={`text-xs mt-0.5 ${
          type === 'success' ? 'text-green-700' : 'text-red-700'
        }`}>
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className={`p-1 rounded-lg transition-colors ${
          type === 'success' 
            ? 'hover:bg-green-100 text-green-600' 
            : 'hover:bg-red-100 text-red-600'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
));
Toast.displayName = 'Toast';

// =====================================================
// INPUT FIELD COMPONENT
// =====================================================
const InputField = memo(({
  label,
  icon: Icon,
  error,
  required = false,
  ...props
}: {
  label: string;
  icon?: any;
  error?: string;
  required?: boolean;
  [key: string]: any;
}) => (
  <div>
    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
      )}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-10 pr-4' : 'px-4'} py-2 sm:py-2.5 
                 border rounded-xl text-sm sm:text-base
                 focus:ring-2 focus:border-transparent transition-all
                 ${error 
                   ? 'border-red-300 focus:ring-red-500' 
                   : 'border-slate-300 dark:border-slate-600 focus:ring-violet-500'
                 }
                 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-xs text-red-600 mt-1 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
));
InputField.displayName = 'InputField';

// =====================================================
// SELECT FIELD COMPONENT
// =====================================================
const SelectField = memo(({
  label,
  icon: Icon,
  required = false,
  children,
  ...props
}: {
  label: string;
  icon?: any;
  required?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <div>
    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
      )}
      <select
        {...props}
        className={`w-full ${Icon ? 'pl-10 pr-4' : 'px-4'} py-2 sm:py-2.5 
                 border border-slate-300 dark:border-slate-600 rounded-xl text-sm sm:text-base
                 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all
                 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                 appearance-none cursor-pointer`}
      >
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
));
SelectField.displayName = 'SelectField';

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function NewUserPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

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

  // Validation en temps réel
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handlers mémorisés
  const handleChange = useCallback((field: keyof UserData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ type: 'error', message: 'Veuillez corriger les erreurs' });
      return;
    }

    setSaving(true);
    try {
      await api.post('/admin/users', formData);
      setToast({ type: 'success', message: 'Utilisateur créé avec succès' });
      setTimeout(() => {
        router.push('/admin/users');
      }, 1500);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setToast({ 
        type: 'error', 
        message: error.response?.data?.message || 'Erreur lors de la création' 
      });
    } finally {
      setSaving(false);
    }
  }, [formData, validateForm, router]);

  // Vérification si le formulaire est valide
  const isFormValid = useMemo(() => {
    return formData.username &&
           (!formData.phone || validatePhone(formData.phone));
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 
                  dark:from-slate-900 dark:via-violet-900/20 dark:to-purple-900/20 
                  p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6"
        >
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 
                     dark:text-slate-400 dark:hover:text-slate-100 mb-3 sm:mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>

          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-violet-600 to-purple-600 
                          rounded-xl shadow-lg">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                Nouvel utilisateur
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Créez un compte utilisateur
              </p>
            </div>
          </div>
        </motion.div>

        {/* Toast Notifications */}
        <AnimatePresence>
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border 
                   border-slate-200 dark:border-slate-800 p-4 sm:p-6 space-y-6"
        >
          {/* Section: Informations de base */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 
                         flex items-center gap-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              Informations de base
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <InputField
                label="Nom d'utilisateur"
                icon={User}
                type="text"
                value={formData.username || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleChange('username', e.target.value)
                }
                error={errors.username}
                required
                placeholder="johnsmith"
                autoComplete="username"
              />

              <InputField
                label="Téléphone"
                icon={Phone}
                type="tel"
                value={formData.phone || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleChange('phone', e.target.value)
                }
                error={errors.phone}
                placeholder="+33 6 12 34 56 78"
                autoComplete="tel"
              />

              <SelectField
                label="Pays"
                icon={Globe}
                value={formData.country || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                  handleChange('country', e.target.value)
                }
              >
                <option value="">Sélectionner</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </SelectField>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Genre
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GENDER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('gender', option.value)}
                      className={`p-2 sm:p-3 rounded-xl border-2 transition-all text-xs sm:text-sm font-semibold
                               ${formData.gender === option.value
                                 ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                                 : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                               }`}
                    >
                      <div className="text-lg sm:text-xl mb-1">{option.icon}</div>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Rôle et permissions */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 
                         flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              Rôle et permissions
            </h2>

            <div className="space-y-2">
              {ROLE_OPTIONS.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleChange('role', option.value)}
                  className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all text-left
                           ${formData.role === option.value
                             ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                             : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                           }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {option.label}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {option.description}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                  ${formData.role === option.value
                                    ? 'border-violet-500 bg-violet-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                  }`}>
                      {formData.role === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin/users"
              className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 
                       bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 
                       rounded-xl text-sm sm:text-base font-bold
                       hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              Annuler
            </Link>

            <motion.button
              type="submit"
              disabled={saving || !isFormValid}
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
              className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 
                       bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl 
                       text-sm sm:text-base font-bold
                       hover:from-violet-700 hover:to-purple-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all
                       shadow-lg shadow-violet-500/30"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  Créer l'utilisateur
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
