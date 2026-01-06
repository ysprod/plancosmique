'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Handshake,
  Users,
  TrendingUp,
  Building,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';

const missions = [
  {
    icon: Handshake,
    title: 'Facilitation',
    description: 'Accompagnement personnalisé dans vos démarches immobilières et foncières',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Intermédiation',
    description: 'Mise en relation efficace et négociation entre toutes les parties prenantes',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Valorisation Foncière',
    description: 'Optimisation stratégique de la valeur de vos terrains et propriétés',
    gradient: 'from-lime-500 to-emerald-500',
  },
  {
    icon: Building,
    title: 'Gestion de Patrimoine',
    description: 'Suivi rigoureux et administration professionnelle de vos biens immobiliers',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: GraduationCap,
    title: 'Consultance & Conseils',
    description: 'Expertise pointue et accompagnement stratégique sur mesure',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: MessageSquare,
    title: 'Formation',
    description: 'Renforcement des capacités et transfert de compétences',
    gradient: 'from-teal-500 to-cyan-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function MissionsSection() {
  return (
    <section className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Nos{' '}
            <span className="bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              Missions
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Des services complets pour répondre à tous vos besoins immobiliers et fonciers
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl dark:bg-gray-800"
            >
              {/* Gradient border effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mission.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />

              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${mission.gradient} text-white shadow-lg`}
              >
                <mission.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                {mission.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {mission.description}
              </p>

              {/* Bottom accent */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${mission.gradient} transition-all duration-500 group-hover:w-full`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
