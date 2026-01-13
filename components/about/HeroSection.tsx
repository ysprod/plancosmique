'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { icon: Users, value: '500+', label: 'Clients Satisfaits' },
  { icon: Building2, value: '200+', label: 'Projets Réalisés' },
  { icon: Award, value: '15+', label: 'Années d\'Expérience' },
  { icon: TrendingUp, value: '98%', label: 'Taux de Réussite' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-lime-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-400 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl"
      >
 
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <motion.div
            className="mb-4 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-lime-400 px-6 py-2 text-purple-900 shadow-xl">
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-bold">SCI K.A</span>
            </div>
          </motion.div>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Société Civile Immobilière{' '}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent">
              K.A
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-purple-100 sm:text-xl">
            Cabinet d'expertise et de gouvernance structuré pour apporter des solutions aux
            besoins du corps social en matière de{' '}
            <span className="font-semibold text-lime-300">
              valorisation de patrimoines tant individuels que collectifs
            </span>
            .
          </p>
        </motion.div>

        {/* Image with overlay */}
        <motion.div
          variants={itemVariants}
          className="relative mb-12 overflow-hidden rounded-3xl shadow-2xl"
        >
          <div className="aspect-video w-full bg-gradient-to-br from-purple-800 to-indigo-800">
            <Image
              src="https://www.genspark.ai/api/files/s/QRyEmrOI"
              alt="Équipe SCI K.A"
              width={1200}
              height={675}
              className="h-full w-full object-cover mix-blend-overlay"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent" />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-md transition-all hover:bg-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <stat.icon className="mb-3 h-8 w-8 text-lime-400" />
              <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-purple-200">{stat.label}</div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}