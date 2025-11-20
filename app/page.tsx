'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Drum,
  Globe,
  Leaf,
  Moon,
  Shield,
  Sparkles,
  Star,
  Sun,
  Users
} from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Services avec une touche africaine
const africanServices = [
  {
    id: "divination-ancestrale",
    title: "Divination Ancestrale",
    icon: Drum,
    description: "Consultation par les méthodes traditionnelles africaines",
    features: ["Lecture des signes", "Messages des ancêtres", "Guidance spirituelle"],
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    popular: true
  },
  {
    id: "astrologie-africaine",
    title: "Astrologie Africaine",
    icon: Globe,
    description: "Basée sur les systèmes cosmologiques traditionnels",
    features: ["Signes africains", "Cycles lunaires", "Synchronisation naturelle"],
    gradient: "from-emerald-500 to-teal-600",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    id: "voyance-modern",
    title: "Voyance Moderne",
    icon: Sparkles,
    description: "Alliance entre traditions et outils contemporains",
    features: ["Support vidéo", "Analyses détaillées", "Suivi personnalisé"],
    gradient: "from-violet-500 to-purple-600",
    color: "text-violet-600",
    bgColor: "bg-violet-50"
  },
  {
    id: "rituels-energetiques",
    title: "Rituels Énergétiques",
    icon: Leaf,
    description: "Purification et harmonisation selon les traditions",
    features: ["Nettoyage énergétique", "Protection spirituelle", "Ancrage"],
    gradient: "from-green-500 to-emerald-600",
    color: "text-green-600",
    bgColor: "bg-green-50"
  }
];

// Valeurs africaines
const africanValues = [
  {
    icon: Users,
    title: "Communauté",
    description: "La sagesse se partage au sein de la communauté"
  },
  {
    icon: Shield,
    title: "Authenticité",
    description: "Pratiques préservées et transmises avec intégrité"
  },
  {
    icon: Leaf,
    title: "Harmonie Naturelle",
    description: "Respect des cycles naturels et cosmiques"
  },
  {
    icon: Sparkles,
    title: "Spiritualité Vivante",
    description: "Connexion aux forces invisibles du monde"
  }
];

// Témoignages
const testimonials = [
  {
    name: "Aïcha T.",
    location: "Dakar, Sénégal",
    text: "La guidance reçue m'a aidée à retrouver mon chemin ancestral. Merci pour cette authenticité.",
    service: "Divination Ancestrale"
  },
  {
    name: "Kofi M.",
    location: "Abidjan, Côte d'Ivoire",
    text: "Enfin une plateforme qui honore nos traditions spirituelles africaines avec modernité.",
    service: "Astrologie Africaine"
  },
  {
    name: "Bintou S.",
    location: "Bamako, Mali",
    text: "Les rituels de purification ont transformé mon foyer. La paix est revenue dans notre maison.",
    service: "Rituels Énergétiques"
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background éléments africains modernes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Motifs géométriques africains subtils */}
        <div className="absolute top-10 right-10 opacity-5">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <path d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z"
              fill="currentColor" className="text-amber-500" />
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 opacity-5">
          <svg width="150" height="150" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8"
              fill="none" className="text-emerald-500" />
            <circle cx="50" cy="50" r="20" fill="currentColor" className="text-emerald-500" />
          </svg>
        </div>

        {/* Dégradés doux */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-100/20 to-orange-100/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-100/15 to-teal-100/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-16 lg:mb-20"
        >
          {/* Logo avec inspiration africaine */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12  rounded-full flex items-center justify-center relative">
              <div className="absolute inset-2 bg-white rounded-full"></div>
              <Image
                src="/logo.png"
                alt="Logo MonÉtoile"
                width={24}
                height={24}
                className="w-12 h-12 relative z-10"
              />            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">MonÉtoile</div>
              <div className="text-xs text-amber-600 font-medium">Sagesse Africaine</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Services', 'Valeurs', 'Témoignages', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-slate-700 hover:text-amber-600 transition-colors font-medium">
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-amber-500/25 transition-all"
          >
            Consultation
          </motion.button>
        </motion.header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-700 font-medium">Guidé par la sagesse ancestrale</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 lg:mb-8"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600">
              Éclairez
            </span>
            <br />
            <span className="text-slate-900">Votre Chemin de Vie</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Découvrez la <span className="font-semibold text-amber-600">voyance authentique</span>
            {' '}inspirée des traditions spirituelles africaines, alliant sagesse ancestrale et modernité
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-3"
            >
              <Drum className="w-5 h-5" />
              Commencer mon voyage
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <button className="border border-amber-200 text-amber-700 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all">
              Découvrir nos valeurs
            </button>
          </motion.div>
        </motion.div>

        {/* Services Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-24 lg:mb-32"
          id="services"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Services Ancestraux</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des pratiques authentiques préservées et adaptées à notre époque
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {africanServices.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative ${service.bgColor} rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 ${service.popular ? 'ring-2 ring-amber-500/20' : ''
                  }`}
              >


                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className={`text-2xl font-bold ${service.color} mb-4`}>{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${service.gradient} shadow-lg hover:shadow-xl transition-all`}
                >
                  Découvrir cette tradition
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Valeurs Africaines */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-24 lg:mb-32 bg-slate-50 rounded-3xl p-12"
          id="valeurs"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Valeurs Ancestrales</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Les principes qui guident notre pratique spirituelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {africanValues.map((value, index) => (
              <motion.div
                key={value.title + index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border border-slate-200">
                  <value.icon className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Témoignages */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 lg:mb-32"
          id="témoignages"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Ils ont retrouvé leur <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">lumière intérieure</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="border-t border-slate-200 pt-4">
                  <div className="font-bold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-amber-600">{testimonial.location}</div>
                  <div className="text-xs text-slate-500 mt-1">{testimonial.service}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 border border-amber-200 shadow-xl">
            <Drum className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Prêt à <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">écouter</span> la voix des ancêtres ?
            </h2>
            <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Laissez-vous guider par la sagesse millénaire de l'Afrique pour illuminer votre chemin
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-12 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-amber-500/25 transition-all flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-6 h-6" />
              Commencer ma consultation
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <p className="text-slate-600 text-sm mt-4">
              Consultation en ligne disponible • Respect des traditions
            </p>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center pt-12 border-t border-slate-200"
        >
          <div className="flex items-center justify-center gap-4 mb-6 opacity-60">
            <Moon className="w-5 h-5 text-amber-600" />
            <Sun className="w-5 h-5 text-orange-600" />
            <Star className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-slate-600 text-sm mb-2">
            © 2025 MonÉtoile - Voyance Africaine Authentique. Tous droits réservés.
          </p>
          <p className="text-slate-500 text-xs max-w-md mx-auto">
            Honorer les traditions spirituelles africaines dans un cadre moderne et respectueux
          </p>
        </motion.footer>
      </div>
    </div>
  );
}