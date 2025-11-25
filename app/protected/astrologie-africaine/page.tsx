/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Palmtree, Globe, Users, Mountain, Pyramid, Sparkles, Calendar, Heart, Star } from 'lucide-react';

// Types pour les onglets
type TabId = 'signe' | 'compatibilite' | 'guidance' | 'divinite';

interface Tab {
  id: TabId;
  icon: any;
  title: string;
  description: string;
}

// Composants de contenu pour chaque section
const SigneAfricainContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900">Votre Signe Astrologique Africain</h2>
          <p className="text-gray-600">Découvrez votre identité cosmique ancestrale</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            Les 12 Signes Africains Traditionnels
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Le Baobab", period: "4 jan - 3 fév", traits: "Sagesse, longévité, protection" },
              { name: "La Richesse de l'Or", period: "4 fév - 5 mar", traits: "Prospérité, valeur, prestige" },
              { name: "La Famille", period: "6 mar - 4 avr", traits: "Union, communauté, amour" },
              { name: "Le Petit Service", period: "5 avr - 4 mai", traits: "Humilité, aide, générosité" },
              { name: "Le Marché", period: "5 mai - 4 juin", traits: "Commerce, échange, abondance" },
              { name: "L'Ancêtre", period: "5 juin - 4 juil", traits: "Transmission, mémoire, guidance" },
              { name: "Le Juge", period: "5 juil - 4 août", traits: "Équité, justice, vérité" },
              { name: "La Kola", period: "5 août - 3 sept", traits: "Hospitalité, partage, célébration" },
              { name: "Le Voyageur", period: "4 sept - 3 oct", traits: "Aventure, découverte, liberté" },
              { name: "La Distance", period: "4 oct - 3 nov", traits: "Perspective, recul, vision" },
              { name: "L'Enfant du Monde", period: "4 nov - 3 déc", traits: "Innocence, curiosité, ouverture" },
              { name: "La Moisson", period: "4 déc - 3 jan", traits: "Récolte, accomplissement, gratitude" }
            ].map((signe, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, x: 4 }}
                className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200 hover:border-orange-400 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{signe.name}</h4>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    {signe.period}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{signe.traits}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Calculez votre signe</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date de naissance</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Découvrir mon signe africain
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CompatibiliteContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 border border-rose-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900">Compatibilités Africaines</h2>
          <p className="text-gray-600">Affinités énergétiques ancestrales</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Calculer votre compatibilité</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Votre signe</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none">
                <option>Sélectionnez votre signe</option>
                <option>Le Baobab</option>
                <option>La Richesse de l'Or</option>
                <option>La Famille</option>
                <option>Le Petit Service</option>
                <option>Le Marché</option>
                <option>L'Ancêtre</option>
                <option>Le Juge</option>
                <option>La Kola</option>
                <option>Le Voyageur</option>
                <option>La Distance</option>
                <option>L'Enfant du Monde</option>
                <option>La Moisson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Signe de votre partenaire</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none">
                <option>Sélectionnez un signe</option>
                <option>Le Baobab</option>
                <option>La Richesse de l'Or</option>
                <option>La Famille</option>
                <option>Le Petit Service</option>
                <option>Le Marché</option>
                <option>L'Ancêtre</option>
                <option>Le Juge</option>
                <option>La Kola</option>
                <option>Le Voyageur</option>
                <option>La Distance</option>
                <option>L'Enfant du Monde</option>
                <option>La Moisson</option>
              </select>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Analyser la compatibilité
          </motion.button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Types de compatibilités</h3>
          <div className="space-y-3">
            {[
              { type: "Compatibilité Amoureuse", desc: "Harmonie des cœurs et des âmes", color: "from-rose-500 to-pink-500" },
              { type: "Compatibilité Amicale", desc: "Affinités et complicité spirituelle", color: "from-amber-500 to-yellow-500" },
              { type: "Compatibilité Professionnelle", desc: "Synergie dans les projets communs", color: "from-blue-500 to-cyan-500" },
              { type: "Compatibilité Familiale", desc: "Harmonie dans les liens de sang", color: "from-emerald-500 to-teal-500" }
            ].map((comp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200 hover:border-rose-400 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${comp.color} flex items-center justify-center`}>
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{comp.type}</h4>
                    <p className="text-sm text-gray-600">{comp.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const GuidanceContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
          <Mountain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900">Guidance Ancestrale</h2>
          <p className="text-gray-600">Sagesse des anciens et connexion spirituelle</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Messages des Ancêtres</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Connectez-vous à la sagesse millénaire de vos ancêtres. Laissez leur guidance illuminer votre chemin
            et vous apporter clarté dans les moments d'incertitude.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Message du Jour", icon: Star, color: "from-emerald-400 to-teal-500" },
              { title: "Conseil Ancestral", icon: Mountain, color: "from-teal-400 to-cyan-500" },
              { title: "Prière Traditionnelle", icon: Sparkles, color: "from-cyan-400 to-blue-500" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200 cursor-pointer hover:border-emerald-400 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-md`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Posez votre question aux ancêtres</h3>
          <div className="space-y-4">
            <textarea
              placeholder="Formulez votre question avec respect et sincérité..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none min-h-[120px] resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Mountain className="w-5 h-5" />
              Recevoir la guidance ancestrale
            </motion.button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Sagesses Ancestrales</h3>
          <div className="space-y-3">
            {[
              "« L'arbre qui tombe fait plus de bruit que la forêt qui pousse »",
              "« Si tu veux aller vite, marche seul. Si tu veux aller loin, marchons ensemble »",
              "« La patience peut cuire une pierre »",
              "« C'est en regardant l'eau calme qu'on apprend à nager »"
            ].map((proverbe, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border-l-4 border-emerald-500"
              >
                <p className="text-gray-700 italic">{proverbe}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const DiviniteContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-8"
  >
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 border border-amber-200">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
          <Pyramid className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900">Ma Divinité Égyptienne</h2>
          <p className="text-gray-600">Découvrez la divinité qui vous guide</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Les Grandes Divinités Égyptiennes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Râ", role: "Dieu du Soleil", power: "Lumière, vie, création", color: "from-yellow-400 to-orange-500" },
              { name: "Isis", role: "Déesse de la Magie", power: "Protection, guérison, maternité", color: "from-blue-400 to-indigo-500" },
              { name: "Osiris", role: "Dieu de l'Au-delà", power: "Régénération, fertilité, justice", color: "from-emerald-400 to-green-600" },
              { name: "Anubis", role: "Dieu des Morts", power: "Passage, protection des âmes", color: "from-gray-700 to-gray-900" },
              { name: "Thot", role: "Dieu de la Sagesse", power: "Connaissance, écriture, magie", color: "from-cyan-400 to-blue-500" },
              { name: "Hathor", role: "Déesse de l'Amour", power: "Joie, musique, fertilité", color: "from-rose-400 to-pink-500" },
              { name: "Horus", role: "Dieu du Ciel", power: "Royauté, protection, guerre", color: "from-indigo-400 to-purple-500" },
              { name: "Bastet", role: "Déesse Protectrice", power: "Foyer, féminité, joie", color: "from-amber-400 to-orange-400" },
              { name: "Sekhmet", role: "Déesse Guerrière", power: "Force, courage, guérison", color: "from-red-500 to-orange-600" }
            ].map((divinity, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200 hover:border-amber-400 transition-all cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${divinity.color} flex items-center justify-center mb-3 shadow-md`}>
                  <Pyramid className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{divinity.name}</h4>
                <p className="text-sm font-semibold text-amber-700 mb-2">{divinity.role}</p>
                <p className="text-xs text-gray-600">{divinity.power}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Découvrez votre divinité protectrice</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Votre date de naissance</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Votre intention spirituelle</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none">
                <option>Choisissez votre quête</option>
                <option>Protection et sécurité</option>
                <option>Amour et relations</option>
                <option>Sagesse et connaissance</option>
                <option>Guérison et santé</option>
                <option>Abondance et prospérité</option>
                <option>Créativité et expression</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Révéler ma divinité protectrice
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function AstrologieAfricainePage() {
  const [activeTab, setActiveTab] = useState<TabId>('signe');

  const tabs: Tab[] = [
    {
      id: 'signe',
      icon: Globe,
      title: "Signe Astrologique",
      description: "Votre signe selon la tradition africaine"
    },
    {
      id: 'compatibilite',
      icon: Users,
      title: "Compatibilités",
      description: "Affinités énergétiques ancestrales"
    },
    {
      id: 'guidance',
      icon: Mountain,
      title: "Guidance Ancestrale",
      description: "Sagesse des anciens"
    },
    {
      id: 'divinite',
      icon: Pyramid,
      title: "Divinité Égyptienne",
      description: "Votre protecteur divin"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'signe':
        return <SigneAfricainContent />;
      case 'compatibilite':
        return <CompatibiliteContent />;
      case 'guidance':
        return <GuidanceContent />;
      case 'divinite':
        return <DiviniteContent />;
      default:
        return <SigneAfricainContent />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Progress bar décoratif */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Background subtil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-100/30 to-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-red-100/20 to-orange-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 lg:py-16 max-w-7xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-2xl">
              <Palmtree className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            ASTROLOGIE AFRICAINE
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez la sagesse ancestrale et les traditions astrologiques africaines millénaires
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl border-2 transition-all ${activeTab === tab.id
                    ? 'bg-gradient-to-br from-orange-500 to-amber-600 border-orange-600 shadow-xl'
                    : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <tab.icon className={`w-8 h-8 mx-auto mb-3 ${activeTab === tab.id ? 'text-white' : 'text-gray-700'
                    }`} />
                  <h3 className={`font-bold text-sm mb-1 ${activeTab === tab.id ? 'text-white' : 'text-gray-900'
                    }`}>
                    {tab.title}
                  </h3>
                  <p className={`text-xs ${activeTab === tab.id ? 'text-orange-50' : 'text-gray-500'
                    }`}>
                    {tab.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contenu dynamique */}
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
}