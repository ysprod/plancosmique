'use client';

import { motion, useScroll, Variants } from 'framer-motion';
import { ArrowRight, BookOpen, Compass, Eye, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, memo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks';

// ✨ Animations centralisées et réutilisables
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  } satisfies Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  } satisfies Variants
};

// 📋 Configuration des questions existentielles
const EXISTENTIAL_QUESTIONS = [
  { question: "QUI SUIS-JE ?", icon: Eye },
  { question: "D'OÙ VIENS-JE ?", icon: Compass },
  { question: "OÙ VAIS-JE ?", icon: Star }
] as const;

// 🎨 Composant Card optimisé avec memo
const QuestionCard = memo(({ item }: { item: typeof EXISTENTIAL_QUESTIONS[number]; index: number }) => (
  <Link href="/protected/profil" className="no-underline">
    <motion.div
      variants={animations.fadeInUp}
      whileHover={{ y: -10, scale: 1.05 }}
      className="relative group cursor-pointer h-full"
    >
      <div className="bg-white rounded-3xl p-4 lg:p-4 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
        <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
          <item.icon className="w-10 h-10 text-white"   />
        </div>
        <h3 className="text-xl lg:text-2xl font-black text-black group-hover:scale-105 transition-transform">
          {item.question}
        </h3>
      </div>
    </motion.div>
  </Link>
));

QuestionCard.displayName = 'QuestionCard';

// 🎨 Composant Logo optimisé
const LogoSection = memo(() => (
  <div className="relative w-full flex justify-center">
    <motion.div
      initial={{ opacity: 1, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10"
    >
      <Image
        src="/logo.png"
        alt="Logo Mon Etoile"
        width={250}
        height={250}
        className="h-32 w-auto"
        priority
      />
    </motion.div>
  </div>
));

LogoSection.displayName = 'LogoSection';

// 🎨 Composant Séparateur
const Separator = memo(() => (
  <div className="flex items-center justify-center gap-4">
    <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-300" />
    <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
    <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-300" />
  </div>
));

Separator.displayName = 'Separator';

// 🎨 Composant CTA Button
const CTAButton = memo(() => (
  <div className="pt-8">
    <Link href="/protected/profil">
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-amber-500/50 transition-all inline-flex items-center gap-4"
      >
        <Compass className="w-7 h-7 group-hover:rotate-180 transition-transform duration-500" />
        DEMANDER UNE CONSULTATION
        <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
      </motion.button>
    </Link>
  </div>
));

CTAButton.displayName = 'CTAButton';

// 📄 Composant principal
export default function WelcomePage() {
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const { user } = useAuth();

  // 🔐 Redirection automatique si connecté
  useEffect(() => {
    if (user) {
      router.push('/protected/profil');
    }
  }, [router, user]);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Barre de progression */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Logo */}
      <LogoSection />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 lg:py-4 max-w-7xl">
        {/* Section Hero */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20 lg:mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl sm:text-6xl lg:text-6xl font-black mb-4 leading-tight text-black"
          >
            MON ÉTOILE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium mb-2">
              Bienvenue dans ce <span className="font-bold text-black">temple virtuel</span>,
              où chacun vient chercher une réponse aux trois grandes questions de l'existence :
            </p>
          </motion.div>

          {/* Grille de questions */}
          <motion.div
            variants={animations.staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-4"
          >
            {EXISTENTIAL_QUESTIONS.map((item, index) => (
              <QuestionCard key={item.question} item={item} index={index} />
            ))}
          </motion.div>
        </motion.section>

        {/* Section Mission */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 lg:mb-36"
        >
          <div className="relative bg-white rounded-[3rem] p-4 lg:p-8 overflow-hidden shadow-2xl border-2 border-gray-200">
            {/* Décoration de fond */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
              <Star className="absolute top-10 left-10 w-40 h-40 text-black" />
              <Sparkles className="absolute bottom-10 right-10 w-32 h-32 text-black" />
              <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-black" />
            </div>

            {/* Contenu */}
            <div className="relative z-10 max-w-5xl mx-auto text-center">
              <div className="space-y-6 text-lg lg:text-xl font-medium leading-relaxed text-gray-700">
                <p>
                  Basée sur les <span className="font-bold text-black">connaissances initiatiques africaines</span> et
                  éclairée par la lecture des astres, notre guidance vous aide à mieux vous connaître, comprendre votre
                  mission de vie, révéler vos talents, harmoniser vos relations, et avancer avec clarté sur votre chemin
                  spirituel.
                </p>

                <p>
                  Parce qu'il existe un <span className="font-bold text-black">Plan Cosmique</span> qui organise votre
                  vie, votre thème astral devient ici une boussole sacrée, une mémoire profonde et une lumière qui vous
                  éclaire, inspire vos choix et guide vos décisions.
                </p>

                <Separator />

                <p className="text-2xl lg:text-3xl font-black text-black">
                  Votre naissance a un but.
                </p>
                <p className="text-xl lg:text-2xl text-gray-700 font-semibold">
                  Nous vous aidons à découvrir ce que votre âme est venue accomplir.
                </p>

                <CTAButton />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}