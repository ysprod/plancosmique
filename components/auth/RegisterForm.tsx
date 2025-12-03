/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuth } from '@/lib/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Phone,
  Shield,
  User,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { countries } from './countries';

// Types
interface FormData {
  username: string;
  gender: string;
  country: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

// Constantes
const PASSWORD_MIN_LENGTH = 8;

const GENDER_OPTIONS = [
  { value: '', label: 'Sélectionner' },
  { value: 'Homme', label: 'Homme' },
  { value: 'Femme', label: 'Femme' },
  { value: 'Autre', label: 'Autre' },
] as const;

const PASSWORD_STRENGTH_CONFIG = {
  0: { color: 'bg-gray-200', text: '', textColor: '' },
  1: { color: 'bg-red-500', text: 'Faible', textColor: 'text-red-600' },
  2: { color: 'bg-orange-500', text: 'Moyen', textColor: 'text-orange-600' },
  3: { color: 'bg-yellow-500', text: 'Bon', textColor: 'text-yellow-600' },
  4: { color: 'bg-green-500', text: 'Excellent', textColor: 'text-green-600' },
} as const;

// Utilitaires
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= PASSWORD_MIN_LENGTH) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength;
};

const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.username.trim()) {
    errors.username = 'Nom d\'utilisateur requis';
  }

  if (!formData.gender) {
    errors.gender = 'Genre requis';
  }

  if (!formData.country) {
    errors.country = 'Pays requis';
  }

  if (!formData.phone.trim()) {
    errors.phone = 'Numéro de téléphone requis';
  }

  if (!formData.password) {
    errors.password = 'Mot de passe requis';
  } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Au moins ${PASSWORD_MIN_LENGTH} caractères`;
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Confirmation requise';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  return errors;
};

// Composants
const ErrorMessage: React.FC<{ error: string; onClose: () => void }> = ({ error, onClose }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
  >
    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
      <AlertCircle className="w-4 h-4 text-white" />
    </div>
    <p className="flex-1 text-red-700 text-sm font-medium whitespace-pre-line">{error}</p>
    <button onClick={onClose} className="text-red-500 hover:text-red-700 transition-colors">
      <X className="w-5 h-5" />
    </button>
  </motion.div>
);

const PasswordStrengthIndicator: React.FC<{ strength: number }> = ({ strength }) => {
  const config = PASSWORD_STRENGTH_CONFIG[strength as keyof typeof PASSWORD_STRENGTH_CONFIG];

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600">Force</span>
        <span className={`text-xs font-bold ${config.textColor}`}>
          {config.text}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-all ${level <= strength ? config.color : 'bg-gray-200'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  showSuccess?: boolean;
}> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  icon,
  showPassword,
  onTogglePassword,
  showSuccess,
}) => (
    <div className="group">
      <label className="block text-sm font-bold text-gray-900 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} ${onTogglePassword ? 'pr-12' : 'pr-4'
            } py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
              : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
            }`}
          placeholder={placeholder}
        />
        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {showSuccess && !error && value && (
          <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm mt-1 flex items-center gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  );

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: readonly { value: string; label: string }[] | string[];
}> = ({ label, name, value, onChange, error, options }) => (
  <div className="group">
    <label className="block text-sm font-bold text-gray-900 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full py-3.5 px-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${error
          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
          : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
        }`}
    >
      {options.map((opt) =>
        typeof opt === 'string' ? (
          <option key={opt} value={opt}>
            {opt || 'Sélectionner'}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-600 text-sm mt-1 flex items-center gap-1"
      >
        <AlertCircle className="w-4 h-4" />
        {error}
      </motion.p>
    )}
  </div>
);

// Composant principal
export const RegisterForm: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    gender: '',
    country: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'password') {
        setPasswordStrength(calculatePasswordStrength(value));
      }

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }

      setError(null);
    },
    [errors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const { ...registerData } = formData;
        await register(registerData);
      } catch (err: any) {
        let errorMessage = err.response?.data?.message || "Erreur lors de l'inscription";

        if (err.response?.data?.errors) {
          const details = Object.entries(err.response.data.errors)
            .map(([field, msg]) => `• ${field} : ${msg}`)
            .join('\n');
          errorMessage += '\n' + details;
        }

        setError(errorMessage);
      }
    },
    [formData, register]
  );

  const countryOptions = useMemo(() => ['', ...countries], []);

  const passwordsMatch = useMemo(
    () => formData.password === formData.confirmPassword && formData.confirmPassword !== '',
    [formData.password, formData.confirmPassword]
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="relative bg-white px-8 py-12 text-center border-b border-gray-200">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative z-10 mb-6"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-lg mb-4 border border-gray-200">
                <div className="relative w-16 h-16">
                  <Image
                    src="/logo.png"
                    alt="Logo Mon Etoile"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>

              <h1 className="text-4xl font-black text-black mb-2">MON ÉTOILE</h1>
              <p className="text-gray-600 text-lg font-medium">
                Créez votre compte en toute confidentialité
                <br />
                <span className="text-sm text-gray-500">
                  Vous pouvez demander une consultation pour vous ou un tiers. L'analyse sera basée
                  uniquement sur les informations fournies.
                </span>
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="p-8">
            <AnimatePresence>
              {error && <ErrorMessage error={error} onClose={() => setError(null)} />}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Nom d'utilisateur"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="Nom d'utilisateur unique"
                icon={<User className="w-5 h-5" />}
                showSuccess
              />

              <SelectField
                label="Genre"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={errors.gender}
                options={GENDER_OPTIONS}
              />

              <SelectField
                label="Pays"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
                options={countryOptions}
              />

              <InputField
                label="Numéro de téléphone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="07XXXXXXXX"
                icon={<Phone className="w-5 h-5" />}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <InputField
                    label="Mot de passe"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                  />
                  {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}
                </div>

                <InputField
                  label="Confirmer"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="••••••••"
                  icon={<Lock className="w-5 h-5" />}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  showSuccess={passwordsMatch}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6" />
                    S'inscrire maintenant
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte ?{' '}
                <Link
                  href="/auth/login"
                  className="text-gray-900 hover:text-amber-600 font-bold transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Vos données sont sécurisées et cryptées</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>© 2025 Mon Étoile. Tous droits réservés.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
