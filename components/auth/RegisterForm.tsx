/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuth } from '@/lib/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
  X
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

export const RegisterForm: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  // Calculer la force du mot de passe
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    // First name
    if (!formData.firstName) {
      newErrors.firstName = 'Prénom requis';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Au moins 2 caractères';
    }

    // Last name
    if (!formData.lastName) {
      newErrors.lastName = 'Nom requis';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Au moins 2 caractères';
    }

    // Email
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Au moins 8 caractères';
    }

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    try {
      const {confirmPassword, ...registerData } = formData;
      console.log(confirmPassword);
      await register(registerData);
    } catch (err: any) {
      let errorMessage = err.response?.data?.message || 'Erreur lors de l\'inscription';
      if (err.response?.data?.errors) {
        const details = Object.entries(err.response.data.errors)
          .map(([field, msg]) => `• ${field} : ${msg}`)
          .join('\n');
        errorMessage += '\n' + details;
      }
      setError(errorMessage);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Faible';
    if (passwordStrength === 2) return 'Moyen';
    if (passwordStrength === 3) return 'Bon';
    return 'Excellent';
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-6">
      {/* Background minimaliste */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto relative z-10"
      >
        {/* Carte principale */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header avec logo */}
          <div className="relative bg-white px-8 py-12 text-center border-b border-gray-200">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
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
              
              <h1 className="text-4xl font-black text-black mb-2">
                MON ÉTOILE
              </h1>
              <p className="text-gray-600 text-lg font-medium">
                Créez votre compte spirituel
              </p>
            </motion.div>
          </div>

          {/* Formulaire */}
          <div className="p-8">
            {/* Message d'erreur */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
                >
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-red-700 text-sm font-medium whitespace-pre-line">{error}</p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                        errors.firstName
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
                      }`}
                      placeholder="Jean"
                    />
                    {!errors.firstName && formData.firstName && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>

                {/* Nom */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                        errors.lastName
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
                      }`}
                      placeholder="Dupont"
                    />
                    {!errors.lastName && formData.lastName && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
                    }`}
                    placeholder="jean.dupont@email.com"
                  />
                  {!errors.email && formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm mt-1 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                        errors.password
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600">Force</span>
                        <span className={`text-xs font-bold ${
                          passwordStrength === 4 ? 'text-green-600' :
                          passwordStrength === 3 ? 'text-yellow-600' :
                          passwordStrength === 2 ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-all ${
                              level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Confirmer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                        errors.confirmPassword
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-gray-200 focus:border-gray-900 focus:ring-gray-900/10'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    {!errors.confirmPassword && formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <Check className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Champs optionnels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all font-medium"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-1 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Date de naissance <span className="text-gray-400 text-xs">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
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

            {/* Login Link */}
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

            {/* Sécurité */}
            <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" />
              <span>Vos données sont sécurisées et cryptées</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>© 2025 Mon Étoile. Tous droits réservés.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;