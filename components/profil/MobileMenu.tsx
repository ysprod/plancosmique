/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut } from "lucide-react";

export default function MobileMenu({ mobileMenuOpen, user, handleLogout }: {
  mobileMenuOpen: boolean;
  user: any;
  handleLogout: () => void;
}) {
  return (
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
            <Link href="/dashboard">
              <button className="w-full text-left px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-50 font-semibold transition-all">
                Dashboard
              </button>
            </Link>
            <Link href="/consultations">
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
  );
}
