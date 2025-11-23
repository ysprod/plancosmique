"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Lock, ChevronRight, Settings, Bell, Shield, Calendar } from "lucide-react";

export default function QuickActionsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="lg:col-span-1 space-y-6"
    >
      {/* Card Informations Personnelles */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-3xl p-8 shadow-xl border-2 border-violet-100 hover:border-violet-300 transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Mes Informations</h2>
        </div>
        <div className="space-y-3">
          <Link href="/protected/profil/edit">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-2xl hover:shadow-violet-500/30 transition-all flex items-center justify-between group"
            >
              <span>Modifier mon profil</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
          <Link href="/protected/profil/security">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-bold shadow-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Sécurité et mot de passe
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </motion.div>
      {/* Card Préférences Améliorée */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-3xl p-8 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Préférences</h2>
        </div>
        <div className="space-y-4">
          {/* Toggle Notifications */}
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-3 font-bold text-slate-700">
              <Bell className="w-5 h-5 text-emerald-600" />
              Notifications
            </span>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-14 h-7 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner"
            >
              <motion.div
                animate={{ x: 26 }}
                className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </motion.div>
          </motion.div>
          {/* Confidentialité */}
          <Link href="/protected/profil/privacy">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-3 font-bold text-slate-700">
                <Shield className="w-5 h-5 text-emerald-600" />
                Confidentialité
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </motion.div>
          </Link>
          {/* Horoscope quotidien */}
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-3 font-bold text-slate-700">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Horoscope quotidien
            </span>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-14 h-7 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner"
            >
              <motion.div
                animate={{ x: 26 }}
                className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
