/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Header from "@/components/profil/Header";
import HeroSection from "@/components/profil/HeroSection";
import MobileMenu from "@/components/profil/MobileMenu";
import PaymentForm from "@/components/profil/PaymentForm";
import QuickActionsSection from "@/components/profil/QuickActionsSection";
import ServicesSection from "@/components/profil/ServicesSection";
import StarBackground from "@/components/profil/StarBackground";
import { useAuth } from "@/lib/auth/AuthContext";
import axios from "axios";
import React, { useState } from "react";

const services = [
  {
    id: "vie-personnelle",
    title: "Ma Vie Personnelle",
    icon: "Heart",
    description: "Decouvre ce qui t'anime profondément et comprends comment avancer avec confiance dans ton chemin de vie.",
    gradient: "from-rose-500 to-pink-600",
    color: "text-rose-600",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
    hoverShadow: "hover:shadow-rose-500/20",
    link: "/secured/vie-personnelle"
  },
  {
    id: "famille-couple",
    title: "Famille, Amitié et Couple",
    icon: "Users",
    description: "Explore tes liens affectifs pour mieux aimer, mieux comprendre les autres et créer des relations plus harmonieuses.",
    gradient: "from-emerald-500 to-teal-600",
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    hoverShadow: "hover:shadow-emerald-500/20",
    link: "/secured/relations"
  },
  {
    id: "professionnel",
    title: "Monde Professionnel",
    icon: "Briefcase",
    description: "Identifie tes forces naturelles, ta vocation et le domaine où tu peux vraiment t'épanouir et réussir.",
    gradient: "from-blue-500 to-indigo-600",
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    hoverShadow: "hover:shadow-blue-500/20",
    link: "/secured/professionnel"
  },
  {
    id: "astrologie-africaine",
    title: "Astrologie Africaine",
    icon: "Globe",
    description: "Retrouve la sagesse des anciens et découvre ton signe africain, son énergie et sa guidance dans ton quotidien.",
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-600",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    hoverShadow: "hover:shadow-amber-500/20",
    link: "/secured/astrologie-africaine"
  },
  {
    id: "spiritualite",
    title: "Spiritualité Africaine",
    icon: "Flame",
    description: "Connecte-toi aux forces invisibles, aux ancêtres et aux principes sacrés qui donnent sens et puissance à ta vie.",
    gradient: "from-orange-500 to-red-600",
    color: "text-orange-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    hoverShadow: "hover:shadow-orange-500/20",
    link: "/secured/spiritualite"
  },
  {
    id: "numerologie",
    title: "Numérologie",
    icon: "Hash",
    description: "Tes nombres te parlent : découvre ce qu'ils révèlent sur ta personnalité, ton destin et tes cycles d'évolution.",
    gradient: "from-purple-500 to-violet-600",
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
    borderColor: "border-purple-200",
    hoverShadow: "hover:shadow-purple-500/20",
    link: "/numerologie"
  },
  {
    id: "horoscope",
    title: "Horoscope par Signe",
    icon: "Calendar",
    description: "Reçois chaque mois les influences qui t'accompagnent et les opportunités à saisir selon ton signe.",
    gradient: "from-cyan-500 to-blue-600",
    color: "text-cyan-600",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    borderColor: "border-cyan-200",
    hoverShadow: "hover:shadow-cyan-500/20",
    link: "/secured/horoscope"
  }
];

export default function ProfilPage() {
  const { logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    nomclient: "",
    numeroSend: "",
    montant: 200,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
      window.location.href = "/";
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const paymentData = {
        totalPrice: form.montant,
        article: [{ sac: 50, chaussure: 50 }],
        personal_Info: [{ userId: 1, orderId: 123 }],
        numeroSend: form.numeroSend,
        nomclient: form.nomclient,
        return_url: "https://www.monetoile.org/callback",
        webhook_url: "https://www.monetoile.org/my-webhook-url",
      };

      const apiUrl = "https://www.pay.moneyfusion.net/Mon_Etoile/e47b0c544d03cab1/pay/";
      const response = await axios.post(apiUrl, paymentData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data?.statut && response.data?.url) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = response.data.url;
        }, 1500);
      } else {
        setError(response.data?.message || "Erreur lors de la création du paiement");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur réseau ou API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 overflow-hidden">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 z-50 origin-left" />
      <StarBackground />
      <div className="relative z-10">
        <Header user={user} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} handleLogout={handleLogout} />
        <MobileMenu mobileMenuOpen={mobileMenuOpen} user={user} handleLogout={handleLogout} />
        <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-8 max-w-7xl">
          <HeroSection user={user} />
          <ServicesSection services={services} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <QuickActionsSection />
            <PaymentForm
              form={form}
              loading={loading}
              error={error}
              success={success}
              handleChange={handleChange}
              handlePay={handlePay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
