/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Menu, X } from "lucide-react";
import NotificationBell from "@/components/NotificationBell";
import { useState } from "react";

export default function HeaderPage() {
  const { logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 z-50" />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-violet-100 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white-500 via-white-500 to-white-500 p-0.5 shadow-lg shadow-white-500/30"
              >
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Logo Mon Etoile"
                    width={100}
                    height={10}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  Mon Étoile
                </h1>
                <p className="text-xs text-slate-500 font-medium -mt-1">
                  Votre guide spirituel
                </p>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link href="/protected/profil">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-xl text-slate-700 hover:text-violet-600 font-semibold hover:bg-violet-50 transition-all"
                >
                  Tableau de bord
                </motion.button>
              </Link>
              <Link href="/protected/consultations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-xl text-slate-700 hover:text-violet-600 font-semibold hover:bg-violet-50 transition-all"
                >
                  Mes Consultations
                </motion.button>
              </Link>
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Notifications */}
              <NotificationBell />

              {/* User Info */}
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-violet-50 border border-violet-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">
                    {user?.firstName || "Utilisateur"}
                  </p>
                  <p className="text-xs text-violet-600 font-medium">
                    Profil Premium
                  </p>
                </div>
              </div>

              {/* Bouton Déconnexion */}
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-violet-100 text-violet-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-violet-100 bg-white"
          >
            <div className="container mx-auto px-4 py-6 space-y-3">
              {/* User Info Mobile */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {user?.firstName || "Utilisateur"}
                  </p>
                  <p className="text-xs text-violet-600 font-medium">
                    Membre Premium
                  </p>
                </div>
              </div>
              <Link href="/protected/profil">
                <button className="w-full text-left px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-50 font-semibold transition-all">
                  Dashboard
                </button>
              </Link>
              <Link href="/protected/consultations">
                <button className="w-full text-left px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-50 font-semibold transition-all">
                  Mes Consultations
                </button>
              </Link>
              {/* Déconnexion Mobile */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
