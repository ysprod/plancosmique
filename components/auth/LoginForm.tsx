'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Loader2, Lock, User } from 'lucide-react';
import React, { memo, useEffect } from 'react';
import LoginLogoHeader from './LoginLogoHeader';
import LoginErrorAlert from './LoginErrorAlert';
import LoginInputField from './LoginInputField';
import { useLoginForm } from '@/hooks/commons/useLoginForm';

const LoginForm = () => {
  const {
    showPassword,
    error,
    formData,
    errors,
    isSubmitDisabled,
    handleChange,
    togglePassword,
    handleSubmit,
    isLoading,
    isPending,
  } = useLoginForm();

  // Synchronise le state avec les valeurs auto-remplies au montage
  useEffect(() => {
    const usernameInput = document.querySelector<HTMLInputElement>('input[name="username"]');
    const passwordInput = document.querySelector<HTMLInputElement>('input[name="password"]');
    if (usernameInput && passwordInput) {
      const username = usernameInput.value;
      const password = passwordInput.value;
      if (username || password) {
        handleChange({
          target: { name: 'username', value: username } 
        } as React.ChangeEvent<HTMLInputElement>);
        handleChange({
          target: { name: 'password', value: password } 
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, []);

  return (
    <div className=" flex items-center justify-center p-4 
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
          <LoginLogoHeader />

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
          {error && <LoginErrorAlert message={error} />}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <LoginInputField
              label="Nom Utilisateur"
              name="username"
              type="text"
              value={formData.username}
              error={errors.username}
              placeholder="Votre nom d'utilisateur"
              icon={User}
              onChange={handleChange}
            />

            <LoginInputField
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
