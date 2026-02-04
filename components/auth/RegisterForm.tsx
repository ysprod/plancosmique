'use client';
import { useRegisterForm } from '@/hooks/auth/useRegisterForm';
import { Loader2, Lock, Shield, User } from 'lucide-react';
import Link from 'next/link';
import React, { memo, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import RegisterErrorMessage from './RegisterErrorMessage';
import RegisterInputField from './RegisterInputField';
import RegisterLogoHeader from './RegisterLogoHeader';
import RegisterPasswordStrengthIndicator from './RegisterPasswordStrengthIndicator';

const RegisterForm: React.FC = () => {
  const {
    showPassword, showConfirmPassword, isSubmitDisabled, isLoading, isPending,
    error, passwordStrength, formData, errors, passwordsMatch,
    handleChange, handleSubmit, setShowConfirmPassword, setShowPassword, setError,
  } = useRegisterForm();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:scale-110 transition-transform"
        aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
        type="button"
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
      <div className="w-full max-w-2xl"      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                      rounded-3xl shadow-2xl p-6 sm:p-8 
                      border border-gray-200 dark:border-gray-800">

          <div className="text-center mb-6">
            <RegisterLogoHeader />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Créer un compte
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Créez votre compte en toute confidentialité. Vous pourrez demander une consultation
              pour vous ou un tiers.
            </p>
          </div>

          {error && <RegisterErrorMessage error={error} onClose={() => setError(null)} />}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <RegisterInputField
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
              <div>
                <RegisterInputField
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
                {formData.password && <RegisterPasswordStrengthIndicator strength={passwordStrength} />}
              </div>

              <RegisterInputField
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

            <button
              type="submit"
              disabled={isSubmitDisabled}
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
            </button>
          </form>

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
        <p className="text-center mt-6 text-xs text-gray-500 dark:text-white"        >
          © 2026 Mon Étoile. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default memo(RegisterForm);