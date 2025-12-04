"use client";
import Header from "@/components/profil/Header";
import MobileMenu from "@/components/profil/MobileMenu";
import { useAuth } from "@/lib/auth/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Calendar, Flame, Globe, Hash, Heart, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ICONS = { Heart, Users, Briefcase, Globe, Flame, Hash, Calendar };

const services = [
  {
    id: "vie-personnelle",
    title: "MA VIE PERSONNELLE",
    icon: "Heart",
    description: "Découvre ce qui t'anime profondément et comprends comment avancer avec confiance dans ton chemin de vie.",
    gradient: "from-rose-500 to-pink-600",
    link: "/protected/vie-personnelle"
  },
  {
    id: "famille-couple",
    title: "FAMILLE, AMITIÉ ET COUPLE",
    icon: "Users",
    description: "Explore tes liens affectifs pour mieux aimer, mieux comprendre les autres et créer des relations plus harmonieuses.",
    gradient: "from-emerald-500 to-teal-600",
    link: "/protected/relations"
  },
  {
    id: "professionnel",
    title: "MONDE PROFESSIONNEL",
    icon: "Briefcase",
    description: "Identifie tes forces naturelles, ta vocation et le domaine où tu peux vraiment t'épanouir et réussir.",
    gradient: "from-blue-500 to-indigo-600",
    link: "/protected/professionnel"
  },

  {
    id: "spiritualite",
    title: "SPIRITUALITÉ AFRICAINE",
    icon: "Flame",
    description: "Connecte-toi aux forces invisibles, aux ancêtres et aux principes sacrés qui donnent sens et puissance à ta vie.",
    gradient: "from-orange-500 to-red-600",
    link: "/protected/spiritualite"
  },
  {
    id: "numerologie",
    title: "NUMÉROLOGIE",
    icon: "Hash",
    description: "Les nombres te parlent : découvre ce qu’ils révèlent sur ta personnalité, ton destin et tes cycles d’évolution.",
    gradient: "from-purple-500 to-violet-600",
    link: "/protected/numerologie"
  },
  {
    id: "horoscope",
    title: "HOROSCOPE PAR SIGNE",
    icon: "Calendar",
    description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
    gradient: "from-cyan-500 to-blue-600",
    link: "/protected/horoscope"
  },
  {
    id: "astrologie-africaine",
    title: "INVOCATION ET RITUEL MAGIQUE",
    icon: "Globe",
    description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
    gradient: "from-amber-500 to-orange-600",
    link: "/protected/astrologie-africaine"
  },
];

export default function ProfilPage() {
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

      <Header
        user={user}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        handleLogout={handleLogout}
      />

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        user={user}
        handleLogout={handleLogout}
      />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Hero ultra-compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-1 font-semibold">
            Bienvenue, {user?.username || 'Invité'} 👋, dans ce temple virtuel dédié à te reconnecter à ton étoile.

          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-1">
            Ici, tu avances guidé(e) par la lumière de tes génies tutélaires et la présence
            bienveillante de tes ancêtres.<br />
            <br /><br />
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            Choisis un domaine pour ta consultation
          </p>
        </motion.div>

        {/* Grid services ultra-compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service, i) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <Link key={service.id} href={service.link}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileTap={{ scale: 0.97 }}
                  className="group bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md hover:shadow-xl transition-all h-full"
                >
                  {/* Titre + Icone à gauche */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description courte */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-snug">
                    {service.description}
                  </p>

                  {/* CTA mini */}
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 group-hover:gap-2 transition-all">
                    <span>Consulter</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
