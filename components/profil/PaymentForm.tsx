"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ArrowRight, Shield, Lock, CheckCircle2, User, AlertCircle } from "lucide-react";
import React from "react";

export default function PaymentForm({ form, loading, error, success, handleChange, handlePay }: {
  form: { nomclient: string; numeroSend: string; montant: number };
  loading: boolean;
  error: string | null;
  success: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePay: (e: React.FormEvent) => void;
}) {
  return (
    <div className="bg-gradient-to-br from-white via-violet-50/40 to-purple-50/40 rounded-3xl p-10 lg:p-14 shadow-2xl border-2 border-violet-100">
      <div className="text-center mb-12">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-violet-500/40">
              <CreditCard className="w-12 h-12 text-white" />
            </div>
          </div>
        </motion.div>
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
          Paiement Sécurisé{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
            MoneyFusion
          </span>
        </h2>
        <p className="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
          Rechargez votre compte en toute sécurité pour accéder à nos services premium et débloquer toutes les fonctionnalités
        </p>
      </div>
      <form onSubmit={handlePay} className="space-y-6 max-w-2xl mx-auto">
        {/* Nom complet */}
        <div>
          <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 ml-1">
            <User className="w-4 h-4 text-violet-600" />
            Nom complet
          </label>
          <input
            type="text"
            name="nomclient"
            placeholder="Entrez votre nom complet"
            value={form.nomclient}
            onChange={handleChange}
            className="w-full py-5 px-6 rounded-2xl bg-white text-slate-900 font-semibold text-lg shadow-lg border-2 border-slate-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all outline-none placeholder:text-slate-400"
            required
          />
        </div>
        {/* Numéro de téléphone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 ml-1">
            <Shield className="w-4 h-4 text-violet-600" />
            Numéro de téléphone
          </label>
          <input
            type="text"
            name="numeroSend"
            placeholder="+33 6 12 34 56 78"
            value={form.numeroSend}
            onChange={handleChange}
            className="w-full py-5 px-6 rounded-2xl bg-white text-slate-900 font-semibold text-lg shadow-lg border-2 border-slate-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all outline-none placeholder:text-slate-400"
            required
          />
        </div>
        {/* Montant */}
        <div>
          <label className="flex items-center gap-2 text-sm font-black text-slate-700 mb-3 ml-1">
            <CreditCard className="w-4 h-4 text-violet-600" />
            Montant (€)
          </label>
          <div className="relative">
            <input
              type="number"
              name="montant"
              placeholder="200"
              value={form.montant}
              onChange={handleChange}
              min="1"
              className="w-full py-5 px-6 rounded-2xl bg-white text-slate-900 font-black text-2xl shadow-lg border-2 border-slate-100 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all outline-none"
              required
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl font-black text-violet-600">
              €
            </div>
          </div>
        </div>
        {/* Messages d'erreur et succès */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="flex items-start gap-3 p-5 bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg"
            >
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-900 font-bold mb-1">Erreur de paiement</p>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="flex items-start gap-3 p-5 bg-emerald-50 border-2 border-emerald-200 rounded-2xl shadow-lg"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-900 font-bold mb-1">Paiement initié</p>
                <p className="text-emerald-700 font-medium">Redirection vers la page de paiement sécurisée...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Bouton de paiement amélioré */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className={`relative w-full py-6 px-8 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${loading
            ? "bg-slate-300 cursor-not-allowed"
            : "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:shadow-violet-500/50 text-white"
            }`}
        >
          {/* Effet de brillance au hover */}
          {!loading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3">
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-7 h-7 border-4 border-white border-t-transparent rounded-full"
                />
                <span>Traitement en cours...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-7 h-7" />
                <span>Procéder au paiement</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </div>
        </motion.button>
        {/* Badges de sécurité */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span>Paiement 100% sécurisé</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>Cryptage SSL</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-violet-600" />
            <span>Données protégées</span>
          </div>
        </div>
      </form>
    </div>
  );
}
