'use client';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import CacheLink from '@/components/commons/CacheLink';

export function HeaderLogo() {
  return (
    <CacheLink href="/star/profil" className="flex items-center gap-2 sm:gap-2.5 group">
      <motion.div
        whileHover={{ rotate: 360, scale: 1.08 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative"
      >
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 p-[2px] shadow-xl shadow-violet-500/40">
          <div className="w-full h-full rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
            <Image
              src="/logo.png"
              alt="Mon Étoile"
              width={40}
              height={40}
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-xl bg-violet-400 blur-lg opacity-40 -z-10"
        />

        {/* Sparkle animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-lg" />
        </motion.div>
      </motion.div>

      <div className="hidden sm:block">
        <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-transparent bg-clip-text flex items-center gap-1.5">
          Mon Étoile
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <Sparkles className="w-4 h-4 text-violet-500" />
          </motion.div>
        </h1>
        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold -mt-0.5 tracking-wide">
          Votre guide spirituel ✨
        </p>
      </div>

      <div className="sm:hidden">
        <h1 className="text-base font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 text-transparent bg-clip-text">
          Mon Étoile
        </h1>
      </div>
    </CacheLink>
  );
}
