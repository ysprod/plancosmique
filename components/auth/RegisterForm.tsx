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
import React, { memo, useCallback, useMemo, useState, useTransition } from 'react';
import { countries } from './countries';

 
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

// =====================================================
// CONSTANTES
// =====================================================
const PASSWORD_MIN_LENGTH = 8;

const GENDER_OPTIONS = [
  { value: '', label: 'Sélectionner' },
  { value: 'Homme', label: 'Homme' },
  { value: 'Femme', label: 'Femme' },
] as const;

const PASSWORD_STRENGTH_CONFIG = {
  0: { color: 'bg-gray-200', text: '', textColor: '' },
  1: { color: 'bg-red-500', text: 'Faible', textColor: 'text-red-600' },
  2: { color: 'bg-orange-500', text: 'Moyen', textColor: 'text-orange-600' },
  3: { color: 'bg-yellow-500', text: 'Bon', textColor: 'text-yellow-600' },
  4: { color: 'bg-green-500', text: 'Excellent', textColor: 'text-green-600' },
} as const;

// =====================================================
// UTILITAIRES
// =====================================================
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

// =====================================================
// SOUS-COMPOSANTS MEMOÏSÉS
// =====================================================
const LogoHeader = memo(() => (
  <Link
    href="/"
    className="block mb-4 group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden 
                    shadow-lg group-hover:shadow-xl transition-shadow">
        <Image
          src="/logo.png"
          alt="Mon Étoile Logo"
          fill
          className="object-contain p-3"
          priority
        />
      </div>
    </motion.div>
  </Link>
));
LogoHeader.displayName = 'LogoHeader';

interface ErrorMessageProps {
  error: string;
  onClose: () => void;
}

const ErrorMessage = memo<ErrorMessageProps>(({ error, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
               rounded-xl flex items-start gap-2"
  >
    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <p className="flex-1 text-red-700 dark:text-red-300 text-xs leading-relaxed whitespace-pre-line">
      {error}
    </p>
    <button
      onClick={onClose}
      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 
                 transition-colors p-0.5"
    >
      <X className="w-4 h-4" />
    </button>
  </motion.div>
));
ErrorMessage.displayName = 'ErrorMessage';

interface PasswordStrengthIndicatorProps {
  strength: number;
}

const PasswordStrengthIndicator = memo<PasswordStrengthIndicatorProps>(({ strength }) => {
  const config = PASSWORD_STRENGTH_CONFIG[strength as keyof typeof PASSWORD_STRENGTH_CONFIG];

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Force</span>
        <span className={`text-[10px] font-bold ${config.textColor}`}>
          {config.text}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all ${level <= strength ? config.color : 'bg-gray-200 dark:bg-gray-700'
              }`}
          />
        ))}
      </div>
    </div>
  );
});
PasswordStrengthIndicator.displayName = 'PasswordStrengthIndicator';

interface InputFieldProps {
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
}

const InputField = memo<InputFieldProps>(({
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
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full ${icon ? 'pl-10' : 'pl-4'} ${onTogglePassword || showSuccess ? 'pr-10' : 'pr-4'} 
          py-2.5 text-sm
          border-2 rounded-xl 
          bg-white dark:bg-gray-800
          transition-all duration-200
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          ${error
            ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500'
            : 'border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500'
          }
          focus:outline-none focus:ring-2 focus:ring-purple-500/20
        `}
        placeholder={placeholder}
      />
      {onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 
                   text-gray-400 dark:text-gray-500 
                   hover:text-gray-600 dark:hover:text-gray-300 
                   transition-colors p-1"
          aria-label={showPassword ? 'Masquer' : 'Afficher'}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
      {showSuccess && !error && value && (
        <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
      )}
    </div>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-600 dark:text-red-400 text-xs flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3" />
        {error}
      </motion.p>
    )}
  </div>
));
InputField.displayName = 'InputField';

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: readonly { value: string; label: string }[] | string[];
}

const SelectField = memo<SelectFieldProps>(({ label, name, value, onChange, error, options }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`
        w-full py-2.5 px-4 text-sm
        border-2 rounded-xl 
        bg-white dark:bg-gray-800
        transition-all duration-200
        ${error
          ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500'
          : 'border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500'
        }
        focus:outline-none focus:ring-2 focus:ring-purple-500/20
      `}
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
        className="text-red-600 dark:text-red-400 text-xs flex items-center gap-1"
      >
        <AlertCircle className="w-3 h-3" />
        {error}
      </motion.p>
    )}
  </div>
));
SelectField.displayName = 'SelectField';

// =====================================================
// COMPOSANT PRINCIPAL
// =====================================================
export const RegisterForm: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [isPending, startTransition] = useTransition();

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

      setErrors((prev) => {
        if (!prev[name]) return prev;
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });

      setError(null);
    },
    []
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
        await register(formData);
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

  const isSubmitDisabled = useMemo(() => {
    return isLoading || isPending;
  }, [isLoading, isPending]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 
                  bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                      rounded-3xl shadow-2xl p-6 sm:p-8 
                      border border-gray-200 dark:border-gray-800">

          {/* Logo + Header */}
          <div className="text-center mb-6">
            <LogoHeader />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Créer un compte
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Créez votre compte en toute confidentialité. Vous pouvez demander une consultation
              pour vous ou un tiers.
            </p>
          </div>

          {/* Erreur globale */}
          <AnimatePresence>
            {error && <ErrorMessage error={error} onClose={() => setError(null)} />}
          </AnimatePresence>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <InputField
              label="Nom d'utilisateur"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              placeholder="Nom d'utilisateur unique"
              icon={<User className="w-4 h-4" />}
              showSuccess
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <InputField
              label="Numéro de téléphone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="07XXXXXXXX"
              icon={<Phone className="w-4 h-4" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  label="Mot de passe"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
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
                icon={<Lock className="w-4 h-4" />}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                showSuccess={passwordsMatch}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitDisabled}
              whileHover={{ scale: isSubmitDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
              className={`
                w-full py-3 rounded-xl font-semibold text-sm
                shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2
                transition-all duration-200
                ${isSubmitDisabled
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                }
              `}
            >
              {isLoading || isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Inscription...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>S'inscrire maintenant</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Déjà inscrit ?{' '}
                <Link
                  href="/auth/login"
                  className="text-purple-600 dark:text-purple-400 font-semibold 
                           hover:underline transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-600 text-xs">
              <Shield className="w-3 h-3" />
              <span>Données sécurisées et cryptées</span>
            </div>
          </div>
        </div>

        {/* Footer discret */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-xs text-gray-500 dark:text-gray-600"
        >
          © 2025 Mon Étoile. Tous droits réservés.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default memo(RegisterForm);
