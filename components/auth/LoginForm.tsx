/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAuth } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { AlertCircle, Eye, EyeOff, Loader2, Lock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { memo, useCallback, useMemo, useState, useTransition } from 'react';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const MIN_PASSWORD_LENGTH = 6;

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.username.trim()) {
    errors.username = 'Nom d\'utilisateur requis';
  }
  
  if (!data.password) {
    errors.password = 'Mot de passe requis';
  } else if (data.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Au moins ${MIN_PASSWORD_LENGTH} caractères`;
  }

  return errors;
};
 
const ErrorAlert = memo(({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
               rounded-xl flex items-start gap-2"
  >
    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <p className="text-red-700 dark:text-red-300 text-xs leading-relaxed">{message}</p>
  </motion.div>
));
ErrorAlert.displayName = 'ErrorAlert';

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  error?: string;
  placeholder: string;
  icon: React.ElementType;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = memo<InputFieldProps>(({
  label,
  name,
  type,
  value,
  error,
  placeholder,
  icon: Icon,
  showPasswordToggle,
  showPassword,
  onTogglePassword,
  onChange
}) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full pl-10 ${showPasswordToggle ? 'pr-10' : 'pr-4'} py-2.5 
            text-sm
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
          autoComplete={name === 'username' ? 'username' : 'current-password'}
        />

        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                     text-gray-400 dark:text-gray-500 
                     hover:text-gray-600 dark:hover:text-gray-300
                     transition-colors p-1"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 dark:text-red-400 text-xs mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});
InputField.displayName = 'InputField';

 
const LogoHeader = memo(() => (
  <Link 
    href="/"
    className="block mb-6 group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <div className="relative w-24 h-24 rounded-2xl overflow-hidden                     
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

// =====================================================
// COMPOSANT PRINCIPAL
// =====================================================
const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Sécurisation returnTo (memoïsé pour éviter recalcul)
  const returnTo = useMemo(() => {
    const param = searchParams.get('returnTo');
    if (!param || !param.startsWith('/')) return '/secured/profil';
    return param;
  }, [searchParams]);

  // States locaux
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Synchronise le state avec les valeurs auto-remplies au montage
  React.useEffect(() => {
    const usernameInput = document.querySelector<HTMLInputElement>('input[name="username"]');
    const passwordInput = document.querySelector<HTMLInputElement>('input[name="password"]');
    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;
      // Si le navigateur a auto-rempli, on met à jour le state
      if (username || password) {
        setFormData((prev) => ({
          ...prev,
          username,
          password,
        }));
      }
    }
  }, []);

  // Handlers memoïsés
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Efface l'erreur du champ modifié
    setErrors((prev) => {
      if (!prev[name as keyof FormErrors]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormErrors];
      return newErrors;
    });

    setError(null);
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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

      // Redirection avec transition
      startTransition(() => {
        router.push(returnTo);
      });

    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Nom d\'utilisateur ou mot de passe incorrect'
      );
    }
  }, [formData, login, returnTo, router]);

  // Calculer si le bouton doit être désactivé
  const isSubmitDisabled = useMemo(() => {
    return isLoading || isPending || !formData.username.trim() || !formData.password;
  }, [isLoading, isPending, formData.username, formData.password]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 
                  bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                      rounded-3xl shadow-2xl p-6 sm:p-8 
                      border border-gray-200 dark:border-gray-800">
          
          {/* Logo cliquable vers accueil */}
          <LogoHeader />

          {/* Titre */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Connexion
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Accédez à votre espace personnel
            </p>
          </div>

          {/* Erreur globale */}
          {error && <ErrorAlert message={error} />}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <InputField
              label="Nom Utilisateur"
              name="username"
              type="text"
              value={formData.username}
              error={errors.username}
              placeholder="Votre nom d\'utilisateur"
              icon={User}
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
              disabled={isSubmitDisabled}
              className={`
                w-full py-3 rounded-xl font-semibold text-sm
                shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2
                transition-all duration-200
                ${isSubmitDisabled
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                }
              `}
              whileHover={{ scale: isSubmitDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
            >
              {isLoading || isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                'Se connecter'
              )}
            </motion.button>
          </form>

          {/* Lien inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pas encore de compte ?{' '}
              <Link
                href="/auth/register"
                className="text-purple-600 dark:text-purple-400 font-semibold 
                         hover:underline transition-colors"
              >
                Inscription
              </Link>
            </p>
          </div>
        </div>

        {/* Footer discret */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6 text-xs text-gray-500 dark:text-gray-600"
        >
          En vous connectant, vous acceptez nos{' '}
          <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-400">
            conditions 
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default memo(LoginForm);
