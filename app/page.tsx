'use client';

import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Moon, 
  Star, 
  Eye, 
  Zap,
  Gem,
  Compass,
  Wand2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Service cards data
const services = [
  {
    icon: Eye,
    title: "Voyance Personnelle",
    description: "Découvrez votre destinée à travers les étoiles",
    color: "from-purple-500 to-indigo-600",
    href: "/voyance"
  },
  {
    icon: Star,
    title: "Tarot Cosmique",
    description: "Tirage des cartes guidé par l'univers",
    color: "from-blue-500 to-cyan-600",
    href: "/tarot"
  },
  {
    icon: Moon,
    title: "Astrologie",
    description: "Analysez votre thème astral complet",
    color: "from-indigo-500 to-purple-600",
    href: "/astrologie"
  },
  {
    icon: Gem,
    title: "Numérologie",
    description: "Les secrets cachés dans les nombres",
    color: "from-pink-500 to-rose-600",
    href: "/numerologie"
  },
  {
    icon: Compass,
    title: "Guidance Spirituelle",
    description: "Trouvez votre chemin dans le cosmos",
    color: "from-violet-500 to-fuchsia-600",
    href: "/guidance"
  },
  {
    icon: Wand2,
    title: "Prédictions 2024",
    description: "Ce que les astres vous réservent",
    color: "from-amber-500 to-orange-600",
    href: "/predictions"
  }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Logo */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="inline-block mb-8"
          >
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative w-full h-full bg-white rounded-full p-4 shadow-2xl">
                <Image
                  src="https://www.genspark.ai/api/files/s/uhLAQBUN"
                  alt="Plan Cosmique Logo"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-6"
          >
            PLAN COSMIQUE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-2xl md:text-3xl text-purple-200 font-light mb-4"
          >
            Explorez votre destinée à travers l'univers
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex items-center justify-center gap-3 text-indigo-300"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="text-lg font-medium">Révélez les secrets du cosmos</span>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={service.href}>
                <div className="group relative h-full">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
                  
                  <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-all duration-300 h-full shadow-2xl">
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-black text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-purple-200 font-medium leading-relaxed">
                      {service.description}
                    </p>

                    {/* Arrow indicator */}
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="mt-6 flex items-center gap-2 text-purple-400 font-bold"
                    >
                      <span>Explorer</span>
                      <Zap className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl text-white font-black text-xl shadow-2xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              Commencer votre voyage cosmique
              <Sparkles className="w-6 h-6" />
            </span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center mt-16 text-purple-300"
        >
          <p className="text-sm font-medium">
            © 2024 Plan Cosmique - Tous droits réservés
          </p>
          <p className="text-xs mt-2 text-purple-400">
            L'univers vous guide vers votre destinée
          </p>
        </motion.div>
      </div>
    </div>
  );
}
