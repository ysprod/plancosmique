'use client';
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { memo } from "react";


const LoadingState = memo(() => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[100svh] w-full flex items-center justify-center bg-gradient-to-br from-cosmic-purple/80 via-cosmic-indigo/70 to-cosmic-pink/70 dark:from-cosmic-indigo/90 dark:via-cosmic-purple/80 dark:to-cosmic-pink/80 transition-colors duration-500"
    >
        <motion.div
            initial={{ scale: 0.96, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-2xl shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-cosmic-purple/20 dark:border-cosmic-pink/20 max-w-xs w-full animate-fade-in"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mb-2 flex items-center justify-center"
            >
                <Loader2 className="w-full h-full text-cosmic-purple dark:text-cosmic-pink animate-pulse" />
            </motion.div>
            <p className="text-cosmic-indigo dark:text-cosmic-pink font-bold text-base sm:text-lg tracking-tight">Chargement du profil...</p>
            <p className="text-cosmic-purple dark:text-cosmic-indigo text-xs sm:text-sm mt-0.5 font-medium">Préparation de votre thème céleste</p>
        </motion.div>
    </motion.div>
));

LoadingState.displayName = 'LoadingState';

export default LoadingState;