import { motion } from "framer-motion";
import { memo } from "react";

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

export default FloatingParticle;