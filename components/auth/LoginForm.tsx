/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, memo, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

// Types

interface FormData {
  username: string;
  password: string;
}


interface FormErrors {
  username?: string;
  password?: string;
}

// Validation
const MIN_PASSWORD_LENGTH = 6;

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.username) errors.username = 'Nom d’utilisateur requis';
  if (!data.password) errors.password = 'Mot de passe requis';
  else if (data.password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Au moins ${MIN_PASSWORD_LENGTH} caractères`;

  return errors;
};

// ErrorAlert
const ErrorAlert = memo(({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
  >
    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
    <p className="text-red-700 text-sm">{message}</p>
  </motion.div>
));
ErrorAlert.displayName = 'ErrorAlert';

// InputField
const InputField = memo((props: any) => {
  const {
    label, name, type, value, error, placeholder,
    icon: Icon, showPasswordToggle, showPassword,
    onTogglePassword, onChange
  } = props;

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-12 ${showPasswordToggle ? 'pr-12' : 'pr-4'} py-3 border-2 rounded-xl transition-colors ${
            error
              ? 'border-red-300 focus:border-red-500'
              : 'border-slate-200 focus:border-violet-500'
          }`}
          autoComplete={name === 'email' ? 'email' : 'current-password'}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
});
InputField.displayName = 'InputField';

// Main component
const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔥 Sécurisation + stabilisation de returnTo
  const returnTo = useMemo(() => {
    const param = searchParams.get('returnTo');
    if (!param) return null;
    if (!param.startsWith('/')) return null; // sécurité anti open redirect
    return param;
  }, [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Efface l'erreur du champ modifié
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    setError(null);
  }, [errors]);

  const togglePassword = () => setShowPassword((s) => !s);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(formData);

      // 🔥 La redirection se fait APRÈS le login réussi
      // Utiliser setTimeout pour laisser le state se mettre à jour
      setTimeout(() => {
        router.push(returnTo || '/protected/profil');
      }, 50);

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Email ou mot de passe incorrect'
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-200"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Connexion</h2>
        <p className="text-slate-600">Accédez à votre espace personnel</p>
      </div>

      {error && <ErrorAlert message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <InputField
          label="Nom d'utilisateur"
          name="username"
          type="text"
          value={formData.username}
          error={errors.username}
          placeholder="Votre nom d'utilisateur"
          icon={Mail}
          onChange={handleChange}
        />

        <InputField
          label="Mot de passe"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          error={errors.password}
          placeholder="••••••••"
          icon={Lock}
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={togglePassword}
          onChange={handleChange}
        />

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </motion.button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-600">
          Pas encore de compte ?{' '}
          <Link
            href="/auth/register"
            className="text-violet-600 font-semibold"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
