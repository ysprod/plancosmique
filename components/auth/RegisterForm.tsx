/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Loader2, Shield, Lock, Phone, User } from 'lucide-react';
import React, { memo } from 'react';
import RegisterLogoHeader from './RegisterLogoHeader';
import RegisterErrorMessage from './RegisterErrorMessage';
import RegisterPasswordStrengthIndicator from './RegisterPasswordStrengthIndicator';
import RegisterInputField from './RegisterInputField';
import RegisterSelectField from './RegisterSelectField';
import { useRegisterForm } from '@/hooks/useRegisterForm';

const RegisterForm: React.FC = () => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    setError,
    passwordStrength,
    formData,
    errors,
    handleChange,
    handleSubmit,
    countryOptions,
    passwordsMatch,
    isSubmitDisabled,
    isLoading,
    isPending,
    GENDER_OPTIONS,
  } = useRegisterForm();

  return (
    <div className=" flex items-center justify-center p-4 
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
            <RegisterLogoHeader />
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
            {error && <RegisterErrorMessage error={error} onClose={() => setError(null)} />}
          </AnimatePresence>

          {/* Formulaire */}
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
              <RegisterSelectField
                label="Genre"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={errors.gender}
                options={GENDER_OPTIONS}
              />

              <RegisterSelectField
                label="Pays"
                name="country"
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
                options={countryOptions}
              />
            </div>

            <RegisterInputField
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
