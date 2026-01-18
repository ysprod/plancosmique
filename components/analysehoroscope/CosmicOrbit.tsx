'use client';
import { motion } from "framer-motion";
import { memo } from "react";

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

export default CosmicOrbit;