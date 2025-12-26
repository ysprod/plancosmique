'use client';

import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Sparkles, Star, Zap, Moon, Shield, X, ArrowLeft } from 'lucide-react';
import Slide4Section from './Slide4Section';

// ========================================
// 🎯 TYPES & INTERFACES
// ========================================

type HoroscopeTabId = 'annuel' | 'mensuel';

interface HoroscopeResult {
    titre: string;
    message: string;
    details?: string;
}

// ========================================
// 🎨 ANIMATION VARIANTS (Top-Level)
// ========================================

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 22
        }
    }
};

const loaderVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 18
        }
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.25 }
    }
};

// ========================================
// 📊 CONSTANTS
// ========================================

const ANIMATION_DURATION = 0.4;
const RUBRIQUE_ID = '694e393df5e46df83664b4c5';
const TYPE_CONSULTATION = 'HOROSCOPE';

// ========================================
// 🌌 COSMIC LOADER COMPONENTS
// ========================================

interface FloatingParticleProps {
    icon: React.ComponentType<{ className?: string }>;
    delay: number;
    left: string;
    top: string;
    duration: number;
}

const FloatingParticle = memo(({ icon: Icon, delay, left, top, duration }: FloatingParticleProps) => (
    <motion.div
        className="absolute"
        style={{ left, top }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            y: [0, -20, -40, -60]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: 'easeOut'
        }}
    >
        <Icon className="w-4 h-4 text-purple-400" />
    </motion.div>
), (prev, next) =>
    prev.delay === next.delay &&
    prev.left === next.left &&
    prev.top === next.top
);

FloatingParticle.displayName = 'FloatingParticle';

interface CosmicOrbitProps {
    size: number;
    duration: number;
    delay: number;
    reverse?: boolean;
}

const CosmicOrbit = memo(({ size, duration, delay, reverse = false }: CosmicOrbitProps) => (
    <motion.div
        className="absolute rounded-full border-2 border-purple-300/20"
        style={{
            width: size,
            height: size,
            left: '50%',
            top: '50%',
            marginLeft: -size / 2,
            marginTop: -size / 2
        }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
            delay
        }}
    >
        <motion.div
            className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"
            style={{
                left: '50%',
                top: 0,
                marginLeft: -4,
                marginTop: -4
            }}
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
            }}
        />
    </motion.div>
), (prev, next) =>
    prev.size === next.size &&
    prev.duration === next.duration &&
    prev.reverse === next.reverse
);

CosmicOrbit.displayName = 'CosmicOrbit';

const CosmicLoader = memo(() => (
    <motion.div
        variants={loaderVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex items-center justify-center py-12 sm:py-20"
    >
        <div className="relative">
            {/* Orbes de fond */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-300/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            {/* Loader central */}
            <div className="relative w-28 sm:w-36 h-28 sm:h-36">
                {/* Anneaux orbitants */}
                <CosmicOrbit size={144} duration={3} delay={0} />
                <CosmicOrbit size={108} duration={4} delay={0.5} reverse />
                <CosmicOrbit size={72} duration={5} delay={1} />

                {/* Particules flottantes */}
                <FloatingParticle icon={Sparkles} delay={0} left="10%" top="20%" duration={4} />
                <FloatingParticle icon={Star} delay={1} left="85%" top="30%" duration={5} />
                <FloatingParticle icon={Zap} delay={2} left="15%" top="75%" duration={4.5} />
                <FloatingParticle icon={Moon} delay={1.5} left="80%" top="70%" duration={5.5} />
                <FloatingParticle icon={Sparkles} delay={2.5} left="50%" top="10%" duration={4.2} />
                <FloatingParticle icon={Star} delay={0.8} left="50%" top="85%" duration={4.8} />

                {/* Icône centrale */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 360]
                    }}
                    transition={{
                        scale: { duration: 2, repeat: Infinity },
                        rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
                    }}
                >
                    <div className="relative">
                        <Shield className="w-14 h-14 text-purple-600" />
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            animate={{ scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Sparkles className="w-7 h-7 text-pink-500" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Texte animé */}
            <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                    Analyse de votre horoscope
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Consultation des astres...</p>

                {/* Indicateur de progression */}
                <div className="mt-4 flex justify-center gap-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15
                            }}
                        >
                            <Star className="w-3 h-3 text-yellow-400" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </motion.div>
), () => true);

CosmicLoader.displayName = 'CosmicLoader';

// ========================================
// 🚨 ERROR TOAST COMPONENT
// ========================================

interface ErrorToastProps {
    message: string;
    onClose: () => void;
}

const ErrorToast = memo(({ message, onClose }: ErrorToastProps) => (
    <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 
               bg-red-50 border-2 border-red-200 rounded-2xl p-4 shadow-2xl"
    >
        <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-red-900 mb-1">Erreur</h4>
                <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                aria-label="Fermer"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    </motion.div>
), (prev, next) => prev.message === next.message);

ErrorToast.displayName = 'ErrorToast';

// ========================================
// 📊 HOROSCOPE RESULT COMPONENT
// ========================================

interface HoroscopeResultProps {
    result: HoroscopeResult;
    onBack: () => void;
}

const HoroscopeResult = memo(({ result, onBack }: HoroscopeResultProps) => (
    <motion.div
        variants={itemVariants}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl 
               border border-purple-100/50 text-center max-w-2xl mx-auto"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 
                bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl 
                shadow-purple-500/30 mb-4"
        >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {result.titre}
        </h2>

        <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
            {result.message}
        </p>

        {result.details && (
            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
                {result.details}
            </p>
        )}

        <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                bg-gradient-to-r from-purple-500 to-pink-600 text-white 
                font-semibold shadow-lg hover:shadow-xl hover:scale-105 
                active:scale-95 transition-all duration-300"
            aria-label="Retour"
        >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
        </button>
    </motion.div>
), (prev, next) =>
    prev.result.titre === next.result.titre &&
    prev.result.message === next.result.message
);

HoroscopeResult.displayName = 'HoroscopeResult';

// ========================================
// 📄 PAGE HEADER COMPONENT
// ========================================

const PageHeader = memo(() => (
    <motion.div
        variants={itemVariants}
        className="text-center mb-6 sm:mb-8"
    >
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 
                    bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl 
                    shadow-purple-500/30 mb-3">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
            HOROSCOPE
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines
        </p>
        <div className="mt-3 h-1 w-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
    </motion.div>
), () => true);

PageHeader.displayName = 'PageHeader';

// ========================================
// 🎯 MAIN COMPONENT
// ========================================

const AnalyseHoroscopePageComponent = () => {
    // Hooks
    const params = useSearchParams();
    const router = useRouter();

    // États
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<HoroscopeResult | null>(null);
    const [showConsultation, setShowConsultation] = useState(true);

    // Valeurs mémoïsées
    const tabId = useMemo(() => params.get('tab') as HoroscopeTabId | null, [params]);

    const isValidTab = useMemo(() =>
        tabId === 'annuel' || tabId === 'mensuel',
        [tabId]
    );

    // ========================================
    // 🔄 EFFECTS
    // ========================================

    useEffect(() => {
        console.log('🔍 Vérification du tabId:', tabId);

        if (!tabId) {
            setError('Type d\'horoscope non spécifié.');
            setLoading(false);
            return;
        }

        if (!isValidTab) {
            setError('Type d\'horoscope invalide. Veuillez choisir "annuel" ou "mensuel".');
            setLoading(false);
            return;
        }

        // Simuler une requête API (remplacez par votre logique réelle)
        const timer = setTimeout(() => {
            console.log('✅ Horoscope généré:', tabId);

            setResult({
                titre: tabId === 'annuel' ? 'Horoscope Annuel' : 'Horoscope Mensuel',
                message: `Voici votre horoscope ${tabId === 'annuel' ? 'pour l\'année' : 'pour le mois'}.`,
                details: tabId === 'annuel'
                    ? 'Une année riche en découvertes et en opportunités vous attend.'
                    : 'Ce mois sera propice aux nouvelles rencontres et projets.'
            });

            setLoading(false);
            setShowConsultation(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, [tabId, isValidTab]);

    // ========================================
    // 🎬 HANDLERS (Memoized)
    // ========================================

    const handleBack = useCallback(() => {
        console.log('🔙 Retour');
        router.back();
    }, [router]);

    const handleCloseError = useCallback(() => {
        setError(null);
    }, []);

    // ========================================
    // 🎨 RENDER
    // ========================================

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto"
            >
                 {loading && (
                        <motion.div key="loading">
                            <CosmicLoader />
                        </motion.div>
                    )}
                {/* Header */}
                <PageHeader />

                  <div className="mb-4 text-center">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                                    Consultation Approfondie
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Découvrez plus de détails sur votre horoscope
                                </p>
                            </div>
                            <Slide4Section
                                rubriqueId={RUBRIQUE_ID}
                                typeconsultation={TYPE_CONSULTATION}
                            />

                {/* Contenu principal */}
                <AnimatePresence mode="wait">
                   
                    <motion.div
                        key="consultation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 22,
                            duration: ANIMATION_DURATION
                        }}
                        className="space-y-6"
                    >
                       
                        <motion.div
                            variants={itemVariants}
                            className="bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 
                         shadow-xl border border-purple-100/50"
                        >
                          
                        </motion.div>
                    </motion.div>


                    {!loading && !result && error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-lg mx-auto"
                        >
                            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 sm:p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 
                              bg-red-100 rounded-2xl mb-4">
                                    <X className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-red-900 mb-2">
                                    Erreur
                                </h3>
                                <p className="text-sm text-red-700 mb-4">
                                    {error}
                                </p>
                                <button
                                    onClick={handleBack}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                           bg-red-600 text-white font-semibold shadow-lg 
                           hover:bg-red-700 hover:scale-105 active:scale-95 
                           transition-all duration-300"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Retour</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Toast d'erreur */}
            <AnimatePresence>
                {error && !loading && (
                    <ErrorToast
                        key="error-toast"
                        message={error}
                        onClose={handleCloseError}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// ========================================
// 📤 EXPORT
// ========================================

export default memo(AnalyseHoroscopePageComponent, () => true);
