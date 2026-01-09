import { motion, Variants } from "framer-motion";
import { Sparkles, Star, Zap, Moon, Shield } from "lucide-react";
import { memo } from "react";
import CosmicOrbit from "./CosmicOrbit";
import FloatingParticle from "./FloatingParticle";

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
                    Chargement des données en cours...
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">Veuillez patienter</p>

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
export default CosmicLoader;