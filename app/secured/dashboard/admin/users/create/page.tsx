/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usersService } from "@/lib/api/services/users.service";
import { Role } from "@/lib/types/auth.types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  FileText,
  Globe,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Star,
  Tag,
  User,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: Role.USER,
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
    specialties: [] as string[],
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculer la force du mot de passe
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    setForm({ ...form, [name]: value });
  };

  const addSpecialty = () => {
    if (currentSpecialty.trim() && !form.specialties.includes(currentSpecialty.trim())) {
      setForm({
        ...form,
        specialties: [...form.specialties, currentSpecialty.trim()],
      });
      setCurrentSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setForm({
      ...form,
      specialties: form.specialties.filter(s => s !== specialty),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
        const donnes = {
            ...form,
            dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth).toISOString() : undefined,
        };
      await usersService.create(donnes);
      setSuccess(true);
      setTimeout(() => {
        router.replace("/admin/users");
      }, 1500);
    } catch (err: any) {
            if (err?.response?.data) {
              setError(
                typeof err.response.data === "string"
                  ? err.response.data
                  : JSON.stringify(err.response.data, null, 2)
              );
            } else {
              setError("Erreur lors de la création");
            }
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: Role) => {
    const icons = {
      [Role.SUPER_ADMIN]: '👑',
      [Role.ADMIN]: '⚡',
      [Role.CONSULTANT]: '💼',
      [Role.USER]: '👤',
      [Role.GUEST]: '🔍',
    };
    return icons[role] || icons[Role.USER];
  };

  const getRoleColor = (role: Role) => {
    const colors = {
      [Role.SUPER_ADMIN]: 'from-red-500 to-pink-500',
      [Role.ADMIN]: 'from-orange-500 to-amber-500',
      [Role.CONSULTANT]: 'from-blue-500 to-cyan-500',
      [Role.USER]: 'from-green-500 to-emerald-500',
      [Role.GUEST]: 'from-slate-400 to-slate-500',
    };
    return colors[role] || colors[Role.USER];
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-slate-200';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-violet-600 transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la liste
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/30">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Créer un utilisateur</h1>
              <p className="text-slate-600 mt-1">Ajoutez un nouveau membre à votre plateforme</p>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl flex items-start gap-3 shadow-lg"
            >
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <X className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <strong className="font-bold text-red-700">Erreur</strong>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
              <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl flex items-center gap-3 shadow-lg"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <strong className="font-bold text-green-700">Succès !</strong>
                <p className="text-sm text-green-600 mt-1">L'utilisateur a été créé avec succès. Redirection en cours...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulaire */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Informations de base */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Informations de base</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prénom */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="Jean"
                  />
                </div>
              </div>

              {/* Nom */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="jean.dupont@example.com"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
              </div>

              {/* Date de naissance */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Date de naissance
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Mot de passe <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="••••••••"
                  />
                </div>
                {form.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-600">Force du mot de passe</span>
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
                            level <= passwordStrength ? getPasswordStrengthColor() : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rôle et permissions */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Rôle et permissions</h2>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Sélectionnez un rôle <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(Role).map((role) => (
                  <motion.label
                    key={role}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={form.role === role}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-2xl transition-all ${
                      form.role === role
                        ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/20'
                        : 'border-slate-200 bg-white hover:border-violet-300'
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor(role)} rounded-xl flex items-center justify-center text-white text-lg shadow-lg`}>
                          {getRoleIcon(role)}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900">{role}</div>
                        </div>
                        {form.role === role && (
                          <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          {/* Localisation */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Localisation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Adresse */}
              <div className="md:col-span-3 group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Adresse
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="123 Rue de la République"
                  />
                </div>
              </div>

              {/* Ville */}
              <div className="group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Ville
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                  placeholder="Paris"
                />
              </div>

              {/* Pays */}
              <div className="md:col-span-2 group">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Pays
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                    placeholder="France"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profil consultant (si rôle = CONSULTANT) */}
          {form.role === Role.CONSULTANT && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Profil consultant</h2>
              </div>

              <div className="space-y-6">
                {/* Spécialités */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Spécialités
                  </label>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 relative group">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                      <input
                        type="text"
                        value={currentSpecialty}
                        onChange={(e) => setCurrentSpecialty(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium"
                        placeholder="Tarot, Astrologie, Numérologie..."
                      />
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addSpecialty}
                      className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Ajouter
                    </motion.button>
                  </div>
                  
                  {form.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {form.specialties.map((spec) => (
                          <motion.span
                            key={spec}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-4 py-2 rounded-xl font-semibold border-2 border-violet-200"
                          >
                            <Star className="w-4 h-4" />
                            {spec}
                            <button
                              type="button"
                              onClick={() => removeSpecialty(spec)}
                              className="ml-1 hover:text-violet-900 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Biographie
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-violet-600 transition-colors" />
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={5}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium resize-none"
                      placeholder="Présentez votre expertise et votre parcours..."
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {form.bio.length} / 500 caractères
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Boutons d'action */}
          <div className="flex items-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:border-slate-300 hover:shadow-lg transition-all"
            >
              Annuler
            </motion.button>
            
            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Création en cours...
                </>
              ) : success ? (
                <>
                  <Check className="w-5 h-5" />
                  Utilisateur créé !
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
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
