
'use client';
import React from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';
import { Heart, Users, Link2, Baby, TrendingUp } from 'lucide-react';

const services = [
  { icon: Users, title: "Affinités & Compatibilités", description: "La vérité énergétique de vos relations", href: "/compatibilites" },
  { icon: Heart, title: "Synastrie de Couple", description: "Lecture profonde de vos thèmes croisés", href: "/synastrie" },
  { icon: Link2, title: "Relations Karmiques", description: "Âme sœur, flamme jumelle ou contrat karmique", href: "/relations-karmiques" },
  { icon: Baby, title: "Thème Astral de l'Enfant", description: "Son âme, ses talents et sa mission de vie", href: "/theme-enfant" },
  { icon: TrendingUp, title: "Chemin Amoureux", description: "Évolution du couple et périodes clés", href: "/chemin-amoureux" }
];

export default function RelationsPage() {
  const title = "FAMILLE, AMITIÉ ET COUPLE";
  const description = "Comprenez la vérité énergétique de vos relations et harmonisez vos liens affectifs";
  const icon = Heart;
  const color = "from-rose-600 via-pink-600 to-red-600";
  const lightColor = "from-rose-400 to-red-400";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:80px_80px]" />
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#f472b6' : i % 3 === 1 ? '#fb7185' : '#f43f5e',
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 lg:py-16">
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
              className="flex items-center gap-2 text-rose-300 hover:text-red-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Retour à l'accueil</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block mb-8"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-3xl blur-2xl opacity-50`} />
            <div className={`relative w-24 h-24 lg:w-28 lg:h-28 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center shadow-2xl border-2 border-white/20`}>
              {React.createElement(icon, { className: "w-12 h-12 lg:w-14 lg:h-14 text-white drop-shadow-lg" })}
            </div>
          </motion.div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${lightColor} mb-6 tracking-tight px-4`}>
            {title}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed px-4">
            {description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={`${service.title}-${index}`}
              variants={itemVariants}
              whileHover={{ scale: 1.08, y: -12 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link href={service.href}>
                <div className="group relative h-full">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500`} />
                  <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl p-7 border-2 border-slate-700/50 group-hover:border-slate-600 transition-all duration-300 h-full shadow-2xl hover:shadow-[0_0_50px_rgba(244,63,94,0.5)]">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative mb-5"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-md opacity-50`} />
                      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-black text-white mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-2 font-bold text-sm"
                    >
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`}>Découvrir</span>
                      <Zap className="w-4 h-4 text-rose-400" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
