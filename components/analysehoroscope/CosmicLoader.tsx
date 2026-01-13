import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Moon } from "lucide-react";
import { memo } from "react";
import CosmicOrbit from "./CosmicOrbit";
import FloatingParticle from "./FloatingParticle";
import CosmicBackgroundOrbs from "./CosmicBackgroundOrbs";
import CosmicCenterIcon from "./CosmicCenterIcon";
import CosmicLoadingText from "./CosmicLoadingText";
import { useCosmicLoaderVariants } from "./useCosmicLoaderVariants";

const CosmicLoader = memo(() => {
    const loaderVariants = useCosmicLoaderVariants();

    return (
        <motion.div
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex items-center justify-center py-12 sm:py-20"
        >
            <div className="relative">
                <CosmicBackgroundOrbs />

                <div className="relative w-28 sm:w-36 h-28 sm:h-36">
                    <CosmicOrbit size={144} duration={3} delay={0} />
                    <CosmicOrbit size={108} duration={4} delay={0.5} reverse />
                    <CosmicOrbit size={72} duration={5} delay={1} />

                    <FloatingParticle icon={Sparkles} delay={0} left="10%" top="20%" duration={4} />
                    <FloatingParticle icon={Star} delay={1} left="85%" top="30%" duration={5} />
                    <FloatingParticle icon={Zap} delay={2} left="15%" top="75%" duration={4.5} />
                    <FloatingParticle icon={Moon} delay={1.5} left="80%" top="70%" duration={5.5} />
                    <FloatingParticle icon={Sparkles} delay={2.5} left="50%" top="10%" duration={4.2} />
                    <FloatingParticle icon={Star} delay={0.8} left="50%" top="85%" duration={4.8} />

                    <CosmicCenterIcon />
                </div>

                <CosmicLoadingText />
            </div>
        </motion.div>
    );
}, () => true);

CosmicLoader.displayName = 'CosmicLoader';

export default CosmicLoader;