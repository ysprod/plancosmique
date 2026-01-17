'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Landmark, FileCheck } from 'lucide-react';

const offers = [
  {
    icon: Home,
    title: 'Financement de Projets',
    description:
      'Conception et réalisation de projets de cités aux normes écologiques et durables',
    features: [
      'Projets écologiques',
      'Normes internationales',
      'Financement adapté',
      'Accompagnement complet',
    ],
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Landmark,
    title: 'Valorisation Foncière',
    description:
      'Parcelles rurales et urbaines avec sécurisation et acquisition de titres de propriétés',
    features: [
      'Sécurisation juridique',
      'Titres de propriété',
      'Zones rurales & urbaines',
      'Due diligence complète',
    ],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: FileCheck,
    title: 'Acquisition de Parcelles',
    description:
      'Parcelles individualisées, de moyennes et de grandes surfaces selon vos besoins',
    features: [
      'Parcelles sur mesure',
      'Moyennes surfaces',
      'Grandes surfaces',
      'Documentation complète',
    ],
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function OffersSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 dark:from-gray-800 dark:to-gray-900 sm:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-block rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold text-lime-800 dark:bg-lime-900 dark:text-lime-200">
            Nos Offres
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Des Solutions{' '}
            <span className="bg-gradient-to-r from-lime-600 to-emerald-600 bg-clip-text text-transparent">
              Immobilières
            </span>{' '}
            Complètes
          </h2>
        </motion.div>
  
        <div className="grid gap-8 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl dark:bg-gray-800"
            >
              {/* Background gradient */}
              <div
                className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br ${offer.gradient} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
              />

              {/* Icon */}
              <div
                className={`relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${offer.gradient} text-white shadow-lg`}
              >
                <offer.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="relative z-10 mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                {offer.title}
              </h3>
              <p className="relative z-10 mb-6 text-gray-600 dark:text-gray-300">
                {offer.description}
              </p>

              {/* Features */}
              <ul className="relative z-10 space-y-2">
                {offer.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div
                      className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${offer.gradient}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Bottom decoration */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${offer.gradient}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}