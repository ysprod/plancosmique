'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Construction, Map, ShoppingCart, Award } from 'lucide-react';

const services = [
  {
    icon: Scale,
    title: 'Règlement de Litiges',
    description: 'Médiation et résolution de conflits relationnels et fonciers',
  },
  {
    icon: Construction,
    title: 'Suivi d\'Aménagement',
    description: 'Suivi d\'activités d\'aménagement et de construction',
  },
  {
    icon: Map,
    title: 'Projets Sociaux',
    description: 'Initiation, conduite de projets sociaux et réservation de parcelles/lots',
  },
  {
    icon: ShoppingCart,
    title: 'Gestion Commerciale',
    description: 'Gestion achat(s), vente(s), recherche et financement',
  },
  {
    icon: Award,
    title: 'Renforcement de Capacités',
    description: 'Sensibilisation et renforcement des capacités opérationnelles',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Nos{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Prestations
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Un accompagnement sur mesure pour tous vos projets
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 shadow-md transition-shadow hover:shadow-xl dark:from-purple-900/20 dark:to-indigo-900/20"
            >
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg">
                  <service.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}